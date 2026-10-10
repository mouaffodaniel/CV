// import { createContext, useContext, useState } from 'react';

// const CvContext = createContext(null);

// const initialCv = {
//     id: null,
//     template: 'classic',
//     titre_poste: '',
//     nom: '',
//     prenom: '',
//     photo: null,
//     telephone: '',
//     email: '',
//     adresse: '',
//     linkedin: '',
//     github: '',
//     portfolio: '',
//     profil_professionnel: '',

//     experiences: [],
//     formations: [],
//     competences: [],
//     savoirFaires: [],
//     logiciels: [],
//     langues: [],
//     interets: [],
// };

// export function CvProvider({ children }) {
//     const [cv, setCv] = useState(initialCv);

//     const updateCv = (field, value) => {
//         setCv((previous) => ({
//             ...previous,
//             [field]: value,
//         }));
//     };

//     const resetCv = () => {
//         setCv(initialCv);
//     };

//     return (
//         <CvContext.Provider
//             value={{
//                 cv,
//                 setCv,
//                 updateCv,
//                 resetCv,
//             }}
//         >
//             {children}
//         </CvContext.Provider>
//     );
// }

// export function useCv() {
//     const context = useContext(CvContext);

//     if (!context) {
//         throw new Error(
//             'useCv doit être utilisé à l’intérieur de CvProvider.'
//         );
//     }

//     return context;
// }





// import {
//     createContext,
//     useContext,
//     useEffect,
//     useState,
// } from 'react';

// const CvContext = createContext(null);

// const CV_DRAFT_KEY = 'cv-pro-draft';

// const initialCv = {
//     id: null,
//     template: 'classic',
//     titre_poste: '',
//     nom: '',
//     prenom: '',
//     photo: null,
//     telephone: '',
//     email: '',
//     adresse: '',
//     linkedin: '',
//     github: '',
//     portfolio: '',
//     profil_professionnel: '',
//     experiences: [],
//     formations: [],
//     informationsComplementaires: [],
//     competences: [],
//     savoirFaires: [],
//     logiciels: [],
//     langues: [],
//     interets: [],
// };

// function getInitialCv() {
//     try {
//         const savedDraft = localStorage.getItem(CV_DRAFT_KEY);

//         if (savedDraft) {
//             const parsedDraft = JSON.parse(savedDraft);

//             return {
//                 ...initialCv,
//                 ...parsedDraft,
//                 // Les tableaux restent toujours des tableaux.
//                 experiences: Array.isArray(parsedDraft.experiences)
//                     ? parsedDraft.experiences
//                     : [],
//                 formations: Array.isArray(parsedDraft.formations)
//                     ? parsedDraft.formations
//                     : [],
//                 informationsComplementaires: Array.isArray(
//                     parsedDraft.informationsComplementaires
//                 )
//                     ? parsedDraft.informationsComplementaires
//                     : [],
//                 competences: Array.isArray(parsedDraft.competences)
//                     ? parsedDraft.competences
//                     : [],
//                 savoirFaires: Array.isArray(parsedDraft.savoirFaires)
//                     ? parsedDraft.savoirFaires
//                     : [],
//                 logiciels: Array.isArray(parsedDraft.logiciels)
//                     ? parsedDraft.logiciels
//                     : [],
//                 langues: Array.isArray(parsedDraft.langues)
//                     ? parsedDraft.langues
//                     : [],
//                 interets: Array.isArray(parsedDraft.interets)
//                     ? parsedDraft.interets
//                     : [],
//                 // Une URL blob n'est plus valide après un rechargement.
//                 photo:
//                     typeof parsedDraft.photo === 'string' &&
//                     !parsedDraft.photo.startsWith('blob:')
//                         ? parsedDraft.photo
//                         : null,
//             };
//         }
//     } catch (error) {
//         console.error(
//             'Erreur lors de la restauration du brouillon :',
//             error
//         );
//     }

//     return initialCv;
// }

// export function CvProvider({ children }) {
//     const [cv, setCv] = useState(getInitialCv);

//     useEffect(() => {
//         try {
//             const draft = { ...cv };

//             // Ne pas tenter de sérialiser un fichier photo brut.
//             if (draft.photo instanceof File) {
//                 draft.photo = null;
//             }

//             // Les aperçus temporaires blob ne survivent pas au rechargement.
//             if (
//                 typeof draft.photo === 'string' &&
//                 draft.photo.startsWith('blob:')
//             ) {
//                 draft.photo = null;
//             }

//             if (
//                 draft.photo &&
//                 typeof draft.photo === 'object'
//             ) {
//                 draft.photo = {
//                     ...draft.photo,
//                     file: null,
//                     preview:
//                         typeof draft.photo.preview === 'string' &&
//                         !draft.photo.preview.startsWith('blob:')
//                             ? draft.photo.preview
//                             : null,
//                 };
//             }

//             localStorage.setItem(
//                 CV_DRAFT_KEY,
//                 JSON.stringify(draft)
//             );
//         } catch (error) {
//             console.error(
//                 'Erreur lors de la sauvegarde automatique du brouillon :',
//                 error
//             );
//         }
//     }, [cv]);

//     const updateCv = (field, value) => {
//         setCv((previous) => ({
//             ...previous,
//             [field]: value,
//         }));
//     };

//     const resetCv = () => {
//         setCv({ ...initialCv });

//         try {
//             localStorage.removeItem(CV_DRAFT_KEY);
//         } catch (error) {
//             console.error(
//                 'Erreur lors de la suppression du brouillon :',
//                 error
//             );
//         }
//     };

//     return (
//         <CvContext.Provider
//             value={{
//                 cv,
//                 setCv,
//                 updateCv,
//                 resetCv,
//             }}
//         >
//             {children}
//         </CvContext.Provider>
//     );
// }

// export function useCv() {
//     const context = useContext(CvContext);

//     if (!context) {
//         throw new Error(
//             'useCv doit être utilisé à l’intérieur de CvProvider.'
//         );
//     }

//     return context;
// }





import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

const CvContext = createContext(null);

const CV_DRAFT_KEY = 'cv-pro-draft';

// Champs qui doivent toujours être des tableaux.
const ARRAY_FIELDS = [
    'experiences',
    'formations',
    'informationsComplementaires',
    'competences',
    'savoirFaires',
    'logiciels',
    'langues',
    'interets',
];

const initialCv = {
    id: null,
    template: 'classic',
    titre_poste: '',
    nom: '',
    prenom: '',
    photo: null, // null ou string (URL / data URL)
    telephone: '',
    email: '',
    adresse: '',
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

// Une photo n'est sauvegardable que si c'est une string non "blob:".
function sanitizePhoto(photo) {
    return typeof photo === 'string' && !photo.startsWith('blob:')
        ? photo
        : null;
}

function getInitialCv() {
    try {
        const saved = localStorage.getItem(CV_DRAFT_KEY);
        if (!saved) return initialCv;

        const draft = { ...initialCv, ...JSON.parse(saved) };

        ARRAY_FIELDS.forEach((field) => {
            if (!Array.isArray(draft[field])) draft[field] = [];
        });

        draft.photo = sanitizePhoto(draft.photo);

        return draft;
    } catch (error) {
        console.error('Erreur lors de la restauration du brouillon :', error);
        return initialCv;
    }
}

export function CvProvider({ children }) {
    const [cv, setCv] = useState(getInitialCv);

    useEffect(() => {
        try {
            localStorage.setItem(
                CV_DRAFT_KEY,
                JSON.stringify({ ...cv, photo: sanitizePhoto(cv.photo) })
            );
        } catch (error) {
            console.error('Erreur lors de la sauvegarde du brouillon :', error);
        }
    }, [cv]);

    const updateCv = useCallback((field, value) => {
        setCv((previous) => ({ ...previous, [field]: value }));
    }, []);

    // Le useEffect ci-dessus réécrit le brouillon vide tout seul.
    const resetCv = useCallback(() => {
        setCv({ ...initialCv });
    }, []);

    const value = useMemo(
        () => ({ cv, setCv, updateCv, resetCv }),
        [cv, updateCv, resetCv]
    );

    return <CvContext.Provider value={value}>{children}</CvContext.Provider>;
}

export function useCv() {
    const context = useContext(CvContext);

    if (!context) {
        throw new Error('useCv doit être utilisé à l’intérieur de CvProvider.');
    }

    return context;
}
