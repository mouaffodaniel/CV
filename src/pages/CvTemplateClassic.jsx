// // import CvHeader from './CvHeader';
// // import CvProfile from './CvProfile';
// // import CvExperience from './CvExperience';
// // import CvFormation from './CvFormation';
// // import CvInformationsComplementaires from './CvInformationsComplementaires';
// // import CvCompetences from './CvCompetences';
// // import CvSavoirFaire from './CvSavoirFaire';
// // import CvLogiciels from './CvLogiciels';
// // import CvLangues from './CvLangues';
// // import CvInterets from './CvInterets';

// // export default function CvTemplateClassic({ cv }) {
// //     return (
// //         <div
// //             id="cv-preview"
// //             className="mx-auto h-[297mm] w-[210mm] overflow-hidden bg-white shadow-2xl"
// //         >
// //             <CvHeader cv={cv} />

// //             <div className="grid grid-cols-[55mm_1fr]">
// //                 <aside className="h-[252mm] bg-slate-100">
// //                     <div className="px-[5mm] py-[4mm]">
// //                         <section className="mb-[4mm]">
// //                             <h2 className="mb-[1.5mm] border-b-[1.5px] border-slate-800 pb-[1mm] text-[12px] font-bold uppercase tracking-[0.08em] text-slate-800">
// //                                 Contact
// //                             </h2>

// //                             <div className="space-y-[1mm] text-[10px] leading-[1.4] text-slate-600">
// //                                 {cv?.telephone && (
// //                                     <p>{cv.telephone}</p>
// //                                 )}

// //                                 {cv?.email && (
// //                                     <p className="break-words">
// //                                         {cv.email}
// //                                     </p>
// //                                 )}

// //                                 {cv?.adresse && (
// //                                     <p>{cv.adresse}</p>
// //                                 )}

// //                                 {cv?.ville && (
// //                                     <p>{cv.ville}</p>
// //                                 )}
// //                             </div>
// //                         </section>

// //                         <CvLangues cv={cv} />
// //                         <CvCompetences cv={cv} />
// //                         <CvSavoirFaire cv={cv} />
// //                         <CvLogiciels cv={cv} />
// //                         <CvInterets cv={cv} />
// //                     </div>
// //                 </aside>

// //                 <main className="min-w-0 bg-white px-[7mm] py-[4mm]">
// //                     <CvProfile cv={cv} />
// //                     <CvExperience cv={cv} />
// //                     <CvFormation cv={cv} />
// //                     <CvInformationsComplementaires cv={cv} />
// //                 </main>
// //             </div>
// //         </div>
// //     );
// // }



// import CvHeader from './CvHeader';
// import CvProfile from './CvProfile';
// import CvExperience from './CvExperience';
// import CvFormation from './CvFormation';
// import CvInformationsComplementaires from './CvInformationsComplementaires';
// import CvCompetences from './CvCompetences';
// import CvSavoirFaire from './CvSavoirFaire';
// import CvLogiciels from './CvLogiciels';
// import CvLangues from './CvLangues';
// import CvInterets from './CvInterets';

// // "https://www.github.com/daniel/" devient "github.com/daniel"
// function formatUrl(url) {
//     return url
//         .replace(/^https?:\/\//, '')
//         .replace(/^www\./, '')
//         .replace(/\/$/, '');
// }

// export default function CvTemplateClassic({ cv }) {
//     // On liste les liens, puis on garde seulement ceux qui sont remplis
//     const onlineLinks = [
//         { label: 'LinkedIn', value: cv?.linkedin },
//         { label: 'GitHub', value: cv?.github },
//         { label: 'Portfolio', value: cv?.portfolio },
//     ].filter((link) => link.value);

//     return (
//         <div
//             id="cv-preview"
//             className="mx-auto flex h-[297mm] w-[210mm] flex-col overflow-hidden bg-white shadow-2xl"
//         >
//             <CvHeader cv={cv} />

//             <div className="grid min-h-0 flex-1 grid-cols-[55mm_1fr]">
//                 <aside className="min-w-0 space-y-[4mm] bg-slate-100 px-[5mm] py-[4mm]">
//                     {/* Contact */}
//                     <section>
//                         <h2 className="mb-[1.5mm] border-b-[0.4mm] border-slate-800 pb-[1mm] text-[3.7mm] font-bold uppercase tracking-[0.08em] text-slate-800">
//                             Contact
//                         </h2>

//                         <div className="space-y-[1mm] text-[3.2mm] leading-[1.4] text-slate-600">
//                             {cv?.telephone && <p>{cv.telephone}</p>}
//                             {cv?.email && (
//                                 <p className="break-words">{cv.email}</p>
//                             )}
//                             {cv?.adresse && <p>{cv.adresse}</p>}
//                         </div>
//                     </section>

//                     {/* Présence en ligne */}
//                     {onlineLinks.length > 0 && (
//                         <section>
//                             <h2 className="mb-[1.5mm] -[0.4mm] border-slate-800 pb-[1mm] text-[3.7mm] font-bold uppercase tracking-[0.08em] text-slate-800">
//                                 Liens projets
//                             </h2>

//                             <ul className="space-y-[1.5mm] text-[3.2mm] leading-[1.4] text-slate-600">
//                                 {onlineLinks.map((link) => (
//                                     <li key={link.label} className="break-all">
//                                         <span className="font-semibold text-slate-800">
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

//                     <CvLangues cv={cv} />
//                     <CvCompetences cv={cv} />
//                     <CvSavoirFaire cv={cv} />
//                     <CvLogiciels cv={cv} />
//                     <CvInterets cv={cv} />
//                 </aside>

//                 <main className="min-w-0 space-y-[5mm] bg-white px-[7mm] py-[4mm]">
//                     <CvProfile cv={cv} />
//                     <CvExperience cv={cv} />
//                     <CvFormation cv={cv} />
//                     <CvInformationsComplementaires cv={cv} />
//                 </main>
//             </div>
//         </div>
//     );
// }





import CvHeader from './CvHeader';
import CvProfile from './CvProfile';
import CvExperience from './CvExperience';
import CvFormation from './CvFormation';
import CvInformationsComplementaires from './CvInformationsComplementaires';
import CvCompetences from './CvCompetences';
import CvSavoirFaire from './CvSavoirFaire';
import CvLogiciels from './CvLogiciels';
import CvLangues from './CvLangues';
import CvInterets from './CvInterets';

// "https://www.github.com/daniel/" devient "github.com/daniel"
function formatUrl(url) {
    return url
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/$/, '');
}

export default function CvTemplateClassic({ cv }) {
    // On liste les liens, puis on garde seulement ceux qui sont remplis
    const onlineLinks = [
        { label: 'LinkedIn', value: cv?.linkedin },
        { label: 'GitHub', value: cv?.github },
        { label: 'Portfolio', value: cv?.portfolio },
    ].filter((link) => link.value);

    return (
        <div
            id="cv-preview"
            className="mx-auto flex h-[297mm] w-[210mm] flex-col overflow-hidden bg-white shadow-2xl"
        >
            <CvHeader cv={cv} />

            <div className="grid min-h-0 flex-1 grid-cols-[55mm_1fr]">
                <aside className="min-w-0 space-y-[4mm] bg-slate-100 px-[5mm] py-[4mm]">
                    {/* Contact */}
                    <section>
                        <h2 className="mb-[1.5mm] border-b-[0.4mm] border-slate-800 pb-[1mm] text-[3.7mm] font-bold uppercase tracking-[0.08em] text-slate-800">
                            Contact
                        </h2>

                        <div className="space-y-[1mm] text-[3.2mm] leading-[1.4] text-slate-600">
                            {cv?.telephone && <p>{cv.telephone}</p>}
                            {cv?.email && (
                                <p className="break-words">{cv.email}</p>
                            )}
                            {cv?.adresse && <p>{cv.adresse}</p>}
                        </div>
                    </section>

                    {/* Liens projets */}
                    {onlineLinks.length > 0 && (
                        <section>
                            <h2 className="mb-[1.5mm] border-b-[0.4mm] border-slate-800 pb-[1mm] text-[3.7mm] font-bold uppercase tracking-[0.08em] text-slate-800">
                                Liens projets
                            </h2>

                            <ul className="space-y-[1.5mm] text-[3.2mm] leading-[1.4] text-slate-600">
                                {onlineLinks.map((link) => (
                                    <li key={link.label} className="break-all">
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
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    <CvLangues cv={cv} />
                    <CvCompetences cv={cv} />
                    <CvSavoirFaire cv={cv} />
                    <CvLogiciels cv={cv} />
                    <CvInterets cv={cv} />
                </aside>

                <main className="min-w-0 space-y-[5mm] bg-white px-[7mm] py-[4mm]">
                    <CvProfile cv={cv} />
                    <CvExperience cv={cv} />
                    <CvFormation cv={cv} />
                    <CvInformationsComplementaires cv={cv} />
                </main>
            </div>
        </div>
    );
}