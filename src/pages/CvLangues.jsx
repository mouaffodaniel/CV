// export default function CvLangues({ cv }) {
//     const langues = cv.langues || [];

//     if (langues.length === 0) {
//         return null;
//     }

//     const getLevel = (niveau) => {
//         const levels = {
//             Débutant: 20,
//             Intermédiaire: 45,
//             Avancé: 65,
//             Courant: 80,
//             Bilingue: 95,
//             'Langue maternelle': 100,
//         };

//         return levels[niveau] || 50;
//     };

//     return (
//         <section className="mb-[6mm]">
//             {/* <h2 className="mb-[3mm] border-b-[1.5px] border-slate-800 pb-[1.5mm] text-[12px] font-bold uppercase tracking-[0.08em] text-slate-800">
//                 Langues
//             </h2> */}
//        <h2 className="mb-[2mm] text-[18px] font-bold uppercase tracking-[0.08em] text-slate-800">
//     Langues
// </h2>     

//             <div className="space-y-[2.5mm]">
//                 {langues.map((langue, index) => (
//                     <div key={index}>
//                         <p className="mb-[1mm] text-[12px] leading-none text-slate-600">
//                             {langue.nom}
//                         </p>

//                         <div className="h-[1.5mm] w-full overflow-hidden rounded-full bg-slate-300">
//                             <div
//                                 className="h-full bg-slate-800"
//                                 style={{
//                                     width: `${getLevel(langue.niveau)}%`,
//                                 }}
//                             />
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// }


const themes = {
    light: {
        title: 'text-slate-800',
        text: 'text-slate-600',
        fill: 'bg-slate-800',
        track: 'bg-slate-300',
    },
    dark: {
        title: 'text-white',
        text: 'text-white',
        fill: 'bg-white',
        track: 'bg-white/30',
    },
};

// Pourcentage de remplissage de la barre selon le niveau choisi
const LEVELS = {
    Débutant: 20,
    Intermédiaire: 45,
    Avancé: 65,
    Courant: 80,
    Bilingue: 95,
    'Langue maternelle': 100,
};

export default function CvLangues({ cv, theme = 'light' }) {
    const langues = cv?.langues || [];

    if (langues.length === 0) {
        return null;
    }

    const colors = themes[theme] || themes.light;

    return (
        <section>
            <h2
                className={`mb-[2mm] text-[3.7mm] font-bold uppercase tracking-[0.08em] ${colors.title}`}
            >
                Langues
            </h2>

            <div className="space-y-[2.5mm]">
                {langues.map((langue, index) => (
                    <div key={index}>
                        <p
                            className={`mb-[1mm] text-[3.2mm] leading-none ${colors.text}`}
                        >
                            {langue.nom}
                        </p>

                        <div
                            className={`h-[1.5mm] w-full overflow-hidden rounded-full ${colors.track}`}
                        >
                            <div
                                className={`h-full ${colors.fill}`}
                                style={{
                                    width: `${LEVELS[langue.niveau] || 50}%`,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}