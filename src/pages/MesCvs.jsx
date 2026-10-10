
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getCvs } from '../services/cvService';

// export default function MesCvs() {
//     const [cvs, setCvs] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     const navigate = useNavigate();

//     useEffect(() => {
//         let actif = true;

//         async function chargerCvs() {
//             try {
//                 const result = await getCvs();

//                 if (actif) {
//                     setCvs(Array.isArray(result) ? result : []);
//                 }
//             } catch (err) {
//                 if (actif) {
//                     setError(
//                         err.response?.data?.message ||
//                         'Impossible de récupérer les CV.'
//                     );
//                 }
//             } finally {
//                 if (actif) {
//                     setLoading(false);
//                 }
//             }
//         }

//         chargerCvs();

//         return () => {
//             actif = false;
//         };
//     }, []);

//     if (loading) {
//         return <p className="p-6">Chargement des CV...</p>;
//     }

//     if (error) {
//         return (
//             <div className="p-6 text-red-600">
//                 {error}
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-100 p-6">
//             <div className="mx-auto max-w-6xl">
//                 <div className="mb-6 flex items-center justify-between">
//                     <h1 className="text-3xl font-bold text-gray-800">
//                         Mes CV
//                     </h1>

//                     <button
//                         onClick={() => navigate('/creer-cv')}
//                         className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
//                     >
//                         Créer un CV
//                     </button>
//                 </div>

//                 {cvs.length === 0 ? (
//                     <div className="rounded-xl bg-white p-8 text-center shadow">
//                         <p className="mb-4 text-gray-600">
//                             Tu n'as pas encore enregistré de CV.
//                         </p>

//                         <button
//                             onClick={() => navigate('/creer-cv')}
//                             className="rounded-lg bg-blue-600 px-5 py-3 text-white"
//                         >
//                             Créer mon premier CV
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//                         {cvs.map((cv) => (
//                             <div
//                                 key={cv.id}
//                                 className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg"
//                             >
//                                 <h2 className="mb-2 text-xl font-bold text-gray-800">
//                                     {cv.titre_poste}
//                                 </h2>

//                                 <p className="mb-2 text-gray-600">
//                                     {cv.prenom} {cv.nom}
//                                 </p>

//                                 <p className="mb-4 text-sm text-gray-500">
//                                     {cv.email}
//                                 </p>

//                                 <button
//                                     onClick={() =>
//                                         navigate(`/mes-cvs/${cv.id}`)
//                                     }
//                                     className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
//                                 >
//                                     Consulter
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCvs } from '../services/cvService';

export default function MesCvs() {
    const navigate = useNavigate();

    const [cvs, setCvs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const chargerCvs = useCallback(async (actualisation = false) => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/connexion', { replace: true });
            return;
        }

        try {
            if (actualisation) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError('');

            const response = await getCvs();

            const listeCvs = Array.isArray(response)
                ? response
                : response?.data;

            if (!Array.isArray(listeCvs)) {
                console.error(
                    'Format inattendu de la réponse :',
                    response
                );

                setCvs([]);

                setError(
                    'La réponse du serveur ne contient pas une liste de CV valide.'
                );

                return;
            }

            setCvs(listeCvs);
        } catch (err) {
            console.error(
                'Erreur récupération CV :',
                err
            );

            console.error(
                'Statut HTTP :',
                err.response?.status
            );

            console.error(
                'Réponse Laravel :',
                err.response?.data
            );

            if (err.response?.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');

                navigate('/connexion', {
                    replace: true
                });

                return;
            }

            if (err.response?.status === 403) {
                setError(
                    'Accès refusé : vous n’êtes pas autorisé à consulter ces CV.'
                );
            } else if (err.response?.status === 404) {
                setError(
                    'La route de récupération des CV est introuvable. Vérifiez routes/api.php.'
                );
            } else if (err.response?.status === 500) {
                setError(
                    err.response?.data?.message ||
                    'Erreur interne du serveur Laravel (500).'
                );
            } else if (err.response) {
                setError(
                    err.response?.data?.message ||
                    `Erreur du serveur : HTTP ${err.response.status}.`
                );
            } else if (err.request) {
                setError(
                    'Impossible de joindre le serveur Laravel. Vérifiez que le backend est démarré et que l’URL API est correcte.'
                );
            } else {
                setError(
                    err.message ||
                    'Une erreur inattendue est survenue.'
                );
            }
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [navigate]);

    useEffect(() => {
        chargerCvs();
    }, [chargerCvs]);

    const creerCv = () => {
        navigate('/creer-cv');
    };

    const handleModifier = (cv) => {
        if (!cv?.id) {
            console.error('CV invalide :', cv);
            return;
        }

        navigate(`/modifier-cv/${cv.id}`);
    };

    const deconnexion = () => {
        navigate('/connexion');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>

                    <p className="text-gray-600 font-medium">
                        Chargement de vos CV...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between mb-8">

                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                            Mes CV
                        </h1>

                        <p className="text-gray-600 mt-2">
                            Retrouvez tous les CV enregistrés sur votre compte.
                        </p>

                        {!error && (
                            <p className="text-sm text-gray-500 mt-2">
                                {cvs.length}{' '}
                                {cvs.length > 1
                                    ? 'CV enregistrés'
                                    : 'CV enregistré'}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => chargerCvs(true)}
                            disabled={refreshing}
                            className="px-5 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition"
                        >
                            {refreshing
                                ? 'Actualisation...'
                                : 'Actualiser'}
                        </button>

                        <button
                            type="button"
                            onClick={creerCv}
                            className="px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                        >
                            Créer un nouveau CV
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-5">
                        <h2 className="font-semibold text-red-800 mb-2">
                            Impossible de récupérer vos CV
                        </h2>

                        <p className="text-sm text-red-700 break-words">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={() => chargerCvs(true)}
                            disabled={refreshing}
                            className="mt-4 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition"
                        >
                            Réessayer
                        </button>
                    </div>
                )}

                {!error && cvs.length === 0 && (
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-14 text-center">
                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-5">
                            <span className="text-2xl font-bold text-blue-600">
                                CV
                            </span>
                        </div>

                        <h2 className="text-xl font-semibold text-gray-900">
                            Aucun CV enregistré
                        </h2>

                        <p className="text-gray-500 mt-3 max-w-md mx-auto">
                            Aucun CV n’a été trouvé pour votre compte.
                            Vous pouvez créer un nouveau CV dès maintenant.
                        </p>

                        <button
                            type="button"
                            onClick={creerCv}
                            className="mt-6 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                        >
                            Créer mon premier CV
                        </button>
                    </div>
                )}

                {!error && cvs.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                        {cvs.map((cv) => (
                            <article
                                key={cv.id}
                                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden"
                            >
                                <div className="h-2 bg-blue-600"></div>

                                <div className="p-6">

                                    <div className="mb-5">
                                        <p className="text-xs uppercase tracking-wider font-semibold text-blue-600 mb-2">
                                            Curriculum Vitae
                                        </p>

                                        <h2 className="text-xl font-bold text-gray-900 break-words">
                                            {cv.titre_poste ||
                                                'CV sans titre'}
                                        </h2>

                                        <p className="text-gray-600 mt-2">
                                            {[cv.prenom, cv.nom]
                                                .filter(Boolean)
                                                .join(' ') ||
                                                'Nom non renseigné'}
                                        </p>
                                    </div>

                                    <div className="space-y-3 text-sm text-gray-600">

                                        {cv.email && (
                                            <div>
                                                <p className="text-xs font-semibold uppercase text-gray-400">
                                                    Email
                                                </p>

                                                <p className="break-all mt-1">
                                                    {cv.email}
                                                </p>
                                            </div>
                                        )}

                                        {cv.telephone && (
                                            <div>
                                                <p className="text-xs font-semibold uppercase text-gray-400">
                                                    Téléphone
                                                </p>

                                                <p className="mt-1">
                                                    {cv.telephone}
                                                </p>
                                            </div>
                                        )}

                                        {cv.adresse && (
                                            <div>
                                                <p className="text-xs font-semibold uppercase text-gray-400">
                                                    Adresse
                                                </p>

                                                <p className="mt-1">
                                                    {cv.adresse}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-gray-100">

                                        <div className="text-center">
                                            <p className="text-xl font-bold text-gray-900">
                                                {cv.experiences?.length ?? 0}
                                            </p>

                                            <p className="text-xs text-gray-500 mt-1">
                                                Expériences
                                            </p>
                                        </div>

                                        <div className="text-center">
                                            <p className="text-xl font-bold text-gray-900">
                                                {cv.formations?.length ?? 0}
                                            </p>

                                            <p className="text-xs text-gray-500 mt-1">
                                                Formations
                                            </p>
                                        </div>

                                        <div className="text-center">
                                            <p className="text-xl font-bold text-gray-900">
                                                {cv.competences?.length ?? 0}
                                            </p>

                                            <p className="text-xs text-gray-500 mt-1">
                                                Compétences
                                            </p>
                                        </div>
                                    </div>

                                    {cv.created_at && (
                                        <p className="text-xs text-gray-400 mt-5">
                                            Créé le{' '}
                                            {new Date(
                                                cv.created_at
                                            ).toLocaleDateString('fr-FR')}
                                        </p>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() => handleModifier(cv)}
                                        className="w-full mt-5 px-4 py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
                                    >
                                        Ouvrir le CV
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                <div className="mt-8">
                    <button
                        type="button"
                        onClick={deconnexion}
                        className="text-sm text-gray-500 hover:text-gray-800 transition"
                    >
                        Retour à la connexion
                    </button>
                </div>

            </div>
        </div>
    );
}