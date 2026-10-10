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

// export default function CvFormation({ cv }) {
//     const formations = cv.formations || [];

//     if (formations.length === 0) {
//         return null;
//     }

//     return (
//         <section className="mb-[6mm]">
//             <h2 className="mb-[3mm] border-b-[1.5px] border-slate-800 pb-[1.5mm] text-[10px] font-bold uppercase tracking-[0.08em] text-slate-800">
//                 Formation
//             </h2>

//             <div className="space-y-[4mm]">
//                 {formations.map((formation, index) => (
//                     <article key={index}>
//                         <h3 className="text-[10px] font-bold leading-[1.3] text-slate-800">
//                             {formation.diplome || 'Diplôme'}
//                         </h3>

//                         <p className="mt-[1mm] text-[8px] font-medium leading-[1.4] text-slate-500">
//                             {formation.etablissement || 'Établissement'}

//                             {formation.lieu && (
//                                 <span>
//                                     {' — '}
//                                     {formation.lieu}
//                                 </span>
//                             )}

//                             {formation.date_debut && (
//                                 <span>
//                                     {' — '}
//                                     {formatDate(formation.date_debut)}
//                                 </span>
//                             )}

//                             {formation.date_fin && (
//                                 <span>
//                                     {' — '}
//                                     {formatDate(formation.date_fin)}
//                                 </span>
//                             )}
//                         </p>

//                         {formation.description && (
//                             <p className="mt-[1mm] text-[8.5px] leading-[1.45] text-slate-600">
//                                 {formation.description}
//                             </p>
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

export default function CvFormation({ cv }) {
    const formations = cv?.formations || [];

    if (formations.length === 0) {
        return null;
    }

    return (
        <section className="mb-[3mm]">
            {/* <h2 className="mb-[1.5mm] border-b border-slate-800 pb-[1mm] text-[12px] font-bold uppercase tracking-[0.08em] text-slate-800">
                Formation
            </h2> */}
            <h2 className="mb-[2mm] text-[18px] font-bold uppercase tracking-[0.08em] text-slate-800">
    Formation
</h2>

            <div className="space-y-[2mm]">
                {formations.map((formation, index) => (
                    <article key={index}>
                        <h3 className="text-[13px] font-bold leading-[1.4] text-slate-800">
                            {formation.diplome || 'Diplôme'}
                        </h3>

                        <p className="mt-[0.5mm] text-[12px] font-medium leading-[1.3] text-slate-500">
                            {formation.etablissement || 'Établissement'}

                            {formation.lieu && (
                                <span> — {formation.lieu}</span>
                            )}

                            {formation.date_debut && (
                                <span> — {formatDate(formation.date_debut)}</span>
                            )}

                            {formation.date_fin && (
                                <span> — {formatDate(formation.date_fin)}</span>
                            )}
                        </p>

                        {formation.description && (
                            <p className="mt-[0.5mm] whitespace-pre-line text-[10px] leading-[1.3] text-slate-600">
                                {formation.description}
                            </p>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
}