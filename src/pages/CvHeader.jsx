export default function CvHeader({ cv }) {
    const safeCv = cv || {};

    const photoPreview =
        typeof safeCv.photo === 'object' && safeCv.photo !== null
            ? safeCv.photo.preview || safeCv.photo.url || null
            : typeof safeCv.photo === 'string'
                ? safeCv.photo
                : null;

    const hasPhoto = Boolean(photoPreview);

    const initials =
        (safeCv.nom?.charAt(0) || '') +
        (safeCv.prenom?.charAt(0) || '');

    const fullName =
        [safeCv.nom, safeCv.prenom]
            .filter(Boolean)
            .join(' ') || 'Votre nom';

    return (
        <header className="relative h-[45mm] overflow-hidden bg-slate-100">
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-slate-800"
                    style={{
                        clipPath:
                            'polygon(0 0, 43% 0, 24% 100%, 0 100%)',
                    }}
                />

                <div
                    className="absolute inset-0 bg-slate-100"
                    style={{
                        clipPath:
                            'polygon(43% 0, 100% 0, 100% 100%, 24% 100%)',
                    }}
                />
            </div>

            <div className="relative z-10 flex h-full">
                <div className="flex w-[35%] items-center justify-center">
                    <div className="mt-[3mm] h-[32mm] w-[32mm] overflow-hidden rounded-full border-[1.mm] border-white bg-slate-300 shadow-md">
                        {hasPhoto ? (
                            // <img
                            //     src={photoPreview}
                            //     alt={fullName}
                            //     className="h-full w-full object-cover"
                            // />
                            <img
    src={photoPreview}
    alt={fullName}
    crossOrigin="anonymous"
    referrerPolicy="no-referrer"
    className="h-full w-full object-cover"
    onError={(e) => {
        console.error("Erreur de chargement de la photo :", e);
    }}
/>
                        ) : (
                            <div className="flex h-full w-full items-center justify-center">
                                <span className="text-[9mm] font-bold text-slate-500">
                                    {initials || 'CV'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-1 flex-col justify-center px-[8mm]">
                    <h1 className="max-w-[105mm] break-words text-[8mm] font-bold uppercase leading-[1.05] tracking-wide text-slate-900">
                        {fullName}
                    </h1>

                    <p className="mt-[2mm] text-[5mm] font-semibold uppercase tracking-wide text-slate-800">
                        {safeCv.titre_poste || 'Intitulé du poste'}
                    </p>
                </div>
            </div>
        </header>
    );
}