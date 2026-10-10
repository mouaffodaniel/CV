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

export default function CvTemplateExecutive({ cv }) {
    const fullName =
        [cv?.nom, cv?.prenom].filter(Boolean).join(' ') || 'Votre nom';

    const photoPreview = getPhotoPreview(cv?.photo);

    const initials = (
        (cv?.nom?.charAt(0) || '') + (cv?.prenom?.charAt(0) || '')
    ).toUpperCase();

    // Coordonnées : on garde seulement celles qui sont remplies
    const contacts = [cv?.telephone, cv?.email, cv?.adresse].filter(Boolean);

    const onlineLinks = [
        { label: 'LinkedIn', value: cv?.linkedin },
        { label: 'GitHub', value: cv?.github },
        { label: 'Portfolio', value: cv?.portfolio },
    ].filter((link) => link.value);

    const hasContactBand = contacts.length > 0 || onlineLinks.length > 0;

    return (
        <div
            id="cv-preview"
            className="mx-auto flex min-h-[297mm] w-[210mm] flex-col overflow-hidden bg-white shadow-2xl"
        >
            {/* ===== EN-TÊTE ===== */}
            <header className="border-b-[1mm] border-amber-500 bg-slate-900 px-[12mm] py-[9mm] text-white">
                <div className="flex items-center justify-between gap-[8mm]">
                    <div className="min-w-0 flex-1">
                        <h1 className="text-[10mm] font-bold uppercase leading-none tracking-wide">
                            {fullName}
                        </h1>

                        <div className="mt-[4mm] h-[0.5mm] w-[18mm] bg-amber-500" />

                        <p className="mt-[4mm] text-[4.2mm] font-medium uppercase tracking-[0.18em] text-slate-300">
                            {cv?.titre_poste || 'Intitulé du poste'}
                        </p>
                    </div>

                    {photoPreview ? (
                        <div className="h-[34mm] w-[34mm] shrink-0 overflow-hidden rounded-md border-[0.8mm] border-amber-500">
                            <img
                                src={photoPreview}
                                alt={fullName}
                                crossOrigin="anonymous"
                                referrerPolicy="no-referrer"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="flex h-[34mm] w-[34mm] shrink-0 items-center justify-center rounded-md border-[0.8mm] border-amber-500 bg-slate-800 text-[9mm] font-bold text-amber-500">
                            {initials}
                        </div>
                    )}
                </div>
            </header>

            {/* ===== BANDE DE CONTACT ===== */}
            {hasContactBand && (
                <div className="flex flex-wrap gap-x-[6mm] gap-y-[1.5mm] bg-slate-100 px-[12mm] py-[3.5mm] text-[3.2mm] text-slate-700">
                    {contacts.map((contact) => (
                        <span key={contact} className="break-all">
                            {contact}
                        </span>
                    ))}

                    {onlineLinks.map((link) => (
                        <span key={link.label} className="break-all">
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
                        </span>
                    ))}
                </div>
            )}

            {/* ===== CORPS : 2 colonnes ===== */}
            <div className="grid flex-1 grid-cols-[1fr_62mm]">
                {/* Parcours */}
                <main className="min-w-0 space-y-[6mm] px-[12mm] py-[8mm]">
                    <CvProfile cv={cv} />
                    <CvExperience cv={cv} />
                    <CvFormation cv={cv} />
                    <CvInformationsComplementaires cv={cv} />
                </main>

                {/* Compétences */}
                <aside className="min-w-0 space-y-[6mm] border-l border-slate-200 bg-slate-50 px-[6mm] py-[8mm]">
                    <CvCompetences cv={cv} />
                    <CvSavoirFaire cv={cv} />
                    <CvLogiciels cv={cv} />
                    <CvLangues cv={cv} />
                    <CvInterets cv={cv} />
                </aside>
            </div>
        </div>
    );
}