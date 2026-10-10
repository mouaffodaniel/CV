import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { saveCv } from '../services/cvService';
import api from '../services/api';

import ExportCv from './ExportCv';

import InformationsForm from './InformationsForm';
import ProfileForm from './ProfileForm';
import ExperienceForm from './ExperienceForm';
import FormationForm from './FormationForm';
import CompetenceForm from './CompetenceForm';
import SavoirFaireForm from './SavoirFaireForm';
import LogicielForm from './LogicielForm';
import LangueForm from './LangueForm';
import InteretForm from './InteretForm';
import InformationsComplementairesForm from './InformationsComplementairesForm';

import TemplateSelector from './TemplateSelector';
import CvTemplateRenderer from './CvTemplateRenderer';

import { useCv } from '../context/CvContext';

export default function CreerCv() {
    const navigate = useNavigate();

    const { cv, updateCv } = useCv();

    const [activeSection, setActiveSection] = useState('template');

    const [saving, setSaving] = useState(false);

    const [loggingOut, setLoggingOut] = useState(false);

    const [saveMessage, setSaveMessage] = useState('');

    const [saveError, setSaveError] = useState('');

    const [logoutError, setLogoutError] = useState('');

    const user = (() => {
        try {
            return JSON.parse(
                localStorage.getItem('user') || 'null'
            );
        } catch {
            return null;
        }
    })();

    const handleLogout = async () => {
        setLogoutError('');
        setLoggingOut(true);

        try {
            await api.post('/auth/logout');
        } catch (error) {
            if (error.response?.status !== 401) {
                console.error(
                    'Erreur lors de la déconnexion :',
                    error
                );
            }
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            setLoggingOut(false);

            navigate('/connexion', {
                replace: true,
            });
        }
    };

    const handleSaveCv = async () => {
        setSaveMessage('');
        setSaveError('');

        if (!cv.titre_poste?.trim()) {
            setSaveError(
                'Veuillez renseigner le titre du poste.'
            );

            setActiveSection('informations');

            return;
        }

        if (!cv.nom?.trim()) {
            setSaveError(
                'Veuillez renseigner votre nom.'
            );

            setActiveSection('informations');

            return;
        }

        if (!cv.prenom?.trim()) {
            setSaveError(
                'Veuillez renseigner votre prénom.'
            );

            setActiveSection('informations');

            return;
        }

        if (!cv.telephone?.trim()) {
            setSaveError(
                'Veuillez renseigner votre numéro de téléphone.'
            );

            setActiveSection('informations');

            return;
        }

        if (!cv.email?.trim()) {
            setSaveError(
                'Veuillez renseigner votre adresse email.'
            );

            setActiveSection('informations');

            return;
        }

        const token = localStorage.getItem('token');

        if (!token) {
            setSaveError(
                'Vous devez être connecté pour enregistrer votre CV.'
            );

            navigate('/connexion', {
                replace: true,
            });

            return;
        }

        try {
            setSaving(true);

            const createdCv = await saveCv({
                ...cv,
                template: cv.template || 'classic',
            });

            updateCv('id', createdCv.id);

            setSaveMessage(
                'Votre CV a été enregistré avec succès.'
            );
        } catch (error) {
            console.error(
                "Erreur lors de l'enregistrement du CV :",
                error
            );

            if (error.response?.status === 401) {
                setSaveError(
                    'Votre session a expiré. Veuillez vous reconnecter.'
                );

                localStorage.removeItem('token');
                localStorage.removeItem('user');

                navigate('/connexion', {
                    replace: true,
                });
            } else if (error.response?.status === 422) {
                const errors =
                    error.response?.data?.errors;

                if (errors) {
                    const firstError = Object.values(errors)
                        .flat()
                        .find(Boolean);

                    setSaveError(
                        firstError ||
                        'Certaines informations sont invalides.'
                    );
                } else {
                    setSaveError(
                        'Les informations envoyées sont invalides.'
                    );
                }
            } else {
                setSaveError(
                    "Une erreur est survenue lors de l'enregistrement du CV."
                );
            }
        } finally {
            setSaving(false);
        }
    };

    const sections = [
        {
            id: 'template',
            label: 'Modèle du CV',
            component: <TemplateSelector />,
        },
        {
            id: 'informations',
            label: 'Informations personnelles',
            component: <InformationsForm />,
        },
        {
            id: 'profil',
            label: 'Profil professionnel',
            component: <ProfileForm />,
        },
        {
            id: 'experiences',
            label: 'Expériences professionnelles',
            component: <ExperienceForm />,
        },
        {
            id: 'formations',
            label: 'Formation',
            component: <FormationForm />,
        },
        {
            id: 'informations-complementaires',
            label: 'Informations complémentaires',
            component: (
                <InformationsComplementairesForm />
            ),
        },
        {
            id: 'competences',
            label: 'Compétences',
            component: <CompetenceForm />,
        },
        {
            id: 'savoir-faire',
            label: 'Savoir-faire',
            component: <SavoirFaireForm />,
        },
        {
            id: 'logiciels',
            label: 'Logiciels',
            component: <LogicielForm />,
        },
        {
            id: 'langues',
            label: 'Langues',
            component: <LangueForm />,
        },
        {
            id: 'interets',
            label: 'Centres d’intérêt',
            component: <InteretForm />,
        },
    ];

    const activeComponent = sections.find(
        (section) => section.id === activeSection
    )?.component;

    return (
        <div className="min-h-screen bg-slate-100">

            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-6 py-4">

                    <div>
                        <h1 className="text-xl font-bold text-slate-900">
                            Créer mon CV
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Construisez votre CV professionnel en quelques étapes.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">

                        {user && (
                            <span className="hidden text-sm font-medium text-slate-600 md:block">
                                {user.prenom ||
                                    user.name ||
                                    user.email}
                            </span>
                        )}

                        <button
                            type="button"
                            onClick={handleSaveCv}
                            disabled={
                                saving ||
                                loggingOut
                            }
                            className="shrink-0 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {saving
                                ? 'Enregistrement...'
                                : 'Enregistrer le CV'}
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                navigate('/mes-cvs')
                            }
                            disabled={
                                saving ||
                                loggingOut
                            }
                            className="shrink-0 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-60"
                        >
                            Mes CV
                        </button>

                        <button
                            type="button"
                            onClick={handleLogout}
                            disabled={
                                loggingOut ||
                                saving
                            }
                            className="shrink-0 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loggingOut
                                ? 'Déconnexion...'
                                : 'Déconnexion'}
                        </button>

                    </div>
                </div>
            </header>

            {logoutError && (
                <div className="mx-auto max-w-[1600px] px-6 pt-4">
                    <div
                        role="alert"
                        className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                        {logoutError}
                    </div>
                </div>
            )}

            {(saveMessage || saveError) && (
                <div className="mx-auto max-w-[1600px] px-6 pt-4">

                    {saveMessage && (
                        <div
                            role="status"
                            className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
                        >
                            {saveMessage}
                        </div>
                    )}

                    {saveError && (
                        <div
                            role="alert"
                            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                        >
                            {saveError}
                        </div>
                    )}

                </div>
            )}

            <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 p-6 xl:grid-cols-[470px_1fr]">

                <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                    <div className="mb-5">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Informations du CV
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Complétez les différentes sections.
                        </p>
                    </div>

                    <div className="mb-6 flex gap-2 overflow-x-auto border-b border-slate-200 pb-3 xl:block xl:space-y-2 xl:border-b-0 xl:pb-0">

                        {sections.map((section) => (
                            <button
                                key={section.id}
                                type="button"
                                onClick={() => {
                                    setActiveSection(
                                        section.id
                                    );

                                    setSaveError('');
                                    setSaveMessage('');
                                }}
                                className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-left text-sm font-medium transition xl:block xl:w-full ${
                                    activeSection ===
                                    section.id
                                        ? 'bg-slate-900 text-white'
                                        : 'text-slate-600 hover:bg-slate-100'
                                }`}
                            >
                                {section.label}
                            </button>
                        ))}

                    </div>

                    <div>
                        {activeComponent}
                    </div>

                </aside>

                <main className="min-w-0">

                    <div className="sticky top-6">

                        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">

                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">
                                    Aperçu du CV
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Format A4 professionnel.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">

                                <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                                    Aperçu en direct
                                </span>

                                <ExportCv cv={cv} />

                            </div>

                        </div>

                        <div className="overflow-auto rounded-2xl border border-slate-200 bg-slate-400 p-8 shadow-sm">

                            <CvTemplateRenderer cv={cv} />

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}



// import { useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import { saveCv } from '../services/cvService';
// import api from '../services/api';

// import ExportCv from './ExportCv';
// import InformationsForm from './InformationsForm';
// import ProfileForm from './ProfileForm';
// import ExperienceForm from './ExperienceForm';
// import FormationForm from './FormationForm';
// import CompetenceForm from './CompetenceForm';
// import SavoirFaireForm from './SavoirFaireForm';
// import LogicielForm from './LogicielForm';
// import LangueForm from './LangueForm';
// import InteretForm from './InteretForm';
// import InformationsComplementairesForm from './InformationsComplementairesForm';

// import TemplateSelector from './TemplateSelector';
// import CvTemplateRenderer from './CvTemplateRenderer';

// import { useCv } from '../context/CvContext';

// // Taille d'une page A4 en pixels (1 mm = 96 / 25,4 px)
// const A4_WIDTH_PX = (210 * 96) / 25.4;
// const A4_HEIGHT_PX = (297 * 96) / 25.4;

// // Marge intérieure de la zone grise de l'aperçu (p-4 = 16 px de chaque côté)
// const PREVIEW_PADDING = 32;

// export default function CreerCv() {
//     const navigate = useNavigate();

//     const { cv, updateCv } = useCv();

//     const [activeSection, setActiveSection] = useState('template');
//     const [saving, setSaving] = useState(false);
//     const [loggingOut, setLoggingOut] = useState(false);
//     const [saveMessage, setSaveMessage] = useState('');
//     const [saveError, setSaveError] = useState('');
//     const [logoutError, setLogoutError] = useState('');

//     // --- Aperçu : réduit automatiquement pour tenir sans défilement ---
//     const previewAreaRef = useRef(null);
//     const previewPageRef = useRef(null);

//     const [previewScale, setPreviewScale] = useState(1);
//     const [pageHeight, setPageHeight] = useState(A4_HEIGHT_PX);

//     useEffect(() => {
//         const area = previewAreaRef.current;
//         const page = previewPageRef.current;

//         if (!area || !page) {
//             return;
//         }

//         const updateScale = () => {
//             const availableWidth = area.clientWidth - PREVIEW_PADDING;
//             const availableHeight = area.clientHeight - PREVIEW_PADDING;

//             // Si le CV dépasse une page, on tient compte de sa vraie hauteur
//             const height = Math.max(page.offsetHeight, A4_HEIGHT_PX);

//             const scale = Math.min(
//                 availableWidth / A4_WIDTH_PX,
//                 availableHeight / height,
//                 1
//             );

//             setPreviewScale(Math.max(scale, 0.1));
//             setPageHeight(height);
//         };

//         updateScale();

//         // Recalcule quand la fenêtre ou le contenu change de taille
//         const observer = new ResizeObserver(updateScale);

//         observer.observe(area);
//         observer.observe(page);

//         return () => observer.disconnect();
//     }, []);

//     const user = (() => {
//         try {
//             return JSON.parse(
//                 localStorage.getItem('user') || 'null'
//             );
//         } catch {
//             return null;
//         }
//     })();

//     const handleLogout = async () => {
//         setLogoutError('');
//         setLoggingOut(true);

//         try {
//             await api.post('/auth/logout');
//         } catch (error) {
//             if (error.response?.status !== 401) {
//                 console.error(
//                     'Erreur lors de la déconnexion :',
//                     error
//                 );
//             }
//         } finally {
//             localStorage.removeItem('token');
//             localStorage.removeItem('user');

//             setLoggingOut(false);

//             navigate('/connexion', {
//                 replace: true,
//             });
//         }
//     };

//     const handleSaveCv = async () => {
//         setSaveMessage('');
//         setSaveError('');

//         if (!cv.titre_poste?.trim()) {
//             setSaveError(
//                 'Veuillez renseigner le titre du poste.'
//             );

//             setActiveSection('informations');

//             return;
//         }

//         if (!cv.nom?.trim()) {
//             setSaveError(
//                 'Veuillez renseigner votre nom.'
//             );

//             setActiveSection('informations');

//             return;
//         }

//         if (!cv.prenom?.trim()) {
//             setSaveError(
//                 'Veuillez renseigner votre prénom.'
//             );

//             setActiveSection('informations');

//             return;
//         }

//         if (!cv.telephone?.trim()) {
//             setSaveError(
//                 'Veuillez renseigner votre numéro de téléphone.'
//             );

//             setActiveSection('informations');

//             return;
//         }

//         if (!cv.email?.trim()) {
//             setSaveError(
//                 'Veuillez renseigner votre adresse email.'
//             );

//             setActiveSection('informations');

//             return;
//         }

//         const token = localStorage.getItem('token');

//         if (!token) {
//             setSaveError(
//                 'Vous devez être connecté pour enregistrer votre CV.'
//             );

//             navigate('/connexion', {
//                 replace: true,
//             });

//             return;
//         }

//         try {
//             setSaving(true);

//             const createdCv = await saveCv({
//                 ...cv,
//                 template: cv.template || 'classic',
//             });

//             updateCv('id', createdCv.id);

//             setSaveMessage(
//                 'Votre CV a été enregistré avec succès.'
//             );
//         } catch (error) {
//             console.error(
//                 "Erreur lors de l'enregistrement du CV :",
//                 error
//             );

//             if (error.response?.status === 401) {
//                 setSaveError(
//                     'Votre session a expiré. Veuillez vous reconnecter.'
//                 );

//                 localStorage.removeItem('token');
//                 localStorage.removeItem('user');

//                 navigate('/connexion', {
//                     replace: true,
//                 });
//             } else if (error.response?.status === 422) {
//                 const errors =
//                     error.response?.data?.errors;

//                 if (errors) {
//                     const firstError = Object.values(errors)
//                         .flat()
//                         .find(Boolean);

//                     setSaveError(
//                         firstError ||
//                         'Certaines informations sont invalides.'
//                     );
//                 } else {
//                     setSaveError(
//                         'Les informations envoyées sont invalides.'
//                     );
//                 }
//             } else {
//                 setSaveError(
//                     "Une erreur est survenue lors de l'enregistrement du CV."
//                 );
//             }
//         } finally {
//             setSaving(false);
//         }
//     };

//     const sections = [
//         {
//             id: 'template',
//             label: 'Modèle du CV',
//             component: <TemplateSelector />,
//         },
//         {
//             id: 'informations',
//             label: 'Informations personnelles',
//             component: <InformationsForm />,
//         },
//         {
//             id: 'profil',
//             label: 'Profil professionnel',
//             component: <ProfileForm />,
//         },
//         {
//             id: 'experiences',
//             label: 'Expériences professionnelles',
//             component: <ExperienceForm />,
//         },
//         {
//             id: 'formations',
//             label: 'Formation',
//             component: <FormationForm />,
//         },
//         {
//             id: 'informations-complementaires',
//             label: 'Informations complémentaires',
//             component: (
//                 <InformationsComplementairesForm />
//             ),
//         },
//         {
//             id: 'competences',
//             label: 'Compétences',
//             component: <CompetenceForm />,
//         },
//         {
//             id: 'savoir-faire',
//             label: 'Savoir-faire',
//             component: <SavoirFaireForm />,
//         },
//         {
//             id: 'logiciels',
//             label: 'Logiciels',
//             component: <LogicielForm />,
//         },
//         {
//             id: 'langues',
//             label: 'Langues',
//             component: <LangueForm />,
//         },
//         {
//             id: 'interets',
//             label: 'Centres d’intérêt',
//             component: <InteretForm />,
//         },
//     ];

//     const activeComponent = sections.find(
//         (section) => section.id === activeSection
//     )?.component;

//     return (
//         <div className="flex h-screen flex-col overflow-hidden bg-slate-100">

//             {/* HEADER */}
//             <header className="shrink-0 border-b border-slate-200 bg-white">
//                 <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-6 py-4">

//                     <div>
//                         <h1 className="text-xl font-bold text-slate-900">
//                             Créer mon CV
//                         </h1>

//                         <p className="mt-1 text-sm text-slate-500">
//                             Construisez votre CV professionnel en quelques étapes.
//                         </p>
//                     </div>

//                     <div className="flex items-center gap-3">

//                         {user && (
//                             <span className="hidden text-sm font-medium text-slate-600 md:block">
//                                 {user.prenom ||
//                                     user.name ||
//                                     user.email}
//                             </span>
//                         )}

//                         <button
//                             type="button"
//                             onClick={handleSaveCv}
//                             disabled={
//                                 saving ||
//                                 loggingOut
//                             }
//                             className="shrink-0 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
//                         >
//                             {saving
//                                 ? 'Enregistrement...'
//                                 : 'Enregistrer le CV'}
//                         </button>

//                         <button
//                             type="button"
//                             onClick={() =>
//                                 navigate('/mes-cvs')
//                             }
//                             disabled={
//                                 saving ||
//                                 loggingOut
//                             }
//                             className="shrink-0 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-60"
//                         >
//                             Mes CV
//                         </button>

//                         <button
//                             type="button"
//                             onClick={handleLogout}
//                             disabled={
//                                 loggingOut ||
//                                 saving
//                             }
//                             className="shrink-0 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
//                         >
//                             {loggingOut
//                                 ? 'Déconnexion...'
//                                 : 'Déconnexion'}
//                         </button>

//                     </div>
//                 </div>
//             </header>

//             {/* MESSAGE DE DÉCONNEXION */}
//             {logoutError && (
//                 <div className="mx-auto w-full max-w-[1600px] shrink-0 px-6 pt-4">
//                     <div
//                         role="alert"
//                         className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
//                     >
//                         {logoutError}
//                     </div>
//                 </div>
//             )}

//             {/* MESSAGES D'ENREGISTREMENT */}
//             {(saveMessage || saveError) && (
//                 <div className="mx-auto w-full max-w-[1600px] shrink-0 px-6 pt-4">

//                     {saveMessage && (
//                         <div
//                             role="status"
//                             className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
//                         >
//                             {saveMessage}
//                         </div>
//                     )}

//                     {saveError && (
//                         <div
//                             role="alert"
//                             className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
//                         >
//                             {saveError}
//                         </div>
//                     )}

//                 </div>
//             )}

//             {/* ESPACE PRINCIPAL */}
//             <div className="mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 gap-6 px-6 py-6">

//                 {/* COLONNE GAUCHE : seule zone qui défile */}
//                 <aside
//                     dir="rtl"
//                     className="hidden min-h-0 w-[470px] shrink-0 overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-sm xl:block"
//                 >
//                     <div
//                         dir="ltr"
//                         className="p-5"
//                     >

//                         <div className="mb-5">
//                             <h2 className="text-lg font-semibold text-slate-900">
//                                 Informations du CV
//                             </h2>

//                             <p className="mt-1 text-sm text-slate-500">
//                                 Complétez les différentes sections.
//                             </p>
//                         </div>

//                         <div className="mb-6 space-y-2">

//                             {sections.map((section) => (
//                                 <button
//                                     key={section.id}
//                                     type="button"
//                                     onClick={() => {
//                                         setActiveSection(
//                                             section.id
//                                         );

//                                         setSaveError('');
//                                         setSaveMessage('');
//                                     }}
//                                     className={`block w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium transition ${
//                                         activeSection ===
//                                         section.id
//                                             ? 'bg-slate-900 text-white'
//                                             : 'text-slate-600 hover:bg-slate-100'
//                                     }`}
//                                 >
//                                     {section.label}
//                                 </button>
//                             ))}

//                         </div>

//                         <div>
//                             {activeComponent}
//                         </div>

//                     </div>
//                 </aside>

//                 {/* VERSION MOBILE DU FORMULAIRE */}
//                 <aside className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:hidden">

//                     <div className="mb-5">
//                         <h2 className="text-lg font-semibold text-slate-900">
//                             Informations du CV
//                         </h2>

//                         <p className="mt-1 text-sm text-slate-500">
//                             Complétez les différentes sections.
//                         </p>
//                     </div>

//                     <div className="mb-6 flex gap-2 overflow-x-auto border-b border-slate-200 pb-3">

//                         {sections.map((section) => (
//                             <button
//                                 key={section.id}
//                                 type="button"
//                                 onClick={() => {
//                                     setActiveSection(
//                                         section.id
//                                     );

//                                     setSaveError('');
//                                     setSaveMessage('');
//                                 }}
//                                 className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-left text-sm font-medium transition ${
//                                     activeSection ===
//                                     section.id
//                                         ? 'bg-slate-900 text-white'
//                                         : 'text-slate-600 hover:bg-slate-100'
//                                 }`}
//                             >
//                                 {section.label}
//                             </button>
//                         ))}

//                     </div>

//                     <div>
//                         {activeComponent}
//                     </div>

//                 </aside>

//                 {/* APERÇU : fixe, sans défilement */}
//                 <main className="flex min-h-0 min-w-0 flex-1 flex-col">

//                     <div className="mb-4 flex shrink-0 flex-wrap items-center justify-between gap-4">

//                         <div>
//                             <h2 className="text-lg font-semibold text-slate-900">
//                                 Aperçu du CV
//                             </h2>

//                             <p className="text-sm text-slate-500">
//                                 Format A4 professionnel.
//                             </p>
//                         </div>

//                         <div className="flex flex-wrap items-center gap-3">

//                             <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
//                                 Aperçu en direct
//                             </span>

//                             <ExportCv cv={cv} />

//                         </div>

//                     </div>

//                     <div
//                         ref={previewAreaRef}
//                         className="flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-400 p-4 shadow-sm"
//                     >
//                         {/* Réserve la place occupée par le CV réduit */}
//                         <div
//                             className="shrink-0"
//                             style={{
//                                 width: A4_WIDTH_PX * previewScale,
//                                 height: pageHeight * previewScale,
//                             }}
//                         >
//                             {/* CV à sa taille réelle, réduit visuellement */}
//                             <div
//                                 ref={previewPageRef}
//                                 style={{
//                                     width: A4_WIDTH_PX,
//                                     transform: `scale(${previewScale})`,
//                                     transformOrigin: 'top left',
//                                 }}
//                             >
//                                 <CvTemplateRenderer cv={cv} />
//                             </div>
//                         </div>
//                     </div>

//                 </main>

//             </div>
//         </div>
//     );
// }
