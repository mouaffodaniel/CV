// import { useEffect, useRef, useState } from 'react';
// import { useCv } from '../context/CvContext';

// const MAX_PHOTO_SIZE = 5 * 1024 * 1024;

// const initialErrors = {
//     titre_poste: '',
//     nom: '',
//     prenom: '',
//     telephone: '',
//     email: '',
//     adresse: '',
//     linkedin: '',
//     github: '',
//     portfolio: '',
//     photo: '',
// };

// function isValidEmail(email) {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// }

// function isValidUrl(value) {
//     try {
//         const url = new URL(value);
//         return ['http:', 'https:'].includes(url.protocol);
//     } catch {
//         return false;
//     }
// }

// export default function InformationsForm() {
//     const { cv, updateCv } = useCv();

//     const fileInputRef = useRef(null);
//     const previousPreviewRef = useRef(null);

//     const [errors, setErrors] = useState(initialErrors);

//     useEffect(() => {
//         return () => {
//             if (previousPreviewRef.current) {
//                 URL.revokeObjectURL(previousPreviewRef.current);
//             }
//         };
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         updateCv(name, value);

//         if (errors[name]) {
//             setErrors((previous) => ({
//                 ...previous,
//                 [name]: '',
//             }));
//         }
//     };

//     const validateField = (name, value) => {
//         let error = '';

//         if (name === 'titre_poste' && !value.trim()) {
//             error = 'Le titre du poste est obligatoire.';
//         }

//         if (name === 'nom' && !value.trim()) {
//             error = 'Le nom est obligatoire.';
//         }

//         if (name === 'prenom' && !value.trim()) {
//             error = 'Le prénom est obligatoire.';
//         }

//         if (name === 'email') {
//             if (!value.trim()) {
//                 error = "L'adresse e-mail est obligatoire.";
//             } else if (!isValidEmail(value.trim())) {
//                 error = "L'adresse e-mail n'est pas valide.";
//             }
//         }

//         if (name === 'telephone' && !value.trim()) {
//             error = 'Le numéro de téléphone est obligatoire.';
//         }

//         if (
//             ['linkedin', 'github', 'portfolio'].includes(name) &&
//             value.trim() &&
//             !isValidUrl(value.trim())
//         ) {
//             error = 'Veuillez saisir une adresse URL valide.';
//         }

//         setErrors((previous) => ({
//             ...previous,
//             [name]: error,
//         }));

//         return !error;
//     };

//     const handleBlur = (e) => {
//         const { name, value } = e.target;

//         validateField(name, value);
//     };

//     const handlePhotoChange = (e) => {
//         const file = e.target.files?.[0];

//         if (!file) {
//             return;
//         }

//         if (!file.type.startsWith('image/')) {
//             setErrors((previous) => ({
//                 ...previous,
//                 photo: 'Veuillez sélectionner une image valide.',
//             }));

//             e.target.value = '';

//             return;
//         }

//         if (file.size > MAX_PHOTO_SIZE) {
//             setErrors((previous) => ({
//                 ...previous,
//                 photo: 'La photo ne doit pas dépasser 5 Mo.',
//             }));

//             e.target.value = '';

//             return;
//         }

//         if (previousPreviewRef.current) {
//             URL.revokeObjectURL(previousPreviewRef.current);
//         }

//         const preview = URL.createObjectURL(file);

//         previousPreviewRef.current = preview;

//         updateCv('photo', {
//             file,
//             preview,
//         });

//         setErrors((previous) => ({
//             ...previous,
//             photo: '',
//         }));
//     };

//     const handleRemovePhoto = () => {
//         if (previousPreviewRef.current) {
//             URL.revokeObjectURL(previousPreviewRef.current);
//             previousPreviewRef.current = null;
//         }

//         updateCv('photo', null);

//         setErrors((previous) => ({
//             ...previous,
//             photo: '',
//         }));

//         if (fileInputRef.current) {
//             fileInputRef.current.value = '';
//         }
//     };

//     const validateForm = () => {
//         const fields = [
//             'titre_poste',
//             'nom',
//             'prenom',
//             'telephone',
//             'email',
//             'linkedin',
//             'github',
//             'portfolio',
//         ];

//         let isValid = true;

//         fields.forEach((field) => {
//             const fieldValid = validateField(field, cv[field] || '');

//             if (!fieldValid) {
//                 isValid = false;
//             }
//         });

//         return isValid;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         validateForm();
//     };

//     const inputClass = (field) => {
//         const hasError = Boolean(errors[field]);

//         return `w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
//             hasError
//                 ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
//                 : 'border-slate-300 focus:border-slate-900 focus:ring-2 focus:ring-slate-200'
//         }`;
//     };



import { useRef, useState } from 'react';
import { useCv } from '../context/CvContext';

const MAX_PHOTO_SIZE = 5 * 1024 * 1024;

const initialErrors = {
    titre_poste: '',
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    adresse: '',
    linkedin: '',
    github: '',
    portfolio: '',
    photo: '',
};

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUrl(value) {
    try {
        const url = new URL(value);
        return ['http:', 'https:'].includes(url.protocol);
    } catch {
        return false;
    }
}

export default function InformationsForm() {
    const { cv, updateCv } = useCv();

    const fileInputRef = useRef(null);

    const [errors, setErrors] = useState(initialErrors);

    const handleChange = (e) => {
        const { name, value } = e.target;

        updateCv(name, value);

        if (errors[name]) {
            setErrors((previous) => ({
                ...previous,
                [name]: '',
            }));
        }
    };

    const validateField = (name, value) => {
        let error = '';

        if (name === 'titre_poste' && !value.trim()) {
            error = 'Le titre du poste est obligatoire.';
        }

        if (name === 'nom' && !value.trim()) {
            error = 'Le nom est obligatoire.';
        }

        if (name === 'prenom' && !value.trim()) {
            error = 'Le prénom est obligatoire.';
        }

        if (name === 'email') {
            if (!value.trim()) {
                error = "L'adresse e-mail est obligatoire.";
            } else if (!isValidEmail(value.trim())) {
                error = "L'adresse e-mail n'est pas valide.";
            }
        }

        if (name === 'telephone' && !value.trim()) {
            error = 'Le numéro de téléphone est obligatoire.';
        }

        if (
            ['linkedin', 'github', 'portfolio'].includes(name) &&
            value.trim() &&
            !isValidUrl(value.trim())
        ) {
            error = 'Veuillez saisir une adresse URL valide.';
        }

        setErrors((previous) => ({
            ...previous,
            [name]: error,
        }));

        return !error;
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;

        validateField(name, value);
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith('image/')) {
            setErrors((previous) => ({
                ...previous,
                photo: 'Veuillez sélectionner une image valide.',
            }));

            e.target.value = '';

            return;
        }

        if (file.size > MAX_PHOTO_SIZE) {
            setErrors((previous) => ({
                ...previous,
                photo: 'La photo ne doit pas dépasser 5 Mo.',
            }));

            e.target.value = '';

            return;
        }

        // Lit le fichier et le convertit en data URL (texte "data:image/...")
        const reader = new FileReader();

        reader.onload = () => {
            updateCv('photo', {
                file,
                preview: reader.result,
            });

            setErrors((previous) => ({
                ...previous,
                photo: '',
            }));
        };

        reader.onerror = () => {
            setErrors((previous) => ({
                ...previous,
                photo: 'Impossible de lire la photo. Réessayez.',
            }));
        };

        reader.readAsDataURL(file);
    };

    const handleRemovePhoto = () => {
        updateCv('photo', null);

        setErrors((previous) => ({
            ...previous,
            photo: '',
        }));

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const validateForm = () => {
        const fields = [
            'titre_poste',
            'nom',
            'prenom',
            'telephone',
            'email',
            'linkedin',
            'github',
            'portfolio',
        ];

        let isValid = true;

        fields.forEach((field) => {
            const fieldValid = validateField(field, cv[field] || '');

            if (!fieldValid) {
                isValid = false;
            }
        });

        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validateForm();

        if (isValid) {
            // Formulaire valide : tu pourras passer à l'étape suivante ici
            console.log('Formulaire valide');
        }
    };

    const inputClass = (field) => {
        const hasError = Boolean(errors[field]);

        return `w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
            hasError
                ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                : 'border-slate-300 focus:border-slate-900 focus:ring-2 focus:ring-slate-200'
        }`;
    };

    // return ( ... ) : colle ici ton JSX actuel, sans aucun changement

    return (
        <form onSubmit={handleSubmit} className="space-y-7">
            <section>
                <div className="mb-4">
                    <h3 className="text-base font-semibold text-slate-900">
                        Identité professionnelle
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                        Ces informations apparaîtront dans l'en-tête de votre CV.
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="titre_poste"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Titre du poste
                            <span className="ml-1 text-red-500">*</span>
                        </label>

                        <input
                            id="titre_poste"
                            name="titre_poste"
                            type="text"
                            value={cv.titre_poste}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Ex. Développeur web"
                            className={inputClass('titre_poste')}
                            maxLength={100}
                        />

                        {errors.titre_poste && (
                            <p className="mt-1.5 text-xs text-red-600">
                                {errors.titre_poste}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="prenom"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Prénom
                                <span className="ml-1 text-red-500">*</span>
                            </label>

                            <input
                                id="prenom"
                                name="prenom"
                                type="text"
                                value={cv.prenom}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Votre prénom"
                                className={inputClass('prenom')}
                                maxLength={100}
                            />

                            {errors.prenom && (
                                <p className="mt-1.5 text-xs text-red-600">
                                    {errors.prenom}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="nom"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Nom
                                <span className="ml-1 text-red-500">*</span>
                            </label>

                            <input
                                id="nom"
                                name="nom"
                                type="text"
                                value={cv.nom}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Votre nom"
                                className={inputClass('nom')}
                                maxLength={100}
                            />

                            {errors.nom && (
                                <p className="mt-1.5 text-xs text-red-600">
                                    {errors.nom}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-t border-slate-200 pt-7">
                <div className="mb-4">
                    <h3 className="text-base font-semibold text-slate-900">
                        Photo de profil
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                        Utilisez de préférence une photo professionnelle avec un
                        arrière-plan sobre.
                    </p>
                </div>

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div className="h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-slate-100 bg-slate-200">
                        {cv.photo?.preview ? (
                            <img
                                src={cv.photo.preview}
                                alt="Aperçu de la photo"
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center">
                                <span className="text-sm font-semibold text-slate-400">
                                    Photo
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="min-w-0">
                        <div className="flex flex-wrap gap-3">
                            <label
                                htmlFor="photo"
                                className="inline-flex cursor-pointer items-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                Choisir une photo
                            </label>

                            {cv.photo?.preview && (
                                <button
                                    type="button"
                                    onClick={handleRemovePhoto}
                                    className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    Supprimer
                                </button>
                            )}
                        </div>

                        <input
                            ref={fileInputRef}
                            id="photo"
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handlePhotoChange}
                            className="hidden"
                        />

                        <p className="mt-2 text-xs text-slate-500">
                            JPG, PNG ou WebP. Taille maximale : 5 Mo.
                        </p>

                        {errors.photo && (
                            <p className="mt-1.5 text-xs text-red-600">
                                {errors.photo}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <section className="border-t border-slate-200 pt-7">
                <div className="mb-4">
                    <h3 className="text-base font-semibold text-slate-900">
                        Coordonnées
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                        Indiquez les moyens permettant à un recruteur de vous
                        contacter.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="telephone"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Téléphone
                                <span className="ml-1 text-red-500">*</span>
                            </label>

                            <input
                                id="telephone"
                                name="telephone"
                                type="tel"
                                value={cv.telephone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="+237 6XX XX XX XX"
                                className={inputClass('telephone')}
                                maxLength={30}
                            />

                            {errors.telephone && (
                                <p className="mt-1.5 text-xs text-red-600">
                                    {errors.telephone}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Adresse e-mail
                                <span className="ml-1 text-red-500">*</span>
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={cv.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="vous@example.com"
                                className={inputClass('email')}
                                maxLength={150}
                            />

                            {errors.email && (
                                <p className="mt-1.5 text-xs text-red-600">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="adresse"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Adresse
                        </label>

                        <input
                            id="adresse"
                            name="adresse"
                            type="text"
                            value={cv.adresse}
                            onChange={handleChange}
                            placeholder="Ville, pays"
                            className={inputClass('adresse')}
                            maxLength={255}
                        />
                    </div>
                </div>
            </section>

            <section className="border-t border-slate-200 pt-7">
                <div className="mb-4">
                    <h3 className="text-base font-semibold text-slate-900">
                        Présence en ligne
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                        Ajoutez uniquement les profils professionnels que vous
                        souhaitez afficher sur votre CV.
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="linkedin"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            LinkedIn
                        </label>

                        <input
                            id="linkedin"
                            name="linkedin"
                            type="url"
                            value={cv.linkedin}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="https://linkedin.com/in/votre-profil"
                            className={inputClass('linkedin')}
                        />

                        {errors.linkedin && (
                            <p className="mt-1.5 text-xs text-red-600">
                                {errors.linkedin}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="github"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            GitHub
                        </label>

                        <input
                            id="github"
                            name="github"
                            type="url"
                            value={cv.github}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="https://github.com/votre-compte"
                            className={inputClass('github')}
                        />

                        {errors.github && (
                            <p className="mt-1.5 text-xs text-red-600">
                                {errors.github}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="portfolio"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Portfolio
                        </label>

                        <input
                            id="portfolio"
                            name="portfolio"
                            type="url"
                            value={cv.portfolio}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="https://votre-portfolio.com"
                            className={inputClass('portfolio')}
                        />

                        {errors.portfolio && (
                            <p className="mt-1.5 text-xs text-red-600">
                                {errors.portfolio}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <div className="border-t border-slate-200 pt-5">
                <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-4 py-3">
                    <p className="text-xs leading-5 text-slate-500">
                        Les champs marqués d'un astérisque sont obligatoires.
                    </p>

                    <button
                        type="submit"
                        className="shrink-0 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        Vérifier
                    </button>
                </div>
            </div>
        </form>
    );
}