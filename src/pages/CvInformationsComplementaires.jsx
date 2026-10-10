
// export default function CvInformationsComplementaires({ cv }) {
//     const informations = Array.isArray(cv?.informationsComplementaires)
//         ? cv.informationsComplementaires
//         : Array.isArray(cv?.informations_complementaires)
//             ? cv.informations_complementaires
//             : [];

//     if (informations.length === 0) {
//         return null;
//     }

//     const formatDate = (date) => {
//         if (!date) return '';

//         const parsedDate = new Date(`${date.substring(0, 10)}T00:00:00`);

//         if (Number.isNaN(parsedDate.getTime())) {
//             return '';
//         }

//         return parsedDate.toLocaleDateString('fr-FR', {
//             month: 'long',
//             year: 'numeric',
//         });
//     };

//     return (
//         <section className="mb-[4mm]">
//             <h2 className="mb-[2mm] border-b border-slate-300 pb-[1.2mm] text-[11px] font-bold uppercase tracking-[0.08em] text-slate-800">
//                 Informations complémentaires
//             </h2>

//             <div className="space-y-[2.5mm]">
//                 {informations.map((information, index) => (
//                     <article
//                         key={information.id ?? index}
//                         className="break-inside-avoid"
//                     >
//                         <h3 className="text-[9.5px] font-semibold leading-tight text-slate-800">
//                             {information.intitule}
//                         </h3>

//                         {(information.etablissement ||
//                             information.date_obtention) && (
//                             <p className="mt-[0.5mm] text-[8.5px] leading-tight text-slate-600">
//                                 {information.etablissement}
//                                 {information.etablissement &&
//                                     information.date_obtention
//                                     ? ' — '
//                                     : ''}
//                                 {formatDate(information.date_obtention)}
//                             </p>
//                         )}

//                         {information.type && (
//                             <p className="mt-[0.5mm] text-[8px] italic text-slate-500">
//                                 {information.type}
//                             </p>
//                         )}

//                         {information.description && (
//                             <p className="mt-[1mm] whitespace-pre-line break-words text-[8.5px] leading-[1.35] text-slate-600">
//                                 {information.description}
//                             </p>
//                         )}
//                     </article>
//                 ))}
//             </div>
//         </section>
//     );
// }


export default function CvInformationsComplementaires({ cv }) {
    const informations = Array.isArray(cv?.informationsComplementaires)
        ? cv.informationsComplementaires
        : Array.isArray(cv?.informations_complementaires)
            ? cv.informations_complementaires
            : [];

    if (informations.length === 0) {
        return null;
    }

    const formatDate = (date) => {
        if (!date) return '';

        const parsedDate = new Date(`${date.substring(0, 10)}T00:00:00`);

        if (Number.isNaN(parsedDate.getTime())) {
            return '';
        }

        return parsedDate.toLocaleDateString('fr-FR', {
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <section className="mb-[4mm]">
            {/* <h2 className="mb-[2mm] border-b border-slate-300 pb-[1.2mm] text-[12px] font-bold uppercase tracking-[0.08em] text-slate-800">
                Informations complémentaires
            </h2> */}
            <h2 className="mb-[2mm] text-[18px] font-bold uppercase tracking-[0.08em] text-slate-800">
    Informations complémentaires
</h2>

            <div className="space-y-[2.5mm]">
                {informations.map((information, index) => (
                    <article
                        key={information.id ?? index}
                        className="break-inside-avoid"
                    >
                        <h3 className="text-[13px] font-semibold leading-tight text-slate-800">
                            {information.intitule}
                        </h3>

                        {(information.etablissement ||
                            information.date_obtention) && (
                            <p className="mt-[0.5mm] text-[12px] leading-tight text-slate-600">
                                {information.etablissement}
                                {information.etablissement &&
                                    information.date_obtention
                                    ? ' — '
                                    : ''}
                                {formatDate(information.date_obtention)}
                            </p>
                        )}

                        {information.type && (
                            <p className="mt-[0.5mm] text-[10px] italic text-slate-500">
                                {information.type}
                            </p>
                        )}

                        {information.description && (
                            <p className="mt-[1mm] whitespace-pre-line break-words text-[10px] leading-[1.35] text-slate-600">
                                {information.description}
                            </p>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
}
