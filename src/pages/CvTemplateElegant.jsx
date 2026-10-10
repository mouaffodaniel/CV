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

export default function CvTemplateElegant({ cv }) {
    // Nom avant prénom
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

    return (
        <div
            id="cv-preview"
            className="mx-auto min-h-[297mm] w-[210mm] overflow-hidden bg-white px-[16mm] py-[12mm] font-serif shadow-2xl"
        >
            {/* ===== EN-TÊTE CENTRÉ ===== */}
            <header className="text-center">
                {photoPreview ? (
                    <div className="mx-auto mb-[4mm] h-[28mm] w-[28mm] overflow-hidden rounded-full border-[0.5mm] border-slate-800">
                        <img
                            src={photoPreview}
                            alt={fullName}
                            crossOrigin="anonymous"
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover"
                        />
                    </div>
                ) : (
                    <div className="mx-auto mb-[4mm] flex h-[28mm] w-[28mm] items-center justify-center rounded-full border-[0.5mm] border-slate-800 text-[8mm] font-semibold text-slate-800">
                        {initials}
                    </div>
                )}

                <h1 className="text-[9mm] font-semibold uppercase leading-tight tracking-[0.15em] text-slate-900">
                    {fullName}
                </h1>

                <p className="mt-[2mm] text-[4.2mm] italic text-slate-500">
                    {cv?.titre_poste || 'Intitulé du poste'}
                </p>

                {/* Coordonnées */}
                {contacts.length > 0 && (
                    <div className="mt-[4mm] flex flex-wrap justify-center gap-x-[6mm] gap-y-[1mm] text-[3.2mm] text-slate-600">
                        {contacts.map((contact) => (
                            <span key={contact} className="break-all">
                                {contact}
                            </span>
                        ))}
                    </div>
                )}

                {/* Liens en ligne */}
                {onlineLinks.length > 0 && (
                    <div className="mt-[1.5mm] flex flex-wrap justify-center gap-x-[6mm] gap-y-[1mm] text-[3.2mm] text-slate-600">
                        {onlineLinks.map((link) => (
                            <span key={link.label} className="break-all">
                                <span className="font-semibold text-slate-800">
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

                {/* Filet double */}
                <div className="mt-[5mm] h-[1.4mm] border-y-[0.3mm] border-slate-800" />
            </header>

            {/* ===== CORPS ===== */}
            <main className="space-y-[6mm] pt-[6mm]">
                <CvProfile cv={cv} />
                <CvExperience cv={cv} />
                <CvFormation cv={cv} />
                <CvInformationsComplementaires cv={cv} />

                {/* Compétences, langues, etc. sur 2 colonnes */}
                <div className="grid grid-cols-2 gap-[10mm] border-t-[0.3mm] border-slate-300 pt-[6mm]">
                    <div className="min-w-0 space-y-[5mm]">
                        <CvCompetences cv={cv} />
                        <CvSavoirFaire cv={cv} />
                    </div>

                    <div className="min-w-0 space-y-[5mm]">
                        <CvLogiciels cv={cv} />
                        <CvLangues cv={cv} />
                        <CvInterets cv={cv} />
                    </div>
                </div>
            </main>
        </div>
    );
}
