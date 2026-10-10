// // // // import CvProfile from './CvProfile';
// // // // import CvExperience from './CvExperience';
// // // // import CvFormation from './CvFormation';
// // // // import CvInformationsComplementaires from './CvInformationsComplementaires';
// // // // import CvCompetences from './CvCompetences';
// // // // import CvSavoirFaire from './CvSavoirFaire';
// // // // import CvLogiciels from './CvLogiciels';
// // // // import CvLangues from './CvLangues';
// // // // import CvInterets from './CvInterets';

// // // // export default function CvTemplateModern({ cv }) {
// // // //     const fullName =
// // // //         [cv?.prenom, cv?.nom]
// // // //             .filter(Boolean)
// // // //             .join(' ') || 'Votre nom';

// // // //     const photoPreview =
// // // //         typeof cv?.photo === 'object' && cv.photo !== null
// // // //             ? cv.photo.preview || cv.photo.url || null
// // // //             : typeof cv?.photo === 'string'
// // // //                 ? cv.photo
// // // //                 : null;

// // // //     return (
// // // //         <div
// // // //             id="cv-preview"
// // // //             className="mx-auto min-h-[297mm] w-[210mm] overflow-hidden bg-white shadow-2xl"
// // // //         >
// // // //             <div className="grid grid-cols-[58mm_1fr]">
// // // //                 <aside className="min-h-[297mm] bg-blue-700 px-[6mm] py-[8mm] text-white">
// // // //                     {photoPreview && (
// // // //                         <div className="mx-auto mb-[6mm] h-[31mm] w-[31mm] overflow-hidden rounded-full border-[1.2mm] border-white">
// // // //                             <img
// // // //                                 src={photoPreview}
// // // //                                 alt={fullName}
// // // //                                 crossOrigin="anonymous"
// // // //                                 referrerPolicy="no-referrer"
// // // //                                 className="h-full w-full object-cover"
// // // //                             />
// // // //                         </div>
// // // //                     )}

// // // //                     <h1 className="text-center text-[6mm] font-bold uppercase leading-tight">
// // // //                         {fullName}
// // // //                     </h1>

// // // //                     <p className="mt-[2mm] text-center text-[3.2mm] font-medium uppercase tracking-wide text-blue-100">
// // // //                         {cv?.titre_poste || 'Intitulé du poste'}
// // // //                     </p>

// // // //                     <div className="mt-[8mm] border-t border-white/30 pt-[4mm] text-[8px] leading-relaxed text-blue-50">
// // // //                         {cv?.telephone && (
// // // //                             <p className="mb-[1.5mm]">
// // // //                                 {cv.telephone}
// // // //                             </p>
// // // //                         )}

// // // //                         {cv?.email && (
// // // //                             <p className="mb-[1.5mm] break-words">
// // // //                                 {cv.email}
// // // //                             </p>
// // // //                         )}

// // // //                         {cv?.adresse && (
// // // //                             <p>{cv.adresse}</p>
// // // //                         )}
// // // //                     </div>

// // // //                     <div className="mt-[7mm]">
// // // //                         <CvCompetences cv={cv} />
// // // //                         <CvSavoirFaire cv={cv} />
// // // //                         <CvLogiciels cv={cv} />
// // // //                         <CvLangues cv={cv} />
// // // //                         <CvInterets cv={cv} />
// // // //                     </div>
// // // //                 </aside>

// // // //                 <main className="min-w-0 px-[9mm] py-[9mm]">
// // // //                     <CvProfile cv={cv} />
// // // //                     <CvExperience cv={cv} />
// // // //                     <CvFormation cv={cv} />
// // // //                     <CvInformationsComplementaires cv={cv} />
// // // //                 </main>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // }











// // // import CvProfile from './CvProfile';
// // // import CvExperience from './CvExperience';
// // // import CvFormation from './CvFormation';
// // // import CvInformationsComplementaires from './CvInformationsComplementaires';
// // // import CvCompetences from './CvCompetences';
// // // import CvSavoirFaire from './CvSavoirFaire';
// // // import CvLogiciels from './CvLogiciels';
// // // import CvLangues from './CvLangues';
// // // import CvInterets from './CvInterets';

// // // export default function CvTemplateModern({ cv }) {
// // //     const fullName =
// // //         [cv?.prenom, cv?.nom]
// // //             .filter(Boolean)
// // //             .join(' ') || 'Votre nom';

// // //     const photoPreview =
// // //         typeof cv?.photo === 'object' && cv.photo !== null
// // //             ? cv.photo.preview || cv.photo.url || null
// // //             : typeof cv?.photo === 'string'
// // //                 ? cv.photo
// // //                 : null;

// // //     return (
// // //         <div
// // //             id="cv-preview"
// // //             className="mx-auto min-h-[297mm] w-[210mm] overflow-hidden bg-white shadow-2xl"
// // //         >
// // //             <div className="grid grid-cols-[58mm_1fr]">
// // //                 <aside className="min-h-[297mm] bg-blue-700 px-[6mm] py-[8mm] text-white">
// // //                     {photoPreview ? (
// // //                         <div className="mx-auto mb-[6mm] h-[31mm] w-[31mm] shrink-0 overflow-hidden rounded-full border-[1.2mm] border-white shadow">
// // //                             <img
// // //                                 src={photoPreview}
// // //                                 alt={fullName}
// // //                                 crossOrigin="anonymous"
// // //                                 referrerPolicy="no-referrer"
// // //                                 className="h-full w-full object-cover"
// // //                             />
// // //                         </div>
// // //                     ) : (
// // //                         <div className="mx-auto mb-[6mm] flex h-[31mm] w-[31mm] items-center justify-center rounded-full bg-white text-[7mm] font-bold text-blue-700">
// // //                             {(cv?.prenom?.charAt(0) || '') +
// // //                                 (cv?.nom?.charAt(0) || '')}
// // //                         </div>
// // //                     )}

// // //                     <h1 className="text-center text-[6mm] font-bold uppercase leading-tight">
// // //                         {fullName}
// // //                     </h1>

// // //                     <p className="mt-[2mm] text-center text-[3.2mm] font-medium uppercase tracking-wide text-blue-100">
// // //                         {cv?.titre_poste || 'Intitulé du poste'}
// // //                     </p>

// // //                     <div className="mt-[8mm] border-t border-white/30 pt-[4mm] text-[12px] leading-relaxed text-blue-50">
// // //                         {cv?.telephone && (
// // //                             <p className="mb-[1.5mm]">
// // //                                 {cv.telephone}
// // //                             </p>
// // //                         )}

// // //                         {cv?.email && (
// // //                             <p className="mb-[1.5mm] break-words">
// // //                                 {cv.email}
// // //                             </p>
// // //                         )}

// // //                         {cv?.adresse && (
// // //                             <p className="mb-[1.5mm]">
// // //                                 {cv.adresse}
// // //                             </p>
// // //                         )}

// // //                         {cv?.ville && (
// // //                             <p>
// // //                                 {cv.ville}
// // //                             </p>
// // //                         )}
// // //                     </div>


// // // <main className="pt-[5mm]">
// // //     <CvProfile cv={cv} />

// // //     <CvExperience cv={cv} />

// // //     <CvFormation cv={cv} />

// // //     <CvInformationsComplementaires cv={cv} />

// // //     {(cv?.linkedin || cv?.github || cv?.portfolio) && (
// // //         <section className="mt-[4mm]">
// // //             {/* <h2 className="mb-[2mm] text-[10px] font-bold uppercase tracking-[0.08em] text-slate-800"> */}
// // //             <h2  className="mt-[1mm]  border-white/30 pt-[4mm] text-[18px] leading-relaxed text-blue-50">
// // //                 Présence en ligne
// // //             </h2>

// // //             <div className="space-y-[1mm] text-white text-[12px] leading-[1.4] text-slate-600">
// // //                 {cv?.linkedin && (
// // //                     <p className="break-all">
// // //                         <span className="text-white">LinkedIn : </span>
// // //                         {cv.linkedin}
// // //                     </p>
// // //                 )}

// // //                 {cv?.github && (
// // //                     <p className="break-all">
// // //                         <span className="text-white">GitHub : </span>
// // //                         {cv.github}
// // //                     </p>
// // //                 )}

// // //                 {cv?.portfolio && (
// // //                     <p className="break-all">
// // //                         <span className="text-white">Portefeuille : </span>
// // //                         {cv.portfolio}
// // //                     </p>
// // //                 )}
// // //             </div>
// // //         </section>
// // //     )}


// // // </main>



// // //                     <div className="mt-[7mm]">
// // //                         <CvCompetences cv={cv} />

// // //                         <CvSavoirFaire cv={cv} />

// // //                         <CvLogiciels cv={cv} />

// // //                         <CvLangues cv={cv} />

// // //                         <CvInterets cv={cv} />
// // //                     </div>
// // //                 </aside>

// // //                 <main className="min-w-0 px-[9mm] py-[7mm]">
// // //                     <CvProfile cv={cv} />

// // //                     <CvExperience cv={cv} />

// // //                     <CvFormation cv={cv} />

// // //                     <CvInformationsComplementaires cv={cv} />
// // //                 </main>
// // //             </div>
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

// // export default function CvTemplateModern({ cv }) {
// //     // Assemble prénom + nom, en ignorant les valeurs vides
// //     const fullName =
// //         [cv?.prenom, cv?.nom].filter(Boolean).join(' ') || 'Votre nom';

// //     // La photo peut être un objet (upload local) ou une string (URL)
// //     const photoPreview =
// //         typeof cv?.photo === 'object' && cv.photo !== null
// //             ? cv.photo.preview || cv.photo.url || null
// //             : typeof cv?.photo === 'string'
// //                 ? cv.photo
// //                 : null;

// //     // Initiales affichées quand il n'y a pas de photo
// //     const initials = (
// //         (cv?.prenom?.charAt(0) || '') + (cv?.nom?.charAt(0) || '')
// //     ).toUpperCase();

// //     const hasOnlineLinks = cv?.linkedin || cv?.github || cv?.portfolio;

// //     return (
// //         <div
// //             id="cv-preview"
// //             className="mx-auto min-h-[297mm] w-[210mm] overflow-hidden bg-white shadow-2xl"
// //         >
// //             <div className="grid grid-cols-[58mm_1fr]">
// //                 {/* ===== COLONNE GAUCHE (bleue) ===== */}
// //                 <aside className="min-h-[297mm] bg-blue-700 px-[6mm] py-[8mm] text-white">
// //                     {photoPreview ? (
// //                         <div className="mx-auto mb-[6mm] h-[31mm] w-[31mm] shrink-0 overflow-hidden rounded-full border-[1.2mm] border-white shadow">
// //                             <img
// //                                 src={photoPreview}
// //                                 alt={fullName}
// //                                 crossOrigin="anonymous"
// //                                 referrerPolicy="no-referrer"
// //                                 className="h-full w-full object-cover"
// //                             />
// //                         </div>
// //                     ) : (
// //                         <div className="mx-auto mb-[6mm] flex h-[31mm] w-[31mm] items-center justify-center rounded-full bg-white text-[7mm] font-bold text-blue-700">
// //                             {initials}
// //                         </div>
// //                     )}

// //                     <h1 className="text-center text-[6mm] font-bold uppercase leading-tight">
// //                         {fullName}
// //                     </h1>

// //                     <p className="mt-[2mm] text-center text-[3.2mm] font-medium uppercase tracking-wide text-blue-100">
// //                         {cv?.titre_poste || 'Intitulé du poste'}
// //                     </p>

                    
// //                     <div className="mt-[8mm] border-t border-white/30 pt-[4mm] text-[12px] leading-relaxed text-blue-50">
// //                         {cv?.telephone && (
// //                             <p className="mb-[1.5mm]">{cv.telephone}</p>
// //                         )}
// //                         {cv?.email && (
// //                             <p className="mb-[1.5mm] break-words">{cv.email}</p>
// //                         )}
// //                         {cv?.adresse && (
// //                             <p className="mb-[1.5mm]">{cv.adresse}</p>
// //                         )}
// //                         {cv?.ville && <p>{cv.ville}</p>}
// //                     </div>

// //                     {/* Présence en ligne */}
// //                     {hasOnlineLinks && (
// //                         <section className="mt-[6mm]">
// //                             <h2 className="mb-[2mm] text-[14px] font-bold uppercase tracking-wide text-white">
// //                                 Présence en ligne
// //                             </h2>

// //                             <div className="space-y-[1mm] text-[12px] leading-[1.4] text-blue-50">
// //                                 {cv?.linkedin && (
// //                                     <p className="break-all">
// //                                         <span className="font-semibold">LinkedIn : </span>
// //                                         {cv.linkedin}
// //                                     </p>
// //                                 )}
// //                                 {cv?.github && (
// //                                     <p className="break-all">
// //                                         <span className="font-semibold">GitHub : </span>
// //                                         {cv.github}
// //                                     </p>
// //                                 )}
// //                                 {cv?.portfolio && (
// //                                     <p className="break-all">
// //                                         <span className="font-semibold">Portfolio : </span>
// //                                         {cv.portfolio}
// //                                     </p>
// //                                 )}
// //                             </div>
// //                         </section>
// //                     )}

                  
// //                     <div className="mt-[7mm]">
// //                         <CvCompetences cv={cv} />
// //                         <CvSavoirFaire cv={cv} />
// //                         <CvLogiciels cv={cv} />
// //                         <CvLangues cv={cv} />
// //                         <CvInterets cv={cv} />
// //                     </div>
// //                 </aside>

                
// //                 <main className="min-w-0 px-[9mm] py-[7mm]">
// //                     <CvProfile cv={cv} />
// //                     <CvExperience cv={cv} />
// //                     <CvFormation cv={cv} />
// //                     <CvInformationsComplementaires cv={cv} />
// //                 </main>
// //             </div>
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

// // "https://www.github.com/daniel/" devient "github.com/daniel"
// function formatUrl(url) {
//     return url
//         .replace(/^https?:\/\//, '')
//         .replace(/^www\./, '')
//         .replace(/\/$/, '');
// }

// export default function CvTemplateModern({ cv }) {
//     const fullName =
//         [cv?.prenom, cv?.nom].filter(Boolean).join(' ') || 'Votre nom';

//     const photoPreview = getPhotoPreview(cv?.photo);

//     const initials = (
//         (cv?.prenom?.charAt(0) || '') + (cv?.nom?.charAt(0) || '')
//     ).toUpperCase();

//     // On liste les liens, puis on garde seulement ceux qui sont remplis
//     const onlineLinks = [
//         { label: 'LinkedIn', value: cv?.linkedin },
//         { label: 'GitHub', value: cv?.github },
//         { label: 'Portfolio', value: cv?.portfolio },
//     ].filter((link) => link.value);

//     return (
//         <div
//             id="cv-preview"
//             className="mx-auto w-[210mm] overflow-hidden bg-white shadow-2xl"
//         >
//             <div className="grid min-h-[297mm] grid-cols-[58mm_1fr]">
//                 {/* ===== COLONNE GAUCHE (bleue) ===== */}
//                 <aside className="min-w-0 bg-blue-700 px-[6mm] py-[8mm] text-white">
//                     {photoPreview ? (
//                         <div className="mx-auto mb-[6mm] h-[31mm] w-[31mm] shrink-0 overflow-hidden rounded-full border-[1.2mm] border-white shadow">
//                             <img
//                                 src={photoPreview}
//                                 alt={fullName}
//                                 crossOrigin="anonymous"
//                                 referrerPolicy="no-referrer"
//                                 className="h-full w-full object-cover"
//                             />
//                         </div>
//                     ) : (
//                         <div className="mx-auto mb-[6mm] flex h-[31mm] w-[31mm] items-center justify-center rounded-full bg-white text-[7mm] font-bold text-blue-700">
//                             {initials}
//                         </div>
//                     )}

//                     <h1 className="text-center text-[6mm] font-bold uppercase leading-tight">
//                         {fullName}
//                     </h1>

//                     <p className="mt-[2mm] text-center text-[3.2mm] font-medium uppercase tracking-wide text-blue-100">
//                         {cv?.titre_poste || 'Intitulé du poste'}
//                     </p>

//                     {/* Coordonnées */}
//                     <div className="mt-[8mm] space-y-[1.5mm] border-t border-white/30 pt-[4mm] text-[3.2mm] leading-relaxed text-blue-50">
//                         {cv?.telephone && <p>{cv.telephone}</p>}
//                         {cv?.email && <p className="break-words">{cv.email}</p>}
//                         {cv?.adresse && <p>{cv.adresse}</p>}
//                     </div>

//                     {/* Présence en ligne */}
//                     {onlineLinks.length > 0 && (
//                         <section className="mt-[6mm] border-t border-white/30 pt-[4mm]">
//                             <h2 className="mb-[2mm] text-[3.7mm] font-bold uppercase tracking-wide">
//                                 Présence en ligne
//                             </h2>

//                             <ul className="space-y-[1.5mm] text-[3.2mm] leading-[1.4] text-blue-50">
//                                 {onlineLinks.map((link) => (
//                                     <li key={link.label} className="break-all">
//                                         <span className="font-semibold">
//                                             {link.label} :{' '}
//                                         </span>
//                                         <a
//                                             href={link.value}
//                                             target="_blank"
//                                             rel="noreferrer"
//                                             className="underline-offset-2 hover:underline"
//                                         >
//                                             {formatUrl(link.value)}
//                                         </a>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </section>
//                     )}

//                     {/* Compétences, langues, etc. */}
//                     <div className="mt-[7mm] space-y-[5mm]">
//                         <CvCompetences cv={cv} />
//                         <CvSavoirFaire cv={cv} />
//                         <CvLogiciels cv={cv} />
//                         <CvLangues cv={cv} />
//                         <CvInterets cv={cv} />
//                     </div>
//                 </aside>

//                 {/* ===== COLONNE DROITE (contenu principal) ===== */}
//                 <main className="min-w-0 space-y-[5mm] px-[9mm] py-[8mm]">
//                     <CvProfile cv={cv} />
//                     <CvExperience cv={cv} />
//                     <CvFormation cv={cv} />
//                     <CvInformationsComplementaires cv={cv} />
//                 </main>
//             </div>
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

export default function CvTemplateModern({ cv }) {
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
            className="mx-auto w-[210mm] overflow-hidden bg-white shadow-2xl"
        >
            <div className="grid min-h-[297mm] grid-cols-[58mm_1fr]">
                {/* ===== COLONNE GAUCHE : tout le texte est blanc ===== */}
                <aside className="min-w-0 bg-blue-700 px-[6mm] py-[8mm] text-white [&_*]:!text-white">
                    {photoPreview ? (
                        <div className="mx-auto mb-[6mm] h-[31mm] w-[31mm] shrink-0 overflow-hidden rounded-full border-[1.2mm] border-white shadow">
                            <img
                                src={photoPreview}
                                alt={fullName}
                                crossOrigin="anonymous"
                                referrerPolicy="no-referrer"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="mx-auto mb-[6mm] flex h-[31mm] w-[31mm] items-center justify-center rounded-full border-[1.2mm] border-white bg-white/20 text-[7mm] font-bold">
                            {initials}
                        </div>
                    )}

                    <h1 className="text-center text-[6mm] font-bold uppercase leading-tight">
                        {fullName}
                    </h1>

                    <p className="mt-[2mm] text-center text-[3.2mm] font-medium uppercase tracking-wide">
                        {cv?.titre_poste || 'Intitulé du poste'}
                    </p>

                    {/* Coordonnées */}
                    <div className="mt-[8mm] space-y-[1.5mm] border-t border-white/30 pt-[4mm] text-[3.2mm] leading-relaxed">
                        {cv?.telephone && <p>{cv.telephone}</p>}
                        {cv?.email && <p className="break-words">{cv.email}</p>}
                        {cv?.adresse && <p>{cv.adresse}</p>}
                    </div>

                    {/* Présence en ligne */}
                    {onlineLinks.length > 0 && (
                        <section className="mt-[6mm] border-t border-white/30 pt-[4mm]">
                            <h2 className="mb-[2mm] text-[3.7mm] font-bold uppercase tracking-wide">
                                Présence en ligne
                            </h2>

                            <ul className="space-y-[1.5mm] text-[3.2mm] leading-[1.4]">
                                {onlineLinks.map((link) => (
                                    <li key={link.label} className="break-all">
                                        <span className="font-semibold">
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
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Compétences, langues, etc. */}
                    <div className="mt-[7mm] space-y-[5mm]">
                        <CvCompetences cv={cv} />
                        <CvSavoirFaire cv={cv} />
                        <CvLogiciels cv={cv} />
                        <CvLangues cv={cv} />
                        <CvInterets cv={cv} />
                    </div>
                </aside>

                {/* ===== COLONNE DROITE : couleurs inchangées ===== */}
                <main className="min-w-0 space-y-[5mm] px-[9mm] py-[8mm]">
                    <CvProfile cv={cv} />
                    <CvExperience cv={cv} />
                    <CvFormation cv={cv} />
                    <CvInformationsComplementaires cv={cv} />
                </main>
            </div>
        </div>
    );
}