import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function MotDePasseOublie() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setSuccess('');
        setError('');

        try {
            const response = await api.post(
                '/auth/forgot-password',
                { email: email.trim() }
            );

            setSuccess(response.data.message);
        } catch (err) {
            if (err.response?.status === 429) {
                setError(
                    'Trop de demandes. Veuillez patienter avant de réessayer.'
                );
            } else if (err.response?.status === 422) {
                setError(
                    err.response.data.errors?.email?.[0] ||
                    'Veuillez vérifier votre adresse e-mail.'
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
            <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-200/70 lg:grid lg:grid-cols-2">

                <section className="relative hidden flex-col justify-between overflow-hidden bg-slate-950 p-10 text-white lg:flex">
                    <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-600/30 blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

                    <Link to="/" className="relative text-xl font-bold">
                        CV<span className="text-blue-400">Pro</span>
                    </Link>

                    <div className="relative">
                        <p className="text-sm font-semibold uppercase tracking-widest text-blue-300">
                            Assistance et sécurité
                        </p>

                        <h1 className="mt-4 text-4xl font-bold leading-tight">
                            Retrouvez l'accès à votre espace professionnel.
                        </h1>

                        <p className="mt-5 leading-7 text-slate-300">
                            Réinitialisez votre mot de passe en toute simplicité
                            et reprenez la création de votre CV.
                        </p>
                    </div>

                    <p className="relative text-xs text-slate-500">
                        CVPro — Votre parcours, votre avenir.
                    </p>
                </section>

                <section className="flex items-center px-6 py-12 sm:px-10 lg:px-12">
                    <div className="mx-auto w-full max-w-md">
                        <Link
                            to="/"
                            className="text-xl font-bold text-slate-900 lg:hidden"
                        >
                            CV<span className="text-blue-600">Pro</span>
                        </Link>

                        <div className="mt-8 lg:mt-0">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    className="h-7 w-7"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 8l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                                    />
                                </svg>
                            </div>

                            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                                Récupération du compte
                            </p>

                            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                                Mot de passe oublié ?
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                Indiquez l'adresse e-mail associée à votre compte.
                                Nous vous aiderons à réinitialiser votre mot de passe.
                            </p>
                        </div>

                        {success && (
                            <div
                                role="status"
                                className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-800"
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
                                    type="email"
                                    autoComplete="email"
                                    placeholder="exemple@email.com"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setError('');
                                        setSuccess('');
                                    }}
                                    required
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading
                                    ? 'Envoi en cours...'
                                    : 'Envoyer le lien de réinitialisation'}
                            </button>
                        </form>

                        <div className="mt-7 text-center">
                            <Link
                                to="/connexion"
                                className="text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                            >
                                Retour à la connexion
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}