export default function CvLogiciels({ cv }) {
    const logiciels = cv.logiciels || [];

    if (logiciels.length === 0) {
        return null;
    }

    return (
        <section className="mb-[6mm]">
            {/* <h2 className="mb-[2.5mm] border-b-[1.5px] border-slate-800 pb-[1.5mm] text-[12px] font-bold uppercase tracking-[0.08em] text-slate-800">
                Logiciels
            </h2> */}
            <h2 className="mb-[2mm] text-[18px] font-bold uppercase tracking-[0.08em] text-slate-800">
    Logiciels
</h2>

            <ul className="space-y-[1mm]">
                {logiciels.map((logiciel, index) => (
                    <li
                        key={index}
                        className="relative pl-[3mm] text-[12px] leading-[1.45] text-slate-600"
                    >
                        <span className="absolute left-0 top-[4px] h-[1.2mm] w-[1.2mm] rounded-full bg-slate-700" />

                        {logiciel.nom}
                    </li>
                ))}
            </ul>
        </section>
    );
}