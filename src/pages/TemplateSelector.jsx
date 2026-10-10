import { useCv } from '../context/CvContext';

const templates = [
    {
        id: 'classic',
        name: 'Classique professionnel',
        description: 'Une présentation professionnelle et structurée.',
    },
    {
        id: 'minimal',
        name: 'Minimaliste',
        description: 'Une présentation sobre, claire et élégante.',
    },
    {
        id: 'modern',
        name: 'Moderne',
        description: 'Un design contemporain adapté aux métiers du numérique.',
    },
    {
        id: 'student',
        name: 'Étudiant',
        description: 'Une présentation adaptée aux stages et premiers emplois.',
    },
    {
        id: 'executive',
        name: 'Executive',
        description: 'Une présentation dynamique.',
    },

    {
        id: 'elegant',
        name: 'Elegant',
        description: 'Une présentation elegante.',
    },
    
    {
        id: 'corporate',
        name: 'Corporate',
        description: 'Une présentation corporate.',
    },
    
];

export default function TemplateSelector() {
    const { cv, updateCv } = useCv();

    const selectedTemplate = cv?.template || 'classic';

    const handleSelect = (template) => {
        updateCv('template', template);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-slate-800">
                    Modèle du CV
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Choisissez la présentation qui sera utilisée pour votre CV.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {templates.map((template) => {
                    const isSelected =
                        selectedTemplate === template.id;

                    return (
                        <button
                            key={template.id}
                            type="button"
                            onClick={() => handleSelect(template.id)}
                            className={`overflow-hidden rounded-xl border-2 bg-white text-left shadow-sm transition ${
                                isSelected
                                    ? 'border-blue-600 ring-2 ring-blue-100'
                                    : 'border-slate-200 hover:border-slate-400'
                            }`}
                        >
                            <div className="flex h-48 items-center justify-center bg-slate-100">
                                <div
                                    className={`h-36 w-28 rounded-md bg-white shadow-md ${
                                        template.id === 'classic'
                                            ? 'border-t-8 border-slate-800'
                                            : template.id === 'minimal'
                                                ? 'border border-slate-200'
                                                : template.id === 'modern'
                                                    ? 'border-l-8 border-blue-600'
                                                    : 'border-t-8 border-blue-500'
                                    }`}
                                >
                                    <div className="space-y-2 p-3">
                                        <div className="h-2 w-14 rounded bg-slate-800" />
                                        <div className="h-1.5 w-20 rounded bg-slate-300" />
                                        <div className="mt-4 h-1.5 w-full rounded bg-slate-200" />
                                        <div className="h-1.5 w-5/6 rounded bg-slate-200" />
                                        <div className="h-1.5 w-4/6 rounded bg-slate-200" />
                                    </div>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="flex items-center justify-between gap-3">
                                    <h3 className="font-semibold text-slate-800">
                                        {template.name}
                                    </h3>

                                    {isSelected && (
                                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                            Sélectionné
                                        </span>
                                    )}
                                </div>

                                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                                    {template.description}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}