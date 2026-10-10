// // import CvProfile from './CvProfile';
// // import CvFormation from './CvFormation';
// // import CvExperience from './CvExperience';
// // import CvInformationsComplementaires from './CvInformationsComplementaires';
// // import CvCompetences from './CvCompetences';
// // import CvSavoirFaire from './CvSavoirFaire';
// // import CvLogiciels from './CvLogiciels';
// // import CvLangues from './CvLangues';
// // import CvInterets from './CvInterets';

// // export default function CvTemplateStudent({ cv }) {
// //     const fullName =
// //         [cv?.prenom, cv?.nom]
// //             .filter(Boolean)
// //             .join(' ') || 'Votre nom';

// //     const photoPreview =
// //         typeof cv?.photo === 'object' && cv.photo !== null
// //             ? cv.photo.preview || cv.photo.url || null
// //             : typeof cv?.photo === 'string'
// //                 ? cv.photo
// //                 : null;

// //     return (
// //         <div
// //             id="cv-preview"
// //             className="mx-auto min-h-[297mm] w-[210mm] overflow-hidden bg-white shadow-2xl"
// //         >
// //             <header className="border-b-4 border-blue-600 bg-blue-50 px-[10mm] py-[7mm]">
// //                 <div className="flex items-center gap-[6mm]">
// //                     {photoPreview ? (
// //                         <div className="h-[30mm] w-[30mm] shrink-0 overflow-hidden rounded-full border-2 border-white shadow">
// //                             <img
// //                                 src={photoPreview}
// //                                 alt={fullName}
// //                                 crossOrigin="anonymous"
// //                                 referrerPolicy="no-referrer"
// //                                 className="h-full w-full object-cover"
// //                             />
// //                         </div>
// //                     ) : (
// //                         <div className="flex h-[30mm] w-[30mm] shrink-0 items-center justify-center rounded-full bg-blue-600 text-[8mm] font-bold text-white">
// //                             {(cv?.prenom?.charAt(0) || '') +
// //                                 (cv?.nom?.charAt(0) || '')}
// //                         </div>
// //                     )}

// //                     <div>
// //                         <h1 className="text-[8mm] font-bold uppercase leading-tight text-slate-900">
// //                             {fullName}
// //                         </h1>

// //                         <p className="mt-[2mm] text-[4mm] font-semibold text-blue-700">
// //                             {cv?.titre_poste || 'Étudiant / Stagiaire'}
// //                         </p>
// //                     </div>
// //                 </div>

// //                 <div className="mt-[4mm] flex flex-wrap gap-x-5 gap-y-1 text-[8.5px] text-slate-600">
// //                     {cv?.telephone && <span>{cv.telephone}</span>}
// //                     {cv?.email && <span>{cv.email}</span>}
// //                     {cv?.adresse && <span>{cv.adresse}</span>}
// //                 </div>
// //             </header>

// //             <main className="px-[10mm] py-[7mm]">
// //                 <CvProfile cv={cv} />

// //                 <div className="mt-[4mm]">
// //                     <CvFormation cv={cv} />
// //                     <CvInformationsComplementaires cv={cv} />
// //                     <CvExperience cv={cv} />
// //                 </div>

// //                 <div className="mt-[5mm] grid grid-cols-2 gap-[8mm]">
// //                     <div>
// //                         <CvCompetences cv={cv} />
// //                         <CvSavoirFaire cv={cv} />
// //                     </div>

// //                     <div>
// //                         <CvLogiciels cv={cv} />
// //                         <CvLangues cv={cv} />
// //                         <CvInterets cv={cv} />
// //                     </div>
// //                 </div>
// //             </main>
// //         </div>
// //     );
// // }


// import CvProfile from './CvProfile';
// import CvFormation from './CvFormation';
// import CvExperience from './CvExperience';
// import CvInformationsComplementaires from './CvInformationsComplementaires';
// import CvCompetences from './CvCompetences';
// import CvSavoirFaire from './CvSavoirFaire';
// import CvLogiciels from './CvLogiciels';
// import CvLangues from './CvLangues';
// import CvInterets from './CvInterets';

// // La photo peut être un objet { file, preview } (upload du formulaire)
// // ou une simple string (URL). Renvoie toujours une URL ou null.
// function getPhotoPreview(photo) {
//     if (typeof photo === 'string') {
//         return photo;
//     }

//     if (typeof photo === 'object' && photo !== null) {
//         return photo.preview || photo.url || null;
//     }

//     return null;
// }

// // Raccourcit l'URL pour l'affichage :
// // "https://www.github.com/daniel/" devient "github.com/daniel"
// function formatUrl(url) {
//     return url
//         .replace(/^https?:\/\//, '')
//         .replace(/^www\./, '')
//         .replace(/\/$/, '');
// }

// export default function CvTemplateStudent({ cv }) {
//     const fullName =
//         [cv?.prenom, cv?.nom].filter(Boolean).join(' ') || 'Votre nom';

//     const photoPreview = getPhotoPreview(cv?.photo);

//     const initials = (
//         (cv?.prenom?.charAt(0) || '') + (cv?.nom?.charAt(0) || '')
//     ).toUpperCase();

//     // Liste des liens, puis on garde seulement ceux qui sont remplis
//     const onlineLinks = [
//         { label: 'LinkedIn', value: cv?.linkedin },
//         { label: 'GitHub', value: cv?.github },
//         { label: 'Portfolio', value: cv?.portfolio },
//     ].filter((link) => link.value);

//     return (
//         <div
//             id="cv-preview"
//             className="mx-auto min-h-[297mm] w-[210mm] overflow-hidden bg-white shadow-2xl"
//         >
//             {/* ===== EN-TÊTE ===== */}
//             <header className="border-b-[1mm] border-blue-600 bg-blue-50 px-[10mm] py-[7mm]">
//                 <div className="flex items-center gap-[6mm]">
//                     {photoPreview ? (
//                         <div className="h-[30mm] w-[30mm] shrink-0 overflow-hidden rounded-full border-[0.6mm] border-white shadow">
//                             <img
//                                 src={photoPreview}
//                                 alt={fullName}
//                                 crossOrigin="anonymous"
//                                 referrerPolicy="no-referrer"
//                                 className="h-full w-full object-cover"
//                             />
//                         </div>
//                     ) : (
//                         <div className="flex h-[30mm] w-[30mm] shrink-0 items-center justify-center rounded-full bg-blue-600 text-[8mm] font-bold text-white">
//                             {initials}
//                         </div>
//                     )}

//                     <div className="min-w-0">
//                         <h1 className="text-[8mm] font-bold uppercase leading-tight text-slate-900">
//                             {fullName}
//                         </h1>

//                         <p className="mt-[2mm] text-[4mm] font-semibold text-blue-700">
//                             {cv?.titre_poste || 'Étudiant / Stagiaire'}
//                         </p>
//                     </div>
//                 </div>

//                 {/* Coordonnées */}
//                 <div className="mt-[4mm] flex flex-wrap gap-x-[5mm] gap-y-[1mm] text-[3.2mm] text-slate-600">
//                     {cv?.telephone && <span>{cv.telephone}</span>}
//                     {cv?.email && <span className="break-all">{cv.email}</span>}
//                     {cv?.adresse && <span>{cv.adresse}</span>}
//                 </div>

//                 {/* Présence en ligne */}
//                 {onlineLinks.length > 0 && (
//                     <div className="mt-[1.5mm] flex flex-wrap gap-x-[5mm] gap-y-[1mm] text-[3.2mm] text-slate-600">
//                         {onlineLinks.map((link) => (
//                             <span key={link.label} className="break-all">
//                                 <span className="font-semibold text-blue-700">
//                                     {link.label} :{' '}
//                                 </span>
//                                 <a
//                                     href={link.value}
//                                     target="_blank"
//                                     rel="noreferrer"
//                                     className="underline-offset-2 hover:underline"
//                                 >
//                                     {formatUrl(link.value)}
//                                 </a>
//                             </span>
//                         ))}
//                     </div>
//                 )}
//             </header>

//             {/* ===== CONTENU ===== */}
//             <main className="px-[10mm] py-[7mm]">
//                 <CvProfile cv={cv} />

//                 <div className="mt-[4mm]">
//                     <CvFormation cv={cv} />
//                     <CvExperience cv={cv} />
//                     <CvInformationsComplementaires cv={cv} />
//                 </div>

//                 <div className="mt-[5mm] grid grid-cols-2 gap-[8mm]">
//                     <div>
//                         <CvCompetences cv={cv} />
//                         <CvSavoirFaire cv={cv} />
//                     </div>

//                     <div>
//                         <CvLogiciels cv={cv} />
//                         <CvLangues cv={cv} />
//                         <CvInterets cv={cv} />
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// }

import CvProfile from './CvProfile';
import CvFormation from './CvFormation';
import CvExperience from './CvExperience';
import CvInformationsComplementaires from './CvInformationsComplementaires';
import CvCompetences from './CvCompetences';
import CvSavoirFaire from './CvSavoirFaire';
import CvLogiciels from './CvLogiciels';
import CvLangues from './CvLangues';
import CvInterets from './CvInterets';

function getPhotoPreview(photo) {
    if (typeof photo === 'string') {
        return photo;
    }

    if (typeof photo === 'object' && photo !== null) {
        return photo.preview || photo.url || null;
    }

    return null;
}

function formatUrl(url) {
    return url
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/$/, '');
}

export default function CvTemplateStudent({ cv }) {
    const fullName =
        [cv?.nom, cv?.prenom].filter(Boolean).join(' ') || 'Votre nom';

    const photoPreview = getPhotoPreview(cv?.photo);

    const initials = (
        (cv?.nom?.charAt(0) || '') + (cv?.prenom?.charAt(0) || '')
    ).toUpperCase();

    const onlineLinks = [
        { label: 'LinkedIn', value: cv?.linkedin },
        { label: 'GitHub', value: cv?.github },
        { label: 'Portfolio', value: cv?.portfolio },
    ].filter((link) => link.value);

    return (
        <div
            id="cv-preview"
            className="mx-auto flex min-h-[297mm] w-[210mm] flex-col overflow-hidden bg-white shadow-2xl"
        >
            {/* ===== EN-TÊTE ===== */}
            <header className="border-b-[1mm] border-blue-600 bg-blue-50 px-[10mm] py-[7mm]">
                <div className="flex items-center gap-[6mm]">
                    {photoPreview ? (
                        <div className="h-[30mm] w-[30mm] shrink-0 overflow-hidden rounded-full border-[0.6mm] border-white shadow">
                            <img
                                src={photoPreview}
                                alt={fullName}
                                crossOrigin="anonymous"
                                referrerPolicy="no-referrer"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="flex h-[30mm] w-[30mm] shrink-0 items-center justify-center rounded-full bg-blue-600 text-[8mm] font-bold text-white">
                            {initials}
                        </div>
                    )}

                    <div className="min-w-0">
                        <h1 className="text-[8mm] font-bold uppercase leading-tight text-slate-900">
                            {fullName}
                        </h1>

                        <p className="mt-[2mm] text-[4mm] font-semibold text-blue-700">
                            {cv?.titre_poste || 'Étudiant / Stagiaire'}
                        </p>
                    </div>
                </div>

                <div className="mt-[4mm] flex flex-wrap gap-x-[5mm] gap-y-[1mm] text-[3.2mm] text-slate-600">
                    {cv?.telephone && <span>{cv.telephone}</span>}
                    {cv?.email && <span className="break-all">{cv.email}</span>}
                    {cv?.adresse && <span>{cv.adresse}</span>}
                </div>

                {onlineLinks.length > 0 && (
                    <div className="mt-[1.5mm] flex flex-wrap gap-x-[5mm] gap-y-[1mm] text-[3.2mm] text-slate-600">
                        {onlineLinks.map((link) => (
                            <span key={link.label} className="break-all">
                                <span className="font-semibold text-blue-700">
                                    {link.label} :{' '}
                                </span>
                                <a
                                    href={link.value}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="underline-offset-2 hover:underline"
                                >
                                    {formatUrl(link.value)}
                                </a>
                            </span>
                        ))}
                    </div>
                )}
            </header>

            {/* ===== CORPS : 2 colonnes ===== */}
            <div className="grid flex-1 grid-cols-[1fr_62mm]">
                {/* Colonne principale : le parcours */}
                <main className="min-w-0 space-y-[5mm] px-[10mm] py-[7mm]">
                    <CvProfile cv={cv} />
                    <CvFormation cv={cv} />
                    <CvExperience cv={cv} />
                    <CvInformationsComplementaires cv={cv} />
                </main>

                {/* Barre latérale : les infos courtes */}
                <aside className="min-w-0 space-y-[5mm] border-l border-slate-200 bg-slate-50 px-[6mm] py-[7mm]">
                    <CvCompetences cv={cv} />
                    <CvSavoirFaire cv={cv} />
                    <CvLogiciels cv={cv} />
                    <CvLangues cv={cv} />
                    <CvInterets cv={cv} />
                </aside>
            </div>
        </div>
    );
}