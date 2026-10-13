export default function CvSavoirFaire({ cv }) {
    const savoirFaires = cv.savoirFaires || [];

    if (savoirFaires.length === 0) {
        return null;
    }

    return (
        <section className="mb-[6mm]">
            <h2 className="mb-[2mm] text-[18px] font-bold uppercase tracking-[0.08em] text-slate-800">
    Savoir-faire 
    
</h2>

            <ul className="space-y-[1mm]">
                {savoirFaires.map((item, index) => (
                    <li
                        key={index}
                        className="relative pl-[3mm] text-[12px] leading-[1.45] text-slate-600"
                    >
                        <span className="absolute left-0 top-[4px] h-[1.2mm] w-[1.2mm] rounded-full bg-slate-700" />

                        {item.nom}
                    </li>
                ))}
            </ul>
        </section>
    );
}