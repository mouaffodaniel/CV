
// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import api from '../services/api';

// export default function Connexion() {
//     const navigate = useNavigate();

//     const [form, setForm] = useState({
//         email: '',
//         password: '',
//     });

//     const [showPassword, setShowPassword] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [fieldErrors, setFieldErrors] = useState({});

//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         setForm((prev) => ({
//             ...prev,
//             [name]: value,
//         }));

//         setFieldErrors((prev) => ({
//             ...prev,
//             [name]: '',
//         }));

//         setError('');
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         setError('');
//         setFieldErrors({});

//         if (!form.email.trim() || !form.password) {
//             setError('Veuillez renseigner votre e-mail et votre mot de passe.');
//             return;
//         }

//         setLoading(true);

//         try {
//             const response = await api.post('/auth/login', {
//                 email: form.email.trim(),
//                 password: form.password,
//             });

//             const { token, user } = response.data;

//             if (!token || !user) {
//                 throw new Error('Réponse du serveur invalide.');
//             }

//             localStorage.setItem('token', token);
//             localStorage.setItem('user', JSON.stringify(user));

//             navigate('/creer-cv', { replace: true });
//         } catch (err) {
//             const status = err.response?.status;

//             if (status === 422) {
//                 const errors = err.response?.data?.errors || {};
//                 setFieldErrors(errors);

//                 setError(
//                     errors.email?.[0] ||
//                     errors.password?.[0] ||
//                     'Les identifiants fournis sont incorrects.'
//                 );
//             } else if (status === 429) {
//                 setError(
//                     'Trop de tentatives. Veuillez patienter avant de réessayer.'
//                 );
//             } else if (!err.response) {
//                 setError(
//                     'Impossible de contacter le serveur. Vérifiez votre connexion.'
//                 );
//             } else {
//                 setError(
//                     err.response?.data?.message ||
//                     'Une erreur est survenue. Veuillez réessayer.'
//                 );
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
//             <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-200/70 lg:grid lg:grid-cols-2">

//                 <section className="relative hidden flex-col justify-between overflow-hidden bg-slate-950 p-10 text-white lg:flex">
//                     <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-600/30 blur-3xl" />
//                     <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

//                     <div className="relative">
//                         <Link
//                             to="/"
//                             className="text-xl font-bold tracking-tight"
//                         >
//                             CV<span className="text-blue-400">Pro</span>
//                         </Link>
//                     </div>

//                     <div className="relative max-w-md">
//                         <span className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-blue-200">
//                             Votre carrière, votre avenir
//                         </span>

//                         <h1 className="text-4xl font-bold leading-tight">
//                             Donnez une nouvelle dimension à votre parcours professionnel.
//                         </h1>

//                         <p className="mt-6 text-base leading-7 text-slate-300">
//                             Retrouvez votre espace personnel et continuez à
//                             construire un CV qui valorise vos compétences,
//                             votre expérience et vos ambitions.
//                         </p>

//                         <div className="mt-8 space-y-4 text-sm text-slate-300">
//                             <p className="flex items-center gap-3">
//                                 <span className="h-2 w-2 rounded-full bg-blue-400" />
//                                 Un espace personnel sécurisé
//                             </p>
//                             <p className="flex items-center gap-3">
//                                 <span className="h-2 w-2 rounded-full bg-blue-400" />
//                                 Vos informations professionnelles centralisées
//                             </p>
//                             <p className="flex items-center gap-3">
//                                 <span className="h-2 w-2 rounded-full bg-blue-400" />
//                                 Votre CV accessible et modifiable
//                             </p>
//                         </div>
//                     </div>

//                     <p className="relative text-xs text-slate-500">
//                         CVPro — Construisez votre avenir professionnel.
//                     </p>
//                 </section>

//                 <section className="px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
//                     <div className="mx-auto max-w-md">
//                         <div className="mb-8 lg:hidden">
//                             <Link
//                                 to="/"
//                                 className="text-xl font-bold tracking-tight text-slate-900"
//                             >
//                                 CV<span className="text-blue-600">Pro</span>
//                             </Link>
//                         </div>

//                         <div className="mb-8">
//                             <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
//                                 Espace personnel
//                             </p>

//                             <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
//                                 Bon retour parmi nous
//                             </h2>

//                             <p className="mt-3 text-sm leading-6 text-slate-500">
//                                 Connectez-vous pour accéder à votre espace CV.
//                             </p>
//                         </div>

//                         {error && (
//                             <div
//                                 role="alert"
//                                 className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
//                             >
//                                 {error}
//                             </div>
//                         )}

//                         <form onSubmit={handleSubmit} className="space-y-5">
//                             <div>
//                                 <label
//                                     htmlFor="email"
//                                     className="mb-2 block text-sm font-semibold text-slate-700"
//                                 >
//                                     Adresse e-mail
//                                 </label>

//                                 <input
//                                     id="email"
//                                     name="email"
//                                     type="email"
//                                     autoComplete="email"
//                                     placeholder="exemple@email.com"
//                                     value={form.email}
//                                     onChange={handleChange}
//                                     required
//                                     className={`w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 ${
//                                         fieldErrors.email
//                                             ? 'border-red-400'
//                                             : 'border-slate-200'
//                                     }`}
//                                 />

//                                 {fieldErrors.email && (
//                                     <p className="mt-2 text-xs text-red-600">
//                                         {fieldErrors.email[0]}
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <div className="mb-2 flex items-center justify-between gap-3">
//                                     <label
//                                         htmlFor="password"
//                                         className="text-sm font-semibold text-slate-700"
//                                     >
//                                         Mot de passe
//                                     </label>

//                                     <Link
//                                         to="/mot-de-passe-oublie"
//                                         className="text-xs font-semibold text-blue-600 transition hover:text-blue-800"
//                                     >
//                                         Mot de passe oublié ?
//                                     </Link>
//                                 </div>

//                                 <div className="relative">
//                                     <input
//                                         id="password"
//                                         name="password"
//                                         type={showPassword ? 'text' : 'password'}
//                                         autoComplete="current-password"
//                                         placeholder="Votre mot de passe"
//                                         value={form.password}
//                                         onChange={handleChange}
//                                         required
//                                         className="w-full rounded-xl border border-slate-200 px-4 py-3.5 pr-20 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
//                                     />

//                                     <button
//                                         type="button"
//                                         onClick={() =>
//                                             setShowPassword((prev) => !prev)
//                                         }
//                                         className="absolute inset-y-0 right-3 text-xs font-semibold text-slate-500 hover:text-blue-700"
//                                     >
//                                         {showPassword ? 'Masquer' : 'Afficher'}
//                                     </button>
//                                 </div>
//                             </div>

//                             <button
//                                 type="submit"
//                                 disabled={loading}
//                                 className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
//                             >
//                                 {loading ? 'Connexion en cours...' : 'Se connecter'}
//                             </button>
//                         </form>

//                         <div className="my-7 flex items-center gap-4">
//                             <div className="h-px flex-1 bg-slate-200" />
//                             <span className="text-xs text-slate-400">
//                                 Nouveau sur CVPro ?
//                             </span>
//                             <div className="h-px flex-1 bg-slate-200" />
//                         </div>

//                         <Link
//                             to="/inscription"
//                             className="flex w-full items-center justify-center rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
//                         >
//                             Créer un compte
//                         </Link>

//                         <p className="mt-8 text-center text-xs leading-5 text-slate-400">
//                             En vous connectant, vous accédez à votre espace
//                             personnel CVPro.
//                         </p>
//                     </div>
//                 </section>
//             </div>
//         </main>
//     );
// }

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Connexion() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setFieldErrors((prev) => ({
            ...prev,
            [name]: '',
        }));

        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setFieldErrors({});

        if (!form.email.trim() || !form.password) {
            setError('Veuillez renseigner votre e-mail et votre mot de passe.');
            return;
        }

        setLoading(true);

        try {
            const response = await api.post('/auth/login', {
                email: form.email.trim(),
                password: form.password,
            });

            const { token, user } = response.data;

            if (!token || !user) {
                throw new Error('Réponse du serveur invalide.');
            }

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            navigate('/creer-cv', { replace: true });
        } catch (err) {
            const status = err.response?.status;

            if (status === 422) {
                const errors = err.response?.data?.errors || {};
                setFieldErrors(errors);

                setError(
                    errors.email?.[0] ||
                    errors.password?.[0] ||
                    'Les identifiants fournis sont incorrects.'
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
                    err.response?.data?.message ||
                    'Une erreur est survenue. Veuillez réessayer.'
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-200/70 lg:grid lg:grid-cols-2">

                <section className="relative hidden flex-col justify-between overflow-hidden bg-slate-950 p-10 text-white lg:flex">
                    <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-600/30 blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

                    <div className="relative">
                        <Link to="/" className="inline-flex items-center gap-3">
                            <img
                                src="/logocv.png"
                                alt="Logo CVPro"
                                className="h-10 w-10 rounded-lg bg-white p-1 object-contain"
                            />
                            <span className="text-xl font-bold tracking-tight">
                                CV<span className="text-blue-400">Pro</span>
                            </span>
                        </Link>
                    </div>

                    <div className="relative max-w-md">
                        <span className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-blue-200">
                            Votre carrière, votre avenir
                        </span>

                        <h1 className="text-4xl font-bold leading-tight">
                            Donnez une nouvelle dimension à votre parcours professionnel.
                        </h1>

                        <p className="mt-6 text-base leading-7 text-slate-300">
                            Retrouvez votre espace personnel et continuez à
                            construire un CV qui valorise vos compétences,
                            votre expérience et vos ambitions.
                        </p>

                        <div className="mt-8 space-y-4 text-sm text-slate-300">
                            <p className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-blue-400" />
                                Un espace personnel sécurisé
                            </p>
                            <p className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-blue-400" />
                                Vos informations professionnelles centralisées
                            </p>
                            <p className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-blue-400" />
                                Votre CV accessible et modifiable
                            </p>
                        </div>
                    </div>

                    <p className="relative text-xs text-slate-500">
                        CVPro — Construisez votre avenir professionnel.
                    </p>
                </section>

                <section className="px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
                    <div className="mx-auto max-w-md">
                        <div className="mb-8 lg:hidden">
                            <Link
                                to="/"
                                className="inline-flex items-center gap-3 text-xl font-bold tracking-tight text-slate-900"
                            >
                                <img
                                    src="/logocv.png"
                                    alt="Logo CVPro"
                                    className="h-10 w-10 object-contain"
                                />
                                <span>
                                    CV<span className="text-blue-600">Pro</span>
                                </span>
                            </Link>
                        </div>

                        <div className="mb-8">
                            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                                Espace personnel
                            </p>

                            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                                Bon retour parmi nous
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                Connectez-vous pour accéder à votre espace CV.
                            </p>
                        </div>

                        {error && (
                            <div
                                role="alert"
                                className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                            >
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
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
                                    placeholder="exemple@email.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className={`w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 ${
                                        fieldErrors.email
                                            ? 'border-red-400'
                                            : 'border-slate-200'
                                    }`}
                                />

                                {fieldErrors.email && (
                                    <p className="mt-2 text-xs text-red-600">
                                        {fieldErrors.email[0]}
                                    </p>
                                )}
                            </div>

                            <div>
                                <div className="mb-2 flex items-center justify-between gap-3">
                                    <label
                                        htmlFor="password"
                                        className="text-sm font-semibold text-slate-700"
                                    >
                                        Mot de passe
                                    </label>

                                    <Link
                                        to="/mot-de-passe-oublie"
                                        className="text-xs font-semibold text-blue-600 transition hover:text-blue-800"
                                    >
                                        Mot de passe oublié ?
                                    </Link>
                                </div>

                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        placeholder="Votre mot de passe"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-slate-200 px-4 py-3.5 pr-20 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                        className="absolute inset-y-0 right-3 text-xs font-semibold text-slate-500 hover:text-blue-700"
                                    >
                                        {showPassword ? 'Masquer' : 'Afficher'}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? 'Connexion en cours...' : 'Se connecter'}
                            </button>
                        </form>

                        <div className="my-7 flex items-center gap-4">
                            <div className="h-px flex-1 bg-slate-200" />
                            <span className="text-xs text-slate-400">
                                Nouveau sur CVPro ?
                            </span>
                            <div className="h-px flex-1 bg-slate-200" />
                        </div>

                        <Link
                            to="/inscription"
                            className="flex w-full items-center justify-center rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                        >
                            Créer un compte
                        </Link>

                        <p className="mt-8 text-center text-xs leading-5 text-slate-400">
                            En vous connectant, vous accédez à votre espace
                            personnel CVPro.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}