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

// La photo peut être un objet { file, preview } (upload du formulaire)
// ou une simple string (URL). Renvoie toujours une URL ou null.
function getPhotoPreview(photo) {
    if (typeof photo === 'string') {
        return photo;
    }

    if (typeof photo === 'object' && photo !== null) {
        return photo.preview || photo.url || null;
    }

    return null;
}

// "https://www.github.com/daniel/" devient "github.com/daniel"
function formatUrl(url) {
    return url
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/$/, '');
}

// Titre de section de la barre latérale
function SideTitle({ children }) {
    return (
        <h2 className="mb-[2mm] border-b-[0.4mm] border-teal-700 pb-[1mm] text-[3.8mm] font-semibold text-teal-800">
            {children}
        </h2>
    );
}

export default function CvTemplateCorporate({ cv }) {
    // Nom avant prénom
    const fullName =
        [cv?.nom, cv?.prenom].filter(Boolean).join(' ') || 'Votre nom';

    const photoPreview = getPhotoPreview(cv?.photo);

    const initials = (
        (cv?.nom?.charAt(0) || '') + (cv?.prenom?.charAt(0) || '')
    ).toUpperCase();

    const onlineLinks = [
        { label: 'LinkedIn', value: cv?.linkedin },
        { label: 'GitHub', value: cv?.github },
        { label: 'Portfolio', value: cv?.portfolio },
    ].filter((link) => link.value);

    const hasContact = cv?.telephone || cv?.email || cv?.adresse;

    return (
        <div
            id="cv-preview"
            className="mx-auto w-[210mm] overflow-hidden bg-white shadow-2xl"
        >
            <div className="grid min-h-[297mm] grid-cols-[64mm_1fr]">
                {/* ===== BARRE LATÉRALE ===== */}
                <aside className="min-w-0 bg-slate-100">
                    {/* Photo carrée, de bord à bord */}
                    <div className="aspect-square w-full overflow-hidden bg-teal-700">
                        {photoPreview ? (
                            <img
                                src={photoPreview}
                                alt={fullName}
                                crossOrigin="anonymous"
                                referrerPolicy="no-referrer"
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-[16mm] font-bold text-white">
                                {initials}
                            </div>
                        )}
                    </div>

                    <div className="space-y-[5mm] px-[6mm] py-[6mm]">
                        {/* Contact */}
                        {hasContact && (
                            <section>
                                <SideTitle>Contact</SideTitle>

                                <div className="space-y-[1.5mm] text-[3.2mm] leading-[1.4] text-slate-700">
                                    {cv?.telephone && <p>{cv.telephone}</p>}
                                    {cv?.email && (
                                        <p className="break-words">
                                            {cv.email}
                                        </p>
                                    )}
                                    {cv?.adresse && <p>{cv.adresse}</p>}
                                </div>
                            </section>
                        )}

                        {/* Présence en ligne */}
                        {onlineLinks.length > 0 && (
                            <section>
                                <SideTitle>Présence en ligne</SideTitle>

                                <ul className="space-y-[1.5mm] text-[3.2mm] leading-[1.4] text-slate-700">
                                    {onlineLinks.map((link) => (
                                        <li
                                            key={link.label}
                                            className="break-all"
                                        >
                                            <span className="font-semibold text-slate-900">
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

                        {/* Compétences, langues, etc. */}
                        <CvCompetences cv={cv} />
                    <CvSavoirFaire cv={cv} />
                    <CvLogiciels cv={cv} />
                    <CvLangues cv={cv} />
                    <CvInterets cv={cv} />
                    </div>
                </aside>

                {/* ===== COLONNE PRINCIPALE ===== */}
                <main className="min-w-0 px-[10mm] py-[10mm]">
                    <header className="mb-[6mm] border-b-[1mm] border-teal-700 pb-[5mm]">
                        <h1 className="text-[10mm] font-bold leading-none text-slate-900">
                            {fullName}
                        </h1>

                        <p className="mt-[3mm] text-[4.5mm] font-medium text-teal-700">
                            {cv?.titre_poste || 'Intitulé du poste'}
                        </p>
                    </header>

                    <div className="space-y-[6mm]">
                        <CvProfile cv={cv} />
                        <CvExperience cv={cv} />
                        <CvFormation cv={cv} />
                        <CvInformationsComplementaires cv={cv} />
                    </div>
                </main>
            </div>
        </div>
    );
}
