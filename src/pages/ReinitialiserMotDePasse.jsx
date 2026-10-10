import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../services/api';

export default function ReinitialiserMotDePasse() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const token = searchParams.get('token') || '';
    const emailFromUrl = searchParams.get('email') || '';

    const [form, setForm] = useState({
        email: emailFromUrl,
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setSuccess('');

        if (!token) {
            setError(
                'Le lien de réinitialisation est incomplet. Demandez un nouveau lien.'
            );
            return;
        }

        if (form.password.length < 8) {
            setError(
                'Le mot de passe doit contenir au moins 8 caractères.'
            );
            return;
        }

        if (form.password !== form.password_confirmation) {
            setError(
                'Les deux mots de passe ne correspondent pas.'
            );
            return;
        }

        setLoading(true);

        try {
            const response = await api.post(
                '/auth/reset-password',
                {
                    token,
                    email: form.email.trim(),
                    password: form.password,
                    password_confirmation: form.password_confirmation,
                }
            );

            // setSuccess(response.data.message);
                      setSuccess('Votre mot de passe a été réinitialisé avec succès. Redirection vers la connexion...');
            setTimeout(() => {
                navigate('/connexion', { replace: true });
            }, 1800);
        } catch (err) {
            const status = err.response?.status;

            if (status === 422) {
                const errors = err.response.data.errors || {};

                setError(
                    errors.email?.[0] ||
                    errors.password?.[0] ||
                    'Le lien est invalide ou expiré.'
                );
            } else if (status === 429) {
                setError(
                    'Trop de tentatives. Veuillez patienter avant de réessayer.'
                );
            } else if (!err.response) {
                setError(
                    'Impossible de contacter le serveur. Vérifiez votre connexion.'
                );
            } else {
                setError(
                    err.response.data.message ||
                    'Une erreur est survenue. Veuillez réessayer.'
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-12 flex items-center justify-center">
            <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl shadow-slate-200/70 sm:p-10">

                <Link
                    to="/"
                    className="text-xl font-bold text-slate-900"
                >
                    CV<span className="text-blue-600">Pro</span>
                </Link>

                <div className="mt-10">
                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                        Sécurité du compte
                    </p>

                    <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                        Créer un nouveau mot de passe
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                        Choisissez un nouveau mot de passe pour retrouver
                        l'accès à votre espace CVPro.
                    </p>
                </div>

                {success && (
                    <div
                        role="status"
                        className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
                    >
                        {success}
                    </div>
                )}

                {error && (
                    <div
                        role="alert"
                        className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                    >
                        {error}
                    </div>
                )}

                {/* <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Adresse e-mail
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Nouveau mot de passe
                        </label>

                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            placeholder="8 caractères minimum"
                            value={form.password}
                            onChange={handleChange}
                            required
                            minLength={8}
                            className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password_confirmation"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Confirmer le mot de passe
                        </label>

                        <input
                            id="password_confirmation"
                            name="password_confirmation"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            placeholder="Saisissez à nouveau le mot de passe"
                            value={form.password_confirmation}
                            onChange={handleChange}
                            required
                            minLength={8}
                            className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    <label className="flex items-center gap-3 text-sm text-slate-600">
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={(e) =>
                                setShowPassword(e.target.checked)
                            }
                            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        Afficher les mots de passe
                    </label>

                    <button
                        type="submit"
                        disabled={loading || !token}
                        className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading
                            ? 'Réinitialisation en cours...'
                            : 'Réinitialiser le mot de passe'}
                    </button>
                </form> */}
                {!success && (
    <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
    >
        <div>
            <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
            >
                Adresse e-mail
            </label>

            <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
        </div>

        <div>
            <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-700"
            >
                Nouveau mot de passe
            </label>

            <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="8 caractères minimum"
                value={form.password}
                onChange={handleChange}
                required
                minLength={8}
                className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
        </div>

        <div>
            <label
                htmlFor="password_confirmation"
                className="mb-2 block text-sm font-semibold text-slate-700"
            >
                Confirmer le mot de passe
            </label>

            <input
                id="password_confirmation"
                name="password_confirmation"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Saisissez à nouveau le mot de passe"
                value={form.password_confirmation}
                onChange={handleChange}
                required
                minLength={8}
                className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
        </div>

        <label className="flex items-center gap-3 text-sm text-slate-600">
            <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) =>
                    setShowPassword(e.target.checked)
                }
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            Afficher les mots de passe
        </label>

        <button
            type="submit"
            disabled={loading || !token}
            className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
            {loading
                ? 'Réinitialisation en cours...'
                : 'Réinitialiser le mot de passe'}
        </button>
    </form>
)}

                <div className="mt-7 text-center">
                    <Link
                        to="/connexion"
                        className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                    >
                        Retour à la connexion
                    </Link>
                </div>
            </div>
        </main>
    );
}