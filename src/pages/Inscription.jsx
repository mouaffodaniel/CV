import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Inscription() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        password: '',
        password_confirmation: '',
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: '',
        }));

        setServerError('');
    };

    const getPasswordStrength = () => {
        const password = formData.password;

        if (!password) {
            return {
                label: '',
                score: 0,
            };
        }

        let score = 0;

        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        let label = '';

        if (score <= 2) {
            label = 'Faible';
        } else if (score === 3) {
            label = 'Moyen';
        } else if (score === 4) {
            label = 'Fort';
        } else {
            label = 'Très fort';
        }

        return {
            label,
            score,
        };
    };

    const passwordStrength = getPasswordStrength();

    const passwordRules = [
        {
            label: 'Au moins 8 caractères',
            valid: formData.password.length >= 8,
        },
        {
            label: 'Une lettre majuscule',
            valid: /[A-Z]/.test(formData.password),
        },
        {
            label: 'Une lettre minuscule',
            valid: /[a-z]/.test(formData.password),
        },
        {
            label: 'Un chiffre',
            valid: /[0-9]/.test(formData.password),
        },
        {
            label: 'Un caractère spécial',
            valid: /[^A-Za-z0-9]/.test(formData.password),
        },
    ];

    const validateForm = () => {
        const validationErrors = {};

        if (!formData.nom.trim()) {
            validationErrors.nom = 'Le nom est obligatoire.';
        }

        if (!formData.prenom.trim()) {
            validationErrors.prenom = 'Le prénom est obligatoire.';
        }

        if (!formData.email.trim()) {
            validationErrors.email =
                "L'adresse email est obligatoire.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                formData.email
            )
        ) {
            validationErrors.email =
                "L'adresse email n'est pas valide.";
        }

        if (!formData.telephone.trim()) {
            validationErrors.telephone =
                'Le numéro de téléphone est obligatoire.';
        }

        if (!formData.password) {
            validationErrors.password =
                'Le mot de passe est obligatoire.';
        } else if (formData.password.length < 8) {
            validationErrors.password =
                'Le mot de passe doit contenir au moins 8 caractères.';
        }

        if (!formData.password_confirmation) {
            validationErrors.password_confirmation =
                'Veuillez confirmer votre mot de passe.';
        } else if (
            formData.password !==
            formData.password_confirmation
        ) {
            validationErrors.password_confirmation =
                'Les mots de passe ne correspondent pas.';
        }

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setServerError('');
        setSuccess('');

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);

            const response = await api.post('/auth/register', {
                nom: formData.nom.trim(),
                prenom: formData.prenom.trim(),
                email: formData.email.trim(),
                telephone: formData.telephone.trim(),
                password: formData.password,
                password_confirmation:
                    formData.password_confirmation,
            });

            if (response.data.token) {
                localStorage.setItem(
                    'token',
                    response.data.token
                );
            }

            if (response.data.user) {
                localStorage.setItem(
                    'user',
                    JSON.stringify(response.data.user)
                );
            }

            setSuccess(
                'Votre compte a été créé avec succès.'
            );

            setTimeout(() => {
                navigate('/creer-cv');
            }, 1200);
        } catch (error) {
            console.error(
                "Erreur lors de l'inscription :",
                error
            );

            if (error.response?.status === 422) {
                const backendErrors =
                    error.response?.data?.errors;

                if (backendErrors) {
                    setErrors(backendErrors);
                }

                setServerError(
                    error.response?.data?.message ||
                        'Veuillez vérifier les informations saisies.'
                );
            } else if (!error.response) {
                setServerError(
                    'Impossible de contacter le serveur. Vérifiez que Laravel est démarré.'
                );
            } else {
                setServerError(
                    "Une erreur est survenue lors de la création du compte."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const getInputClass = (field) => {
        return `mt-2 w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 ${
            errors[field]
                ? 'border-red-400 focus:border-red-500'
                : 'border-slate-200'
        }`;
    };

    return (
        <div className="min-h-screen bg-slate-100">
            <div className="flex min-h-screen">

                <section className="relative hidden overflow-hidden bg-slate-950 lg:flex lg:w-[46%]">
                    <div className="absolute inset-0">
                        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-slate-800/50 blur-3xl" />
                        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-slate-800/40 blur-3xl" />
                    </div>

                    <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                                    <span className="text-lg font-bold text-slate-950">
                                        CV
                                    </span>
                                </div>

                                <span className="text-lg font-bold tracking-tight text-white">
                                    CV Professionnel
                                </span>
                            </div>
                        </div>

                        <div className="max-w-xl">
                            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                                Votre carrière commence ici
                            </p>

                            <h1 className="text-4xl font-bold leading-tight text-white xl:text-5xl">
                                Créez un CV qui vous représente
                                professionnellement.
                            </h1>

                            <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
                                Construisez un CV moderne, structuré
                                et professionnel. Centralisez vos
                                informations et préparez votre
                                candidature en quelques étapes.
                            </p>

                            <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
                                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                    <p className="text-2xl font-bold text-white">
                                        01
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-slate-400">
                                        Créez votre compte
                                    </p>
                                </div>

                                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                    <p className="text-2xl font-bold text-white">
                                        02
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-slate-400">
                                        Construisez votre CV
                                    </p>
                                </div>

                                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                    <p className="text-2xl font-bold text-white">
                                        03
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-slate-400">
                                        Valorisez votre profil
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p className="text-xs text-slate-500">
                            Plateforme de création de CV professionnel
                        </p>
                    </div>
                </section>

                <main className="flex w-full items-center justify-center px-5 py-8 sm:px-8 lg:w-[54%] lg:px-12 xl:px-20">
                    <div className="w-full max-w-xl">

                        <div className="mb-8 lg:hidden">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950">
                                    <span className="text-sm font-bold text-white">
                                        CV
                                    </span>
                                </div>

                                <span className="text-lg font-bold text-slate-950">
                                    CV Professionnel
                                </span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">
                                Créer votre compte
                            </p>

                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                                Commencez votre profil
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                Créez votre compte pour accéder à
                                votre espace professionnel.
                            </p>
                        </div>

                        {serverError && (
                            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5">
                                <p className="text-sm font-medium text-red-700">
                                    {serverError}
                                </p>
                            </div>
                        )}

                        {success && (
                            <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3.5">
                                <p className="text-sm font-medium text-emerald-700">
                                    {success}
                                </p>

                                <p className="mt-1 text-xs text-emerald-600">
                                    Redirection vers votre espace...
                                </p>
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            className="space-y-5"
                        >
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="nom"
                                        className="text-sm font-semibold text-slate-700"
                                    >
                                        Nom
                                    </label>

                                    <input
                                        id="nom"
                                        name="nom"
                                        type="text"
                                        autoComplete="family-name"
                                        value={formData.nom}
                                        onChange={handleChange}
                                        placeholder="Votre nom"
                                        className={getInputClass(
                                            'nom'
                                        )}
                                    />

                                    {errors.nom && (
                                        <p className="mt-1.5 text-xs font-medium text-red-600">
                                            {errors.nom}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="prenom"
                                        className="text-sm font-semibold text-slate-700"
                                    >
                                        Prénom
                                    </label>

                                    <input
                                        id="prenom"
                                        name="prenom"
                                        type="text"
                                        autoComplete="given-name"
                                        value={formData.prenom}
                                        onChange={handleChange}
                                        placeholder="Votre prénom"
                                        className={getInputClass(
                                            'prenom'
                                        )}
                                    />

                                    {errors.prenom && (
                                        <p className="mt-1.5 text-xs font-medium text-red-600">
                                            {errors.prenom}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="text-sm font-semibold text-slate-700"
                                >
                                    Adresse email
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="vous@exemple.com"
                                    className={getInputClass(
                                        'email'
                                    )}
                                />

                                {errors.email && (
                                    <p className="mt-1.5 text-xs font-medium text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="telephone"
                                    className="text-sm font-semibold text-slate-700"
                                >
                                    Numéro de téléphone
                                </label>

                                <input
                                    id="telephone"
                                    name="telephone"
                                    type="tel"
                                    autoComplete="tel"
                                    value={formData.telephone}
                                    onChange={handleChange}
                                    placeholder="Votre numéro de téléphone"
                                    className={getInputClass(
                                        'telephone'
                                    )}
                                />

                                {errors.telephone && (
                                    <p className="mt-1.5 text-xs font-medium text-red-600">
                                        {errors.telephone}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="text-sm font-semibold text-slate-700"
                                >
                                    Mot de passe
                                </label>

                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        autoComplete="new-password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Créez un mot de passe sécurisé"
                                        className={`${getInputClass(
                                            'password'
                                        )} pr-24`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                (previous) =>
                                                    !previous
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                                    >
                                        {showPassword
                                            ? 'Masquer'
                                            : 'Afficher'}
                                    </button>
                                </div>

                                {formData.password && (
                                    <div className="mt-3">
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="text-xs text-slate-500">
                                                Sécurité du mot de passe
                                            </span>

                                            <span className="text-xs font-semibold text-slate-700">
                                                {
                                                    passwordStrength.label
                                                }
                                            </span>
                                        </div>

                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map(
                                                (level) => (
                                                    <div
                                                        key={level}
                                                        className={`h-1.5 flex-1 rounded-full ${
                                                            level <=
                                                            passwordStrength.score
                                                                ? 'bg-slate-900'
                                                                : 'bg-slate-200'
                                                        }`}
                                                    />
                                                )
                                            )}
                                        </div>

                                        <div className="mt-3 grid grid-cols-1 gap-1 sm:grid-cols-2">
                                            {passwordRules.map(
                                                (rule) => (
                                                    <div
                                                        key={
                                                            rule.label
                                                        }
                                                        className={`text-xs ${
                                                            rule.valid
                                                                ? 'text-emerald-600'
                                                                : 'text-slate-400'
                                                        }`}
                                                    >
                                                        <span className="mr-1">
                                                            {rule.valid
                                                                ? '✓'
                                                                : '○'}
                                                        </span>

                                                        {
                                                            rule.label
                                                        }
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}

                                {errors.password && (
                                    <p className="mt-1.5 text-xs font-medium text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="password_confirmation"
                                    className="text-sm font-semibold text-slate-700"
                                >
                                    Confirmation du mot de passe
                                </label>

                                <div className="relative">
                                    <input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type={
                                            showConfirmation
                                                ? 'text'
                                                : 'password'
                                        }
                                        autoComplete="new-password"
                                        value={
                                            formData.password_confirmation
                                        }
                                        onChange={handleChange}
                                        placeholder="Confirmez votre mot de passe"
                                        className={`${getInputClass(
                                            'password_confirmation'
                                        )} pr-24`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmation(
                                                (previous) =>
                                                    !previous
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                                    >
                                        {showConfirmation
                                            ? 'Masquer'
                                            : 'Afficher'}
                                    </button>
                                </div>

                                {formData.password_confirmation &&
                                    formData.password ===
                                        formData.password_confirmation && (
                                        <p className="mt-1.5 text-xs font-medium text-emerald-600">
                                            Les mots de passe
                                            correspondent.
                                        </p>
                                    )}

                                {errors.password_confirmation && (
                                    <p className="mt-1.5 text-xs font-medium text-red-600">
                                        {
                                            errors.password_confirmation
                                        }
                                    </p>
                                )}
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex w-full items-center justify-center rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-900/10 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading ? (
                                        <>
                                            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                            Création du compte...
                                        </>
                                    ) : (
                                        'Créer mon compte'
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="my-7 flex items-center gap-4">
                            <div className="h-px flex-1 bg-slate-200" />

                            <span className="text-xs text-slate-400">
                                ou
                            </span>

                            <div className="h-px flex-1 bg-slate-200" />
                        </div>

                        <p className="text-center text-sm text-slate-500">
                            Vous avez déjà un compte ?
                            <Link
                                to="/connexion"
                                className="ml-1 font-semibold text-slate-950 hover:underline"
                            >
                                Se connecter
                            </Link>
                        </p>

                        <p className="mt-8 text-center text-xs leading-5 text-slate-400">
                            En créant un compte, vous pourrez
                            enregistrer et gérer vos CV depuis votre
                            espace personnel.
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}