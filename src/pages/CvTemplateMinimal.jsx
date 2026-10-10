// // // import CvProfile from './CvProfile';
// // // import CvExperience from './CvExperience';
// // // import CvFormation from './CvFormation';
// // // import CvInformationsComplementaires from './CvInformationsComplementaires';
// // // import CvCompetences from './CvCompetences';
// // // import CvSavoirFaire from './CvSavoirFaire';
// // // import CvLogiciels from './CvLogiciels';
// // // import CvLangues from './CvLangues';
// // // import CvInterets from './CvInterets';

// // // export default function CvTemplateMinimal({ cv }) {
// // //     const fullName =
// // //         [cv?.prenom, cv?.nom]
// // //             .filter(Boolean)
// // //             .join(' ') || 'Votre nom';

// // //     const photoPreview =
// // //         typeof cv?.photo === 'object' && cv.photo !== null
// // //             ? cv.photo.preview ||
// // //               cv.photo.url ||
// // //               cv.photo.photo_url ||
// // //               cv.photo.path ||
// // //               null
// // //             : typeof cv?.photo === 'string'
// // //                 ? cv.photo
// // //                 : cv?.photo_url || null;

// // //     return (
// // //         <div
// // //             id="cv-preview"
// // //             className="mx-auto min-h-[297mm] w-[210mm] overflow-hidden bg-white px-[14mm] py-[10mm] shadow-2xl"
// // //         >
// // //             <header className="border-b-2 border-slate-800 pb-[5mm]">
// // //                 <div className="flex items-start gap-[6mm]">
// // //                     {photoPreview && (
// // //                         <div className="h-[32mm] w-[32mm] shrink-0 overflow-hidden rounded-full border-[1mm] border-slate-800">
// // //                             <img
// // //                                 src={photoPreview}
// // //                                 alt={fullName}
// // //                                 crossOrigin="anonymous"
// // //                                 referrerPolicy="no-referrer"
// // //                                 className="h-full w-full object-cover"
// // //                                 onError={(e) => {
// // //                                     console.error(
// // //                                         'Erreur de chargement de la photo :',
// // //                                         photoPreview
// // //                                     );
// // //                                     e.currentTarget.style.display = 'none';
// // //                                 }}
// // //                             />
// // //                         </div>
// // //                     )}

// // //                     <div className="min-w-0 flex-1">
// // //                         <h1 className="text-[9mm] font-bold uppercase leading-none tracking-wide text-slate-900">
// // //                             {fullName}
// // //                         </h1>

// // //                         <p className="mt-[3mm] text-[4mm] font-medium uppercase tracking-[0.12em] text-slate-500">
// // //                             {cv?.titre_poste || 'Intitulé du poste'}
// // //                         </p>

// // //                         <div className="mt-[4mm] flex flex-wrap gap-x-5 gap-y-1 text-[10px] text-slate-500">
// // //                             {cv?.telephone && (
// // //                                 <span>{cv.telephone}</span>
// // //                             )}

// // //                             {cv?.email && (
// // //                                 <span className="break-words">
// // //                                     {cv.email}
// // //                                 </span>
// // //                             )}

// // //                             {cv?.adresse && (
// // //                                 <span>{cv.adresse}</span>
// // //                             )}

// // //                             {cv?.ville && (
// // //                                 <span>{cv.ville}</span>
// // //                             )}
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             </header>

// // //             <main className="pt-[5mm]">
// // //                 <CvProfile cv={cv} />

// // //                 <CvExperience cv={cv} />

// // //                 <CvFormation cv={cv} />

// // //                 <CvInformationsComplementaires cv={cv} />

// // //                 <div className="mt-[5mm] grid grid-cols-2 gap-[8mm]">
// // //                     <div>
// // //                         <CvCompetences cv={cv} />

// // //                         <CvSavoirFaire cv={cv} />
// // //                     </div>

// // //                     <div>
// // //                         <CvLogiciels cv={cv} />

// // //                         <CvLangues cv={cv} />

// // //                         <CvInterets cv={cv} />
// // //                     </div>
// // //                 </div>
// // //             </main>
// // //         </div>
// // //     );
// // // }


// // import CvProfile from './CvProfile';
// // import CvExperience from './CvExperience';
// // import CvFormation from './CvFormation';
// // import CvInformationsComplementaires from './CvInformationsComplementaires';
// // import CvCompetences from './CvCompetences';
// // import CvSavoirFaire from './CvSavoirFaire';
// // import CvLogiciels from './CvLogiciels';
// // import CvLangues from './CvLangues';
// // import CvInterets from './CvInterets';

// // export default function CvTemplateMinimal({ cv }) {
// //     const fullName =
// //         [cv?.prenom, cv?.nom]
// //             .filter(Boolean)
// //             .join(' ') || 'Votre nom';

// //     const photoPreview =
// //         typeof cv?.photo === 'object' && cv.photo !== null
// //             ? cv.photo.preview ||
// //               cv.photo.url ||
// //               cv.photo.photo_url ||
// //               cv.photo.path ||
// //               null
// //             : typeof cv?.photo === 'string'
// //                 ? cv.photo
// //                 : cv?.photo_url || null;

// //     return (
// //         <div
// //             id="cv-preview"
// //             className="mx-auto min-h-[297mm] w-[210mm] overflow-hidden bg-white px-[14mm] py-[10mm] shadow-2xl"
// //         >
// //             <header className="border-b-2 border-slate-800 pb-[5mm]">
// //                 <div className="flex items-start gap-[6mm]">
// //                     {photoPreview && (
// //                         <div className="h-[32mm] w-[32mm] shrink-0 overflow-hidden rounded-full border-[1mm] border-slate-800">
// //                             <img
// //                                 src={photoPreview}
// //                                 alt={fullName}
// //                                 crossOrigin="anonymous"
// //                                 referrerPolicy="no-referrer"
// //                                 className="h-full w-full object-cover"
// //                                 onError={(e) => {
// //                                     console.error(
// //                                         'Erreur de chargement de la photo :',
// //                                         photoPreview
// //                                     );
// //                                     e.currentTarget.style.display = 'none';
// //                                 }}
// //                             />
// //                         </div>
// //                     )}

// //                     <div className="min-w-0 flex-1">
// //                         <h1 className="text-[9mm] font-bold uppercase leading-none tracking-wide text-slate-900">
// //                             {fullName}
// //                         </h1>

// //                         <p className="mt-[3mm] text-[4mm] font-medium uppercase tracking-[0.12em] text-slate-500">
// //                             {cv?.titre_poste || 'Intitulé du poste'}
// //                         </p>

// //                         <div className="mt-[4mm] flex flex-wrap gap-x-5 gap-y-1 text-[10px] text-slate-500">
// //                             {cv?.telephone && (
// //                                 <span>{cv.telephone}</span>
// //                             )}

// //                             {cv?.email && (
// //                                 <span className="break-words">
// //                                     {cv.email}
// //                                 </span>
// //                             )}

// //                             {cv?.adresse && (
// //                                 <span>{cv.adresse}</span>
// //                             )}

// //                             {cv?.ville && (
// //                                 <span>{cv.ville}</span>
// //                             )}
// //                         </div>
// //                     </div>
// //                 </div>
// //             </header>

// //             <main className="pt-[5mm]">
// //                 <CvProfile cv={cv} />

// //                 <CvExperience cv={cv} />

// //                 <CvFormation cv={cv} />

// //                 <CvInformationsComplementaires cv={cv} />

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
// import CvExperience from './CvExperience';
// import CvFormation from './CvFormation';
// import CvInformationsComplementaires from './CvInformationsComplementaires';
// import CvCompetences from './CvCompetences';
// import CvSavoirFaire from './CvSavoirFaire';
// import CvLogiciels from './CvLogiciels';
// import CvLangues from './CvLangues';
// import CvInterets from './CvInterets';

// export default function CvTemplateMinimal({ cv }) {
//     const fullName =
//         [cv?.prenom, cv?.nom]
//             .filter(Boolean)
//             .join(' ') || 'Votre nom';

//     const photoPreview =
//         typeof cv?.photo === 'object' && cv.photo !== null
//             ? cv.photo.preview || cv.photo.url || null
//             : typeof cv?.photo === 'string'
//                 ? cv.photo
//                 : null;

//     return (
//         <div
//             id="cv-preview"
//             className="mx-auto min-h-[297mm] w-[210mm] overflow-hidden bg-white px-[14mm] py-[10mm] shadow-2xl"
//         >
//             <header className="border-b-2 border-slate-800 pb-[5mm]">
//                 <div className="flex items-center gap-[6mm]">
//                     {photoPreview ? (
//                         <div className="h-[32mm] w-[32mm] shrink-0 overflow-hidden rounded-full border-2 border-slate-800 shadow-sm">
//                             <img
//                                 src={photoPreview}
//                                 alt={fullName}
//                                 crossOrigin="anonymous"
//                                 referrerPolicy="no-referrer"
//                                 className="h-full w-full object-cover"
//                             />
//                         </div>
//                     ) : (
//                         <div className="flex h-[32mm] w-[32mm] shrink-0 items-center justify-center rounded-full bg-slate-800 text-[8mm] font-bold text-white">
//                             {(cv?.prenom?.charAt(0) || '') +
//                                 (cv?.nom?.charAt(0) || '')}
//                         </div>
//                     )}

//                     <div className="min-w-0 flex-1">
//                         <h1 className="text-[9mm] font-bold uppercase leading-none tracking-wide text-slate-900">
//                             {fullName}
//                         </h1>

//                         <p className="mt-[3mm] text-[4mm] font-medium uppercase tracking-[0.12em] text-slate-500">
//                             {cv?.titre_poste || 'Intitulé du poste'}
//                         </p>

//                         <div className="mt-[4mm] flex flex-wrap gap-x-5 gap-y-1 text-[10px] text-slate-500">
//                             {cv?.telephone && (
//                                 <span>{cv.telephone}</span>
//                             )}

//                             {cv?.email && (
//                                 <span className="break-words">
//                                     {cv.email}
//                                 </span>
//                             )}

//                             {cv?.adresse && (
//                                 <span>{cv.adresse}</span>
//                             )}

//                             {cv?.ville && (
//                                 <span>{cv.ville}</span>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </header>
// {/* 
//             <main className="pt-[5mm]">
//                 <CvProfile cv={cv} />

//                 <CvExperience cv={cv} />

//                 <CvFormation cv={cv} />

//                 <CvInformationsComplementaires cv={cv} />

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
//             </main> */}


//             <main className="pt-[5mm]">
//     <CvProfile cv={cv} />

//     <CvExperience cv={cv} />

//     <CvFormation cv={cv} />

//     <CvInformationsComplementaires cv={cv} />

//     {(cv?.linkedin || cv?.github || cv?.portfolio) && (
//         <section className="mt-[4mm]">
//             <h2 className="mb-[2mm] text-[10px] font-bold uppercase tracking-[0.08em] text-slate-800">
//                 Présence en ligne
//             </h2>

//             <div className="space-y-[1mm] text-[10px] leading-[1.4] text-slate-600">
//                 {cv?.linkedin && (
//                     <p className="break-all">
//                         <span className="font-semibold">LinkedIn : </span>
//                         {cv.linkedin}
//                     </p>
//                 )}

//                 {cv?.github && (
//                     <p className="break-all">
//                         <span className="font-semibold">GitHub : </span>
//                         {cv.github}
//                     </p>
//                 )}

//                 {cv?.portfolio && (
//                     <p className="break-all">
//                         <span className="font-semibold">Portefeuille : </span>
//                         {cv.portfolio}
//                     </p>
//                 )}
//             </div>
//         </section>
//     )}

   
// </main>
//         </div>
//     );
// }






import CvProfile from './CvProfile';
import CvExperience from './CvExperience';
import CvFormation from './CvFormation';
import CvInformationsComplementaires from './CvInformationsComplementaires';
import CvCompetences from './CvCompetences';
import CvSavoirFaire from './CvSavoirFaire';
import CvLogiciels from './CvLogiciels';
import CvLangues from './CvLangues';
import CvInterets from './CvInterets';

// La photo peut être un objet { file, preview } (upload du formulaire)
// ou une simple string (URL). Renvoie toujours une URL ou null.
function getPhotoPreview(photo) {
    if (typeof photo === 'string') {
        return photo;
    }

    if (typeof photo === 'object' && photo !== null) {
        return photo.preview || photo.url || null;
    }

    return null;
}

// "https://www.github.com/daniel/" devient "github.com/daniel"
function formatUrl(url) {
    return url
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/$/, '');
}

export default function CvTemplateMinimal({ cv }) {
    const fullName =
        [cv?.nom, cv?.prenom].filter(Boolean).join(' ') || 'Votre nom';

    const photoPreview = getPhotoPreview(cv?.photo);

    const initials = (
        (cv?.nom?.charAt(0) || '') + (cv?.prenom?.charAt(0) || '')
    ).toUpperCase();

    // On liste les liens, puis on garde seulement ceux qui sont remplis
    const onlineLinks = [
        { label: 'LinkedIn', value: cv?.linkedin },
        { label: 'GitHub', value: cv?.github },
        { label: 'Portfolio', value: cv?.portfolio },
    ].filter((link) => link.value);

    return (
        <div
            id="cv-preview"
            className="mx-auto min-h-[297mm] w-[210mm] overflow-hidden bg-white px-[14mm] py-[10mm] shadow-2xl"
        >
            {/* ===== EN-TÊTE ===== */}
            <header className="border-b-[0.5mm] border-slate-800 pb-[5mm]">
                <div className="flex items-center gap-[6mm]">
                    {photoPreview ? (
                        <div className="h-[32mm] w-[32mm] shrink-0 overflow-hidden rounded-full border-[0.5mm] border-slate-800 shadow-sm">
                            <img
                                src={photoPreview}
                                alt={fullName}
                                crossOrigin="anonymous"
                                referrerPolicy="no-referrer"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="flex h-[32mm] w-[32mm] shrink-0 items-center justify-center rounded-full bg-slate-800 text-[8mm] font-bold text-white">
                            {initials}
                        </div>
                    )}

                    <div className="min-w-0 flex-1">
                        <h1 className="text-[9mm] font-bold uppercase leading-none tracking-wide text-slate-900">
                            {fullName}
                        </h1>

                        <p className="mt-[3mm] text-[4mm] font-medium uppercase tracking-[0.12em] text-slate-500">
                            {cv?.titre_poste || 'Intitulé du poste'}
                        </p>

                        {/* Coordonnées */}
                        <div className="mt-[4mm] flex flex-wrap gap-x-[5mm] gap-y-[1mm] text-[3.2mm] text-slate-500">
                            {cv?.telephone && <span>{cv.telephone}</span>}
                            {cv?.email && (
                                <span className="break-all">{cv.email}</span>
                            )}
                            {cv?.adresse && <span>{cv.adresse}</span>}
                        </div>

                        {/* Présence en ligne */}
                        {onlineLinks.length > 0 && (
                            <div className="mt-[1.5mm] flex flex-wrap gap-x-[5mm] gap-y-[1mm] text-[3.2mm] text-slate-500">
                                {onlineLinks.map((link) => (
                                    <span key={link.label} className="break-all">
                                        <span className="font-semibold text-slate-800">
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
                    </div>
                </div>
            </header>

            {/* ===== CONTENU ===== */}
            <main className="space-y-[5mm] pt-[5mm]">
                <CvProfile cv={cv} />
                <CvExperience cv={cv} />
                <CvFormation cv={cv} />
                <CvInformationsComplementaires cv={cv} />

                {/* Compétences, langues, etc. sur 2 colonnes */}
                <div className="grid grid-cols-2 gap-[8mm]">
                    <div className="min-w-0 space-y-[5mm]">
                        <CvCompetences cv={cv} />
                        <CvSavoirFaire cv={cv} />
                    </div>

                    <div className="min-w-0 space-y-[5mm]">
                        <CvLogiciels cv={cv} />
                        <CvLangues cv={cv} />
                        <CvInterets cv={cv} />
                    </div>
                </div>
            </main>
        </div>
    );
}