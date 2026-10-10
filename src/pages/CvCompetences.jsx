// export default function CvCompetences({ cv }) {
//     const competences = cv.competences || [];

//     if (competences.length === 0) {
//         return null;
//     }

//     return (
//         <section className="mb-[6mm]">
//             {/* <h2 className="mb-[2.5mm] border-b-[1.5px] border-slate-800 pb-[1.5mm] text-[12px] font-bold uppercase tracking-[0.08em] text-slate-800">
//                 Compétences
//             </h2> */}
//             <h2 className="mb-[2mm] text-[14px] font-bold uppercase tracking-[0.08em] text-slate-800">
//     Compétences
// </h2>

//             <div className="space-y-[2.5mm]">
//                 {competences.map((competence, index) => {
//                     const niveau = Math.min(
//                         5,
//                         Math.max(1, Number(competence.niveau) || 1)
//                     );

//                     return (
//                         <div key={index}>
//                             <div className="mb-[1mm] flex items-center justify-between gap-2">
//                                 <span className="min-w-0 break-words text-[12px] leading-[1.4] text-slate-600">
//                                     {competence.nom}
//                                 </span>

//                                 <span className="shrink-0 text-[7px] text-slate-400">
//                                     {niveau}/5
//                                 </span>
//                             </div>

//                             <div className="flex gap-[1mm]">
//                                 {[1, 2, 3, 4, 5].map((level) => (
//                                     <div
//                                         key={level}
//                                         className={`h-[1.5mm] flex-1 rounded-full ${
//                                             level <= niveau
//                                                 ? 'bg-slate-800'
//                                                 : 'bg-slate-300'
//                                         }`}
//                                     />
//                                 ))}
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         </section>
//     );
// }



// Couleurs selon le fond sur lequel le composant est posé
const themes = {
    light: {
        title: 'text-slate-800',
        text: 'text-slate-600',
        muted: 'text-slate-400',
        fill: 'bg-slate-800',
        track: 'bg-slate-300',
    },
    dark: {
        title: 'text-white',
        text: 'text-white',
        muted: 'text-white/70',
        fill: 'bg-white',
        track: 'bg-white/30',
    },
};

export default function CvCompetences({ cv, theme = 'light' }) {
    const competences = cv?.competences || [];

    if (competences.length === 0) {
        return null;
    }

    const colors = themes[theme] || themes.light;

    return (
        <section>
            <h2
                className={`mb-[2mm] text-[3.7mm] font-bold uppercase tracking-[0.08em] ${colors.title}`}
            >
                Compétences
            </h2>

            <div className="space-y-[2.5mm]">
                {competences.map((competence, index) => {
                    // Force le niveau entre 1 et 5
                    const niveau = Math.min(
                        5,
                        Math.max(1, Number(competence.niveau) || 1)
                    );

                    return (
                        <div key={index}>
                            <div className="mb-[1mm] flex items-center justify-between gap-[2mm]">
                                <span
                                    className={`min-w-0 break-words text-[3.2mm] leading-[1.4] ${colors.text}`}
                                >
                                    {competence.nom}
                                </span>

                                <span
                                    className={`shrink-0 text-[2.4mm] ${colors.muted}`}
                                >
                                    {niveau}/5
                                </span>
                            </div>

                            <div className="flex gap-[1mm]">
                                {[1, 2, 3, 4, 5].map((level) => (
                                    <div
                                        key={level}
                                        className={`h-[1.5mm] flex-1 rounded-full ${
                                            level <= niveau
                                                ? colors.fill
                                                : colors.track
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}