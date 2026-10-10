// export default function CvProfile({ cv }) {
//     if (!cv.profil_professionnel?.trim()) {
//         return null;
//     }

//     return (
//         <section className="mb-[6mm]">
//             <h2 className="mb-[2.5mm] border-b-[1.5px] border-slate-800 pb-[1.5mm] text-[10px] font-bold uppercase tracking-[0.08em] text-slate-800">
//                 Profil
//             </h2>

//             <p className="whitespace-pre-line text-[9px] leading-[1.55] text-slate-600">
//                 {cv.profil_professionnel}
//             </p>
//         </section>
//     );
// }

export default function CvProfile({ cv }) {
    if (!cv?.profil_professionnel?.trim()) {
        return null;
    }

    return (
        <section className="mb-[3mm]">
            {/* <h2 className="mb-[1.5mm] border-b border-slate-800 pb-[1mm] text-[12px] font-bold uppercase tracking-[0.08em] text-slate-800">
                Profil
            </h2> */}

            <h2 className="mb-[2mm] text-[18px] font-bold uppercase tracking-[0.08em] text-slate-800">
    Profil
</h2>

            <p className="whitespace-pre-line text-[12px] leading-[1.35] text-slate-600">
                {cv.profil_professionnel}
            </p>
        </section>
    );
}