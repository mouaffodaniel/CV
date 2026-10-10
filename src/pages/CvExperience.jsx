// function formatDate(date) {
//     if (!date) {
//         return '';
//     }

//     const [year, month] = date.split('-');

//     const months = [
//         'Jan',
//         'Fév',
//         'Mar',
//         'Avr',
//         'Mai',
//         'Juin',
//         'Juil',
//         'Août',
//         'Sep',
//         'Oct',
//         'Nov',
//         'Déc',
//     ];

//     return `${months[Number(month) - 1] || month} ${year}`;
// }

// export default function CvExperience({ cv }) {
//     const experiences = cv.experiences || [];

//     if (experiences.length === 0) {
//         return null;
//     }

//     return (
//         <section className="mb-[6mm]">
//             <h2 className="mb-[3mm] border-b-[1.5px] border-slate-800 pb-[1.5mm] text-[10px] font-bold uppercase tracking-[0.08em] text-slate-800">
//                 Expériences professionnelles
//             </h2>

//             <div className="space-y-[4.5mm]">
//                 {experiences.map((experience, index) => (
//                     <article key={index}>
//                         <h3 className="text-[10px] font-bold leading-[1.3] text-slate-800">
//                             {experience.poste || 'Poste'}
//                         </h3>

//                         <div className="mt-[1mm] flex flex-wrap items-center gap-x-[1.5mm] text-[8px] font-medium leading-[1.4] text-slate-500">
//                             <span>
//                                 {experience.entreprise || 'Entreprise'}
//                             </span>

//                             {experience.lieu && (
//                                 <>
//                                     <span>•</span>
//                                     <span>{experience.lieu}</span>
//                                 </>
//                             )}

//                             {experience.date_debut && (
//                                 <>
//                                     <span>•</span>
//                                     <span>
//                                         {formatDate(experience.date_debut)}
//                                     </span>
//                                 </>
//                             )}

//                             {experience.poste_actuel ? (
//                                 <>
//                                     <span>•</span>
//                                     <span>Présent</span>
//                                 </>
//                             ) : (
//                                 experience.date_fin && (
//                                     <>
//                                         <span>•</span>
//                                         <span>
//                                             {formatDate(experience.date_fin)}
//                                         </span>
//                                     </>
//                                 )
//                             )}
//                         </div>

//                         {experience.description && (
//                             <ul className="mt-[1.5mm] space-y-[0.8mm]">
//                                 {experience.description
//                                     .split('\n')
//                                     .filter((line) => line.trim())
//                                     .map((line, descriptionIndex) => (
//                                         <li
//                                             key={descriptionIndex}
//                                             className="relative pl-[3mm] text-[8.5px] leading-[1.45] text-slate-600"
//                                         >
//                                             <span className="absolute left-0 top-[4px] h-[1.2mm] w-[1.2mm] rounded-full bg-slate-700" />

//                                             {line.replace(/^[-•]\s*/, '')}
//                                         </li>
//                                     ))}
//                             </ul>
//                         )}
//                     </article>
//                 ))}
//             </div>
//         </section>
//     );
// }

function formatDate(date) {
    if (!date) {
        return '';
    }

    const [year, month] = date.split('-');

    const months = [
        'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
        'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc',
    ];

    return `${months[Number(month) - 1] || month} ${year}`;
}

export default function CvExperience({ cv }) {
    const experiences = cv?.experiences || [];

    if (experiences.length === 0) {
        return null;
    }

    return (
        <section className="mb-[3mm]">
            {/* <h2 className="mb-[1.5mm] border-b border-slate-800 pb-[1mm] text-[12px] font-bold uppercase tracking-[0.08em] text-slate-800">
                Expériences professionnelles
            </h2> */}
            <h2 className="mb-[2mm] text-[18px] font-bold uppercase tracking-[0.08em] text-slate-800">
    Expériences professionnelles
</h2>

            <div className="space-y-[2.5mm]">
                {experiences.map((experience, index) => (
                    <article key={index}>
                        <h3 className="text-[13px] font-bold leading-[1.4] text-slate-800">
                            {experience.poste || 'Poste'}
                        </h3>

                        <div className="mt-[0.5mm] flex flex-wrap items-center gap-x-[1mm] text-[12px] font-medium leading-[1.3] text-slate-500">
                            <span>
                                {experience.entreprise || 'Entreprise'}
                            </span>

                            {experience.lieu && (
                                <>
                                    <span>•</span>
                                    <span>{experience.lieu}</span>
                                </>
                            )}

                            {experience.date_debut && (
                                <>
                                    <span>•</span>
                                    <span>{formatDate(experience.date_debut)}</span>
                                </>
                            )}

                            {experience.poste_actuel ? (
                                <>
                                    <span>•</span>
                                    <span>Présent</span>
                                </>
                            ) : (
                                experience.date_fin && (
                                    <>
                                        <span>•</span>
                                        <span>{formatDate(experience.date_fin)}</span>
                                    </>
                                )
                            )}
                        </div>

                        {experience.description && (
                            <ul className="mt-[1mm] space-y-[0.4mm]">
                                {experience.description
                                    .split('\n')
                                    .filter((line) => line.trim())
                                    .map((line, descriptionIndex) => (
                                        <li
                                            key={descriptionIndex}
                                            className="relative pl-[2.5mm] text-[10px] leading-[1.3] text-slate-600"
                                        >
                                            <span className="absolute left-0 top-[3px] h-[1mm] w-[1mm] rounded-full bg-slate-700" />
                                            {line.replace(/^[-•]\s*/, '')}
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
}