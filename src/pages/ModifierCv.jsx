// import { useEffect, useRef, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// import { useCv } from '../context/CvContext';

// import {
//     getCvById,
//     updateCv,
//     createExperience,
//     updateExperience,
//     deleteExperience,
//     createFormation,
//     updateFormation,
//     deleteFormation,
//     createInformationComplementaire,
//     updateInformationComplementaire,
//     deleteInformationComplementaire,
//     createCompetence,
//     updateCompetence,
//     deleteCompetence,
//     createSavoirFaire,
//     updateSavoirFaire,
//     deleteSavoirFaire,
//     createLogiciel,
//     updateLogiciel,
//     deleteLogiciel,
//     createLangue,
//     updateLangue,
//     deleteLangue,
//     createInteret,
//     updateInteret,
//     deleteInteret,
// } from '../services/cvService';

// import InformationsForm from './InformationsForm';
// import ProfileForm from './ProfileForm';
// import ExperienceForm from './ExperienceForm';
// import FormationForm from './FormationForm';
// import InformationsComplementairesForm from './InformationsComplementairesForm';
// import CompetenceForm from './CompetenceForm';
// import SavoirFaireForm from './SavoirFaireForm';
// import LogicielForm from './LogicielForm';
// import LangueForm from './LangueForm';
// import InteretForm from './InteretForm';

// import TemplateSelector from './TemplateSelector';
// import CvTemplateRenderer from './CvTemplateRenderer';

// const sections = [
//     {
//         id: 'template',
//         label: 'Modèle du CV',
//     },
//     {
//         id: 'informations',
//         label: 'Informations personnelles',
//     },
//     {
//         id: 'profil',
//         label: 'Profil professionnel',
//     },
//     {
//         id: 'experience',
//         label: 'Expériences professionnelles',
//     },
//     {
//         id: 'formation',
//         label: 'Formation',
//     },
//     {
//         id: 'informations-complementaires',
//         label: 'Informations complémentaires',
//     },
//     {
//         id: 'competence',
//         label: 'Compétences',
//     },
//     {
//         id: 'savoir-faire',
//         label: 'Savoir-faire',
//     },
//     {
//         id: 'logiciel',
//         label: 'Logiciels',
//     },
//     {
//         id: 'langue',
//         label: 'Langues',
//     },
//     {
//         id: 'interet',
//         label: 'Centres d’intérêt',
//     },
// ];

// const normalizeCv = (data) => {
//     if (!data) {
//         return {
//             id: null,
//             template: 'classic',
//             titre_poste: '',
//             nom: '',
//             prenom: '',
//             photo: null,
//             telephone: '',
//             email: '',
//             adresse: '',
//             ville: '',
//             linkedin: '',
//             github: '',
//             portfolio: '',
//             profil_professionnel: '',
//             experiences: [],
//             formations: [],
//             informationsComplementaires: [],
//             competences: [],
//             savoirFaires: [],
//             logiciels: [],
//             langues: [],
//             interets: [],
//         };
//     }

//     let photo = null;

//     if (data.photo) {
//         if (typeof data.photo === 'object') {
//             photo = {
//                 ...data.photo,
//                 preview:
//                     data.photo.preview ||
//                     data.photo.url ||
//                     null,
//                 file: data.photo.file || null,
//             };
//         } else {
//             photo = {
//                 path: data.photo,
//                 preview: `http://127.0.0.1:8000/storage/${data.photo}`,
//                 file: null,
//             };
//         }
//     }

//     return {
//         id: data.id ?? null,

//         template: data.template ?? 'classic',

//         titre_poste: data.titre_poste ?? '',

//         nom: data.nom ?? '',

//         prenom: data.prenom ?? '',

//         photo,

//         telephone: data.telephone ?? '',

//         email: data.email ?? '',

//         adresse: data.adresse ?? '',

//         ville: data.ville ?? '',

//         linkedin: data.linkedin ?? '',

//         github: data.github ?? '',

//         portfolio: data.portfolio ?? '',

//         profil_professionnel:
//             data.profil_professionnel ?? '',

//         experiences: Array.isArray(data.experiences)
//             ? data.experiences
//             : [],

//         formations: Array.isArray(data.formations)
//             ? data.formations
//             : [],

//         informationsComplementaires:
//             Array.isArray(data.informations_complementaires)
//                 ? data.informations_complementaires
//                 : Array.isArray(data.informationsComplementaires)
//                     ? data.informationsComplementaires
//                     : [],

//         competences: Array.isArray(data.competences)
//             ? data.competences
//             : [],

//         savoirFaires: Array.isArray(data.savoir_faires)
//             ? data.savoir_faires
//             : Array.isArray(data.savoirFaires)
//                 ? data.savoirFaires
//                 : [],

//         logiciels: Array.isArray(data.logiciels)
//             ? data.logiciels
//             : [],

//         langues: Array.isArray(data.langues)
//             ? data.langues
//             : [],

//         interets: Array.isArray(data.interets)
//             ? data.interets
//             : [],
//     };
// };

// export default function ModifierCv() {
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const {
//         cv,
//         setCv,
//     } = useCv();

//     const [activeSection, setActiveSection] =
//         useState('template');

//     const [loading, setLoading] = useState(true);

//     const [saving, setSaving] = useState(false);

//     const [error, setError] = useState('');

//     const [successMessage, setSuccessMessage] =
//         useState('');

//     const formPanelRef = useRef(null);

//     useEffect(() => {
//         let mounted = true;

//         const loadCv = async () => {
//             try {
//                 setLoading(true);
//                 setError('');
//                 setSuccessMessage('');

//                 const response = await getCvById(id);

//                 const responseData =
//                     response?.data || response;

//                 const data =
//                     responseData?.data || responseData;

//                 if (!mounted) {
//                     return;
//                 }

//                 setCv(normalizeCv(data));
//             } catch (err) {
//                 console.error(
//                     'Erreur lors du chargement du CV :',
//                     err
//                 );

//                 if (!mounted) {
//                     return;
//                 }

//                 if (err.response?.status === 401) {
//                     localStorage.removeItem('token');
//                     localStorage.removeItem('user');

//                     navigate('/connexion', {
//                         replace: true,
//                     });

//                     return;
//                 }

//                 if (err.response?.status === 403) {
//                     setError(
//                         'Vous n’êtes pas autorisé à modifier ce CV.'
//                     );
//                 } else if (err.response?.status === 404) {
//                     setError(
//                         'Ce CV n’existe pas ou a été supprimé.'
//                     );
//                 } else {
//                     setError(
//                         err.response?.data?.message ||
//                         'Impossible de charger ce CV.'
//                     );
//                 }
//             } finally {
//                 if (mounted) {
//                     setLoading(false);
//                 }
//             }
//         };

//         loadCv();

//         return () => {
//             mounted = false;
//         };
//     }, [id, navigate, setCv]);

//     useEffect(() => {
//         if (!formPanelRef.current) {
//             return;
//         }

//         formPanelRef.current.scrollIntoView({
//             behavior: 'smooth',
//             block: 'nearest',
//         });
//     }, [activeSection]);

//     const syncCollection = async ({
//         currentItems = [],
//         originalItems = [],
//         createItem,
//         updateItem,
//         deleteItem,
//     }) => {
//         const currentIds = new Set();

//         for (const item of currentItems) {
//             if (item.id) {
//                 currentIds.add(String(item.id));

//                 await updateItem(
//                     item.id,
//                     item
//                 );
//             } else {
//                 await createItem(item);
//             }
//         }

//         for (const original of originalItems) {
//             if (
//                 original.id &&
//                 !currentIds.has(String(original.id))
//             ) {
//                 await deleteItem(original.id);
//             }
//         }
//     };

//     const handleSave = async () => {
//         if (!cv?.id) {
//             setError(
//                 'Impossible d’enregistrer : identifiant du CV manquant.'
//             );

//             return;
//         }

//         if (!cv.titre_poste?.trim()) {
//             setError(
//                 'Veuillez renseigner le titre du poste.'
//             );

//             setActiveSection('informations');

//             return;
//         }

//         if (!cv.nom?.trim()) {
//             setError(
//                 'Veuillez renseigner votre nom.'
//             );

//             setActiveSection('informations');

//             return;
//         }

//         if (!cv.prenom?.trim()) {
//             setError(
//                 'Veuillez renseigner votre prénom.'
//             );

//             setActiveSection('informations');

//             return;
//         }

//         try {
//             setSaving(true);
//             setError('');
//             setSuccessMessage('');

//             const response = await getCvById(id);

//             const responseData =
//                 response?.data || response;

//             const serverCv =
//                 responseData?.data || responseData;

//             await updateCv(id, {
//                 ...cv,
//                 template: cv.template || 'classic',
//             });

//             await syncCollection({
//                 currentItems: cv.experiences || [],

//                 originalItems:
//                     Array.isArray(serverCv.experiences)
//                         ? serverCv.experiences
//                         : [],

//                 createItem: (item) =>
//                     createExperience(
//                         id,
//                         item
//                     ),

//                 updateItem: (itemId, item) =>
//                     updateExperience(
//                         id,
//                         itemId,
//                         item
//                     ),

//                 deleteItem: (itemId) =>
//                     deleteExperience(
//                         id,
//                         itemId
//                     ),
//             });

//             await syncCollection({
//                 currentItems: cv.formations || [],

//                 originalItems:
//                     Array.isArray(serverCv.formations)
//                         ? serverCv.formations
//                         : [],

//                 createItem: (item) =>
//                     createFormation(
//                         id,
//                         item
//                     ),

//                 updateItem: (itemId, item) =>
//                     updateFormation(
//                         id,
//                         itemId,
//                         item
//                     ),

//                 deleteItem: (itemId) =>
//                     deleteFormation(
//                         id,
//                         itemId
//                     ),
//             });

//             await syncCollection({
//                 currentItems:
//                     cv.informationsComplementaires || [],

//                 originalItems:
//                     Array.isArray(
//                         serverCv.informations_complementaires
//                     )
//                         ? serverCv.informations_complementaires
//                         : Array.isArray(
//                             serverCv.informationsComplementaires
//                         )
//                             ? serverCv.informationsComplementaires
//                             : [],

//                 createItem: (item) =>
//                     createInformationComplementaire(
//                         id,
//                         item
//                     ),

//                 updateItem: (itemId, item) =>
//                     updateInformationComplementaire(
//                         id,
//                         itemId,
//                         item
//                     ),

//                 deleteItem: (itemId) =>
//                     deleteInformationComplementaire(
//                         id,
//                         itemId
//                     ),
//             });

//             await syncCollection({
//                 currentItems: cv.competences || [],

//                 originalItems:
//                     Array.isArray(serverCv.competences)
//                         ? serverCv.competences
//                         : [],

//                 createItem: (item) =>
//                     createCompetence(
//                         id,
//                         item
//                     ),

//                 updateItem: (itemId, item) =>
//                     updateCompetence(
//                         id,
//                         itemId,
//                         item
//                     ),

//                 deleteItem: (itemId) =>
//                     deleteCompetence(
//                         id,
//                         itemId
//                     ),
//             });

//             await syncCollection({
//                 currentItems:
//                     cv.savoirFaires || [],

//                 originalItems:
//                     Array.isArray(
//                         serverCv.savoir_faires
//                     )
//                         ? serverCv.savoir_faires
//                         : Array.isArray(
//                             serverCv.savoirFaires
//                         )
//                             ? serverCv.savoirFaires
//                             : [],

//                 createItem: (item) =>
//                     createSavoirFaire(
//                         id,
//                         item
//                     ),

//                 updateItem: (itemId, item) =>
//                     updateSavoirFaire(
//                         id,
//                         itemId,
//                         item
//                     ),

//                 deleteItem: (itemId) =>
//                     deleteSavoirFaire(
//                         id,
//                         itemId
//                     ),
//             });

//             await syncCollection({
//                 currentItems:
//                     cv.logiciels || [],

//                 originalItems:
//                     Array.isArray(serverCv.logiciels)
//                         ? serverCv.logiciels
//                         : [],

//                 createItem: (item) =>
//                     createLogiciel(
//                         id,
//                         item
//                     ),

//                 updateItem: (itemId, item) =>
//                     updateLogiciel(
//                         id,
//                         itemId,
//                         item
//                     ),

//                 deleteItem: (itemId) =>
//                     deleteLogiciel(
//                         id,
//                         itemId
//                     ),
//             });

//             await syncCollection({
//                 currentItems:
//                     cv.langues || [],

//                 originalItems:
//                     Array.isArray(serverCv.langues)
//                         ? serverCv.langues
//                         : [],

//                 createItem: (item) =>
//                     createLangue(
//                         id,
//                         item
//                     ),

//                 updateItem: (itemId, item) =>
//                     updateLangue(
//                         id,
//                         itemId,
//                         item
//                     ),

//                 deleteItem: (itemId) =>
//                     deleteLangue(
//                         id,
//                         itemId
//                     ),
//             });

//             await syncCollection({
//                 currentItems:
//                     cv.interets || [],

//                 originalItems:
//                     Array.isArray(serverCv.interets)
//                         ? serverCv.interets
//                         : [],

//                 createItem: (item) =>
//                     createInteret(
//                         id,
//                         item
//                     ),

//                 updateItem: (itemId, item) =>
//                     updateInteret(
//                         id,
//                         itemId,
//                         item
//                     ),

//                 deleteItem: (itemId) =>
//                     deleteInteret(
//                         id,
//                         itemId
//                     ),
//             });

//             const finalResponse =
//                 await getCvById(id);

//             const finalResponseData =
//                 finalResponse?.data ||
//                 finalResponse;

//             const finalData =
//                 finalResponseData?.data ||
//                 finalResponseData;

//             setCv(normalizeCv(finalData));

//             setSuccessMessage(
//                 'Votre CV a été modifié avec succès.'
//             );
//         } catch (err) {
//             console.error(
//                 'Erreur lors de la modification du CV :',
//                 err
//             );

//             if (err.response?.status === 401) {
//                 localStorage.removeItem('token');
//                 localStorage.removeItem('user');

//                 navigate('/connexion', {
//                     replace: true,
//                 });

//                 return;
//             }

//             if (err.response?.status === 422) {
//                 const errors =
//                     err.response?.data?.errors;

//                 const firstError = errors
//                     ? Object.values(errors)
//                         .flat()
//                         .find(Boolean)
//                     : null;

//                 setError(
//                     firstError ||
//                     'Certaines informations sont invalides.'
//                 );
//             } else if (
//                 err.response?.status === 403
//             ) {
//                 setError(
//                     'Vous n’êtes pas autorisé à modifier ce CV.'
//                 );
//             } else {
//                 setError(
//                     err.response?.data?.message ||
//                     'Une erreur est survenue lors de la modification du CV.'
//                 );
//             }
//         } finally {
//             setSaving(false);
//         }
//     };

//     const renderForm = () => {
//         switch (activeSection) {
//             case 'template':
//                 return <TemplateSelector />;

//             case 'informations':
//                 return <InformationsForm />;

//             case 'profil':
//                 return <ProfileForm />;

//             case 'experience':
//                 return <ExperienceForm />;

//             case 'formation':
//                 return <FormationForm />;

//             case 'informations-complementaires':
//                 return (
//                     <InformationsComplementairesForm />
//                 );

//             case 'competence':
//                 return <CompetenceForm />;

//             case 'savoir-faire':
//                 return <SavoirFaireForm />;

//             case 'logiciel':
//                 return <LogicielForm />;

//             case 'langue':
//                 return <LangueForm />;

//             case 'interet':
//                 return <InteretForm />;

//             default:
//                 return null;
//         }
//     };

//     if (loading) {
//         return (
//             <div className="flex min-h-screen items-center justify-center bg-gray-100">
//                 <div className="rounded-xl border border-gray-200 bg-white px-8 py-6 shadow-sm">
//                     <p className="text-gray-600">
//                         Chargement du CV...
//                     </p>
//                 </div>
//             </div>
//         );
//     }

//     if (error && !cv?.id) {
//         return (
//             <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
//                 <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
//                     <h2 className="mb-4 text-xl font-semibold text-red-600">
//                         Impossible de charger le CV
//                     </h2>

//                     <p className="mb-6 text-gray-600">
//                         {error}
//                     </p>

//                     <button
//                         type="button"
//                         onClick={() =>
//                             navigate('/mes-cvs')
//                         }
//                         className="rounded-lg bg-gray-900 px-5 py-3 text-white hover:bg-gray-800"
//                     >
//                         Retour à mes CV
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-100">
//             <div className="sticky top-0 z-40 border-b bg-white">
//                 <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-4 px-6 py-4">
//                     <div>
//                         <h1 className="text-2xl font-bold text-gray-900">
//                             Modifier mon CV
//                         </h1>

//                         <p className="mt-1 text-sm text-gray-500">
//                             Modifiez les informations de votre CV puis enregistrez les changements.
//                         </p>
//                     </div>

//                     <div className="flex items-center gap-3">
//                         <button
//                             type="button"
//                             onClick={() =>
//                                 navigate('/mes-cvs')
//                             }
//                             className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-700 hover:bg-gray-50"
//                         >
//                             Mes CV
//                         </button>

//                         <button
//                             type="button"
//                             disabled={saving}
//                             onClick={handleSave}
//                             className="rounded-lg bg-gray-900 px-5 py-2.5 text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
//                         >
//                             {saving
//                                 ? 'Enregistrement...'
//                                 : 'Enregistrer les modifications'}
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {error && (
//                 <div className="mx-auto max-w-[1800px] px-6 pt-5">
//                     <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//                         {error}
//                     </div>
//                 </div>
//             )}

//             {successMessage && (
//                 <div className="mx-auto max-w-[1800px] px-6 pt-5">
//                     <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
//                         {successMessage}
//                     </div>
//                 </div>
//             )}

//             <div className="mx-auto max-w-[1800px] p-6">
//                 <div className="grid grid-cols-1 gap-8 xl:grid-cols-[420px_minmax(0,1fr)]">

//                     <div className="max-h-[calc(100vh-120px)] overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-sm">
//                         <div className="sticky top-0 z-10 border-b bg-white p-5">
//                             <h2 className="text-lg font-semibold text-gray-900">
//                                 Informations du CV
//                             </h2>

//                             <p className="mt-1 text-sm text-gray-500">
//                                 Complétez les différentes sections.
//                             </p>
//                         </div>

//                         <div className="p-3">
//                             {sections.map((section) => (
//                                 <button
//                                     key={section.id}
//                                     type="button"
//                                     onClick={() =>
//                                         setActiveSection(section.id)
//                                     }
//                                     className={`mb-1 w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
//                                         activeSection === section.id
//                                             ? 'bg-gray-900 text-white'
//                                             : 'text-gray-700 hover:bg-gray-100'
//                                     }`}
//                                 >
//                                     {section.label}
//                                 </button>
//                             ))}
//                         </div>

//                         <div
//                             ref={formPanelRef}
//                             className="border-t border-gray-200 p-5"
//                         >
//                             {renderForm()}
//                         </div>
//                     </div>

//                     <div className="min-w-0">
//                         <div className="mb-4 flex items-center justify-between">
//                             <div>
//                                 <h2 className="text-xl font-semibold text-gray-900">
//                                     Aperçu du CV
//                                 </h2>

//                                 <p className="mt-1 text-sm text-gray-500">
//                                     Le modèle sélectionné est appliqué automatiquement.
//                                 </p>
//                             </div>

//                             <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
//                                 Aperçu en direct
//                             </div>
//                         </div>

//                         <div className="flex justify-center overflow-auto rounded-2xl border border-gray-200 bg-slate-400 p-6 shadow-sm">
//                             <CvTemplateRenderer cv={cv} />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }









import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useCv } from '../context/CvContext';

import {
    getCvById,
    updateCv,
    deleteCv,
    createExperience,
    updateExperience,
    deleteExperience,
    createFormation,
    updateFormation,
    deleteFormation,
    createInformationComplementaire,
    updateInformationComplementaire,
    deleteInformationComplementaire,
    createCompetence,
    updateCompetence,
    deleteCompetence,
    createSavoirFaire,
    updateSavoirFaire,
    deleteSavoirFaire,
    createLogiciel,
    updateLogiciel,
    deleteLogiciel,
    createLangue,
    updateLangue,
    deleteLangue,
    createInteret,
    updateInteret,
    deleteInteret,
} from '../services/cvService';

import InformationsForm from './InformationsForm';
import ProfileForm from './ProfileForm';
import ExperienceForm from './ExperienceForm';
import FormationForm from './FormationForm';
import InformationsComplementairesForm from './InformationsComplementairesForm';
import CompetenceForm from './CompetenceForm';
import SavoirFaireForm from './SavoirFaireForm';
import LogicielForm from './LogicielForm';
import LangueForm from './LangueForm';
import InteretForm from './InteretForm';

import TemplateSelector from './TemplateSelector';
import CvTemplateRenderer from './CvTemplateRenderer';

const sections = [
    { id: 'template', label: 'Modèle du CV' },
    { id: 'informations', label: 'Informations personnelles' },
    { id: 'profil', label: 'Profil professionnel' },
    { id: 'experience', label: 'Expériences professionnelles' },
    { id: 'formation', label: 'Formation' },
    {
        id: 'informations-complementaires',
        label: 'Informations complémentaires',
    },
    { id: 'competence', label: 'Compétences' },
    { id: 'savoir-faire', label: 'Savoir-faire' },
    { id: 'logiciel', label: 'Logiciels' },
    { id: 'langue', label: 'Langues' },
    { id: 'interet', label: 'Centres d’intérêt' },
];

const normalizeCv = (data) => {
    if (!data) {
        return {
            id: null,
            template: 'classic',
            titre_poste: '',
            nom: '',
            prenom: '',
            photo: null,
            telephone: '',
            email: '',
            adresse: '',
            ville: '',
            linkedin: '',
            github: '',
            portfolio: '',
            profil_professionnel: '',
            experiences: [],
            formations: [],
            informationsComplementaires: [],
            competences: [],
            savoirFaires: [],
            logiciels: [],
            langues: [],
            interets: [],
        };
    }

    let photo = null;

    if (data.photo) {
        if (typeof data.photo === 'object') {
            photo = {
                ...data.photo,
                preview: data.photo.preview || data.photo.url || null,
                file: data.photo.file || null,
            };
        } else {
            photo = {
                path: data.photo,
                preview: `http://127.0.0.1:8000/storage/${data.photo}`,
                file: null,
            };
        }
    }

    return {
        id: data.id ?? null,
        template: data.template ?? 'classic',
        titre_poste: data.titre_poste ?? '',
        nom: data.nom ?? '',
        prenom: data.prenom ?? '',
        photo,
        telephone: data.telephone ?? '',
        email: data.email ?? '',
        adresse: data.adresse ?? '',
        ville: data.ville ?? '',
        linkedin: data.linkedin ?? '',
        github: data.github ?? '',
        portfolio: data.portfolio ?? '',
        profil_professionnel: data.profil_professionnel ?? '',

        experiences: Array.isArray(data.experiences)
            ? data.experiences
            : [],

        formations: Array.isArray(data.formations)
            ? data.formations
            : [],

        informationsComplementaires: Array.isArray(
            data.informations_complementaires
        )
            ? data.informations_complementaires
            : Array.isArray(data.informationsComplementaires)
                ? data.informationsComplementaires
                : [],

        competences: Array.isArray(data.competences)
            ? data.competences
            : [],

        savoirFaires: Array.isArray(data.savoir_faires)
            ? data.savoir_faires
            : Array.isArray(data.savoirFaires)
                ? data.savoirFaires
                : [],

        logiciels: Array.isArray(data.logiciels)
            ? data.logiciels
            : [],

        langues: Array.isArray(data.langues)
            ? data.langues
            : [],

        interets: Array.isArray(data.interets)
            ? data.interets
            : [],
    };
};

export default function ModifierCv() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { cv, setCv, resetCv } = useCv();

    const [activeSection, setActiveSection] = useState('template');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const formPanelRef = useRef(null);

    useEffect(() => {
        let mounted = true;

        const loadCv = async () => {
            try {
                setLoading(true);
                setError('');
                setSuccessMessage('');

                const response = await getCvById(id);
                const responseData = response?.data || response;
                const data = responseData?.data || responseData;

                if (!mounted) return;

                setCv(normalizeCv(data));
            } catch (err) {
                console.error('Erreur lors du chargement du CV :', err);

                if (!mounted) return;

                if (err.response?.status === 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    navigate('/connexion', { replace: true });
                    return;
                }

                if (err.response?.status === 403) {
                    setError('Vous n’êtes pas autorisé à modifier ce CV.');
                } else if (err.response?.status === 404) {
                    setError('Ce CV n’existe pas ou a été supprimé.');
                } else {
                    setError(
                        err.response?.data?.message ||
                        'Impossible de charger ce CV.'
                    );
                }
            } finally {
                if (mounted) setLoading(false);
            }
        };

        loadCv();

        return () => {
            mounted = false;
        };
    }, [id, navigate, setCv]);

    useEffect(() => {
        if (!formPanelRef.current) return;

        formPanelRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
        });
    }, [activeSection]);

    const handleDelete = async () => {
        if (!cv?.id || deleting || saving) return;

        const confirmed = window.confirm(
            `Voulez-vous vraiment supprimer le CV de ${cv.prenom || ''} ${cv.nom || ''} ?\n\nCette action est définitive.`
        );

        if (!confirmed) return;

        try {
            setDeleting(true);
            setError('');
            setSuccessMessage('');

            await deleteCv(id);

            if (typeof resetCv === 'function') {
                resetCv();
            } else {
                setCv(normalizeCv(null));
            }

            navigate('/mes-cvs', {
                replace: true,
                state: {
                    message: 'Le CV a été supprimé avec succès.',
                },
            });
        } catch (err) {
            console.error('Erreur lors de la suppression du CV :', err);

            if (err.response?.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');

                navigate('/connexion', { replace: true });
                return;
            }

            if (err.response?.status === 403) {
                setError(
                    'Vous n’êtes pas autorisé à supprimer ce CV.'
                );
            } else if (err.response?.status === 404) {
                setError(
                    'Ce CV n’existe plus ou a déjà été supprimé.'
                );
            } else {
                setError(
                    err.response?.data?.message ||
                    'Une erreur est survenue lors de la suppression du CV.'
                );
            }
        } finally {
            setDeleting(false);
        }
    };

    const syncCollection = async ({
        currentItems = [],
        originalItems = [],
        createItem,
        updateItem,
        deleteItem,
    }) => {
        const currentIds = new Set();

        for (const item of currentItems) {
            if (item.id) {
                currentIds.add(String(item.id));
                await updateItem(item.id, item);
            } else {
                await createItem(item);
            }
        }

        for (const original of originalItems) {
            if (
                original.id &&
                !currentIds.has(String(original.id))
            ) {
                await deleteItem(original.id);
            }
        }
    };

    const handleSave = async () => {
        if (!cv?.id) {
            setError(
                'Impossible d’enregistrer : identifiant du CV manquant.'
            );
            return;
        }

        if (saving || deleting) return;

        if (!cv.titre_poste?.trim()) {
            setError('Veuillez renseigner le titre du poste.');
            setActiveSection('informations');
            return;
        }

        if (!cv.nom?.trim()) {
            setError('Veuillez renseigner votre nom.');
            setActiveSection('informations');
            return;
        }

        if (!cv.prenom?.trim()) {
            setError('Veuillez renseigner votre prénom.');
            setActiveSection('informations');
            return;
        }

        try {
            setSaving(true);
            setError('');
            setSuccessMessage('');

            const response = await getCvById(id);
            const responseData = response?.data || response;
            const serverCv = responseData?.data || responseData;

            await updateCv(id, {
                ...cv,
                template: cv.template || 'classic',
            });

            await syncCollection({
                currentItems: cv.experiences || [],
                originalItems: serverCv.experiences || [],
                createItem: (item) => createExperience(id, item),
                updateItem: (itemId, item) =>
                    updateExperience(id, itemId, item),
                deleteItem: (itemId) => deleteExperience(id, itemId),
            });

            await syncCollection({
                currentItems: cv.formations || [],
                originalItems: serverCv.formations || [],
                createItem: (item) => createFormation(id, item),
                updateItem: (itemId, item) =>
                    updateFormation(id, itemId, item),
                deleteItem: (itemId) => deleteFormation(id, itemId),
            });

            await syncCollection({
                currentItems: cv.informationsComplementaires || [],
                originalItems:
                    serverCv.informations_complementaires ||
                    serverCv.informationsComplementaires ||
                    [],
                createItem: (item) =>
                    createInformationComplementaire(id, item),
                updateItem: (itemId, item) =>
                    updateInformationComplementaire(id, itemId, item),
                deleteItem: (itemId) =>
                    deleteInformationComplementaire(id, itemId),
            });

            await syncCollection({
                currentItems: cv.competences || [],
                originalItems: serverCv.competences || [],
                createItem: (item) => createCompetence(id, item),
                updateItem: (itemId, item) =>
                    updateCompetence(id, itemId, item),
                deleteItem: (itemId) => deleteCompetence(id, itemId),
            });

            await syncCollection({
                currentItems: cv.savoirFaires || [],
                originalItems:
                    serverCv.savoir_faires ||
                    serverCv.savoirFaires ||
                    [],
                createItem: (item) => createSavoirFaire(id, item),
                updateItem: (itemId, item) =>
                    updateSavoirFaire(id, itemId, item),
                deleteItem: (itemId) => deleteSavoirFaire(id, itemId),
            });

            await syncCollection({
                currentItems: cv.logiciels || [],
                originalItems: serverCv.logiciels || [],
                createItem: (item) => createLogiciel(id, item),
                updateItem: (itemId, item) =>
                    updateLogiciel(id, itemId, item),
                deleteItem: (itemId) => deleteLogiciel(id, itemId),
            });

            await syncCollection({
                currentItems: cv.langues || [],
                originalItems: serverCv.langues || [],
                createItem: (item) => createLangue(id, item),
                updateItem: (itemId, item) =>
                    updateLangue(id, itemId, item),
                deleteItem: (itemId) => deleteLangue(id, itemId),
            });

            await syncCollection({
                currentItems: cv.interets || [],
                originalItems: serverCv.interets || [],
                createItem: (item) => createInteret(id, item),
                updateItem: (itemId, item) =>
                    updateInteret(id, itemId, item),
                deleteItem: (itemId) => deleteInteret(id, itemId),
            });

            const finalResponse = await getCvById(id);
            const finalResponseData =
                finalResponse?.data || finalResponse;
            const finalData =
                finalResponseData?.data || finalResponseData;

            setCv(normalizeCv(finalData));
            setSuccessMessage(
                'Votre CV a été modifié avec succès.'
            );
        } catch (err) {
            console.error(
                'Erreur lors de la modification du CV :',
                err
            );

            if (err.response?.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/connexion', { replace: true });
                return;
            }

            if (err.response?.status === 422) {
                const errors = err.response?.data?.errors;
                const firstError = errors
                    ? Object.values(errors).flat().find(Boolean)
                    : null;

                setError(
                    firstError ||
                    'Certaines informations sont invalides.'
                );
            } else if (err.response?.status === 403) {
                setError(
                    'Vous n’êtes pas autorisé à modifier ce CV.'
                );
            } else {
                setError(
                    err.response?.data?.message ||
                    'Une erreur est survenue lors de la modification du CV.'
                );
            }
        } finally {
            setSaving(false);
        }
    };

    const renderForm = () => {
        switch (activeSection) {
            case 'template':
                return <TemplateSelector />;
            case 'informations':
                return <InformationsForm />;
            case 'profil':
                return <ProfileForm />;
            case 'experience':
                return <ExperienceForm />;
            case 'formation':
                return <FormationForm />;
            case 'informations-complementaires':
                return <InformationsComplementairesForm />;
            case 'competence':
                return <CompetenceForm />;
            case 'savoir-faire':
                return <SavoirFaireForm />;
            case 'logiciel':
                return <LogicielForm />;
            case 'langue':
                return <LangueForm />;
            case 'interet':
                return <InteretForm />;
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="rounded-xl border border-gray-200 bg-white px-8 py-6 shadow-sm">
                    <p className="text-gray-600">
                        Chargement du CV...
                    </p>
                </div>
            </div>
        );
    }

    if (error && !cv?.id) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
                <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold text-red-600">
                        Impossible de charger le CV
                    </h2>

                    <p className="mb-6 text-gray-600">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate('/mes-cvs')}
                        className="rounded-lg bg-gray-900 px-5 py-3 text-white hover:bg-gray-800"
                    >
                        Retour à mes CV
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="sticky top-0 z-40 border-b bg-white">
                <div className="mx-auto flex max-w-[1800px] flex-wrap items-center justify-between gap-4 px-6 py-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Modifier mon CV
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Modifiez les informations de votre CV puis enregistrez les changements.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            type="button"
                            onClick={() => navigate('/mes-cvs')}
                            disabled={saving || deleting}
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                            Mes CV
                        </button>

                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={saving || deleting}
                            className="rounded-lg border border-red-200 bg-white px-4 py-2.5 font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {deleting
                                ? 'Suppression...'
                                : 'Supprimer ce CV'}
                        </button>

                        <button
                            type="button"
                            disabled={saving || deleting}
                            onClick={handleSave}
                            className="rounded-lg bg-gray-900 px-5 py-2.5 text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {saving
                                ? 'Enregistrement...'
                                : 'Enregistrer les modifications'}
                        </button>
                    </div>
                </div>
            </div>

            {error && (
                <div className="mx-auto max-w-[1800px] px-6 pt-5">
                    <div
                        role="alert"
                        className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                        {error}
                    </div>
                </div>
            )}

            {successMessage && (
                <div className="mx-auto max-w-[1800px] px-6 pt-5">
                    <div
                        role="status"
                        className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
                    >
                        {successMessage}
                    </div>
                </div>
            )}

            <div className="mx-auto max-w-[1800px] p-6">
                <div className="grid grid-cols-1 gap-8 xl:grid-cols-[420px_minmax(0,1fr)]">
                    <div className="max-h-[calc(100vh-120px)] overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                        <div className="sticky top-0 z-10 border-b bg-white p-5">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Informations du CV
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Complétez les différentes sections.
                            </p>
                        </div>

                        <div className="p-3">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    type="button"
                                    onClick={() =>
                                        setActiveSection(section.id)
                                    }
                                    className={`mb-1 w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
                                        activeSection === section.id
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    {section.label}
                                </button>
                            ))}
                        </div>

                        <div
                            ref={formPanelRef}
                            className="border-t border-gray-200 p-5"
                        >
                            {renderForm()}
                        </div>
                    </div>

                    <div className="min-w-0">
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Aperçu du CV
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Le modèle sélectionné est appliqué automatiquement.
                                </p>
                            </div>

                            <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                                Aperçu en direct
                            </div>
                        </div>

                        <div className="flex justify-center overflow-auto rounded-2xl border border-gray-200 bg-slate-400 p-6 shadow-sm">
                            <CvTemplateRenderer cv={cv} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
