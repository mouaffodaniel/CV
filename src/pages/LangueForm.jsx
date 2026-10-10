import { useState } from 'react';
import { useCv } from '../context/CvContext';

const niveaux = [
    'Débutant',
    'Intermédiaire',
    'Avancé',
    'Courant',
    'Bilingue',
    'Langue maternelle',
];

export default function LangueForm() {
    const { cv, updateCv } = useCv();

    const [nom, setNom] = useState('');
    const [niveau, setNiveau] = useState('Intermédiaire');

    const langues = cv.langues || [];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nom.trim()) {
            return;
        }

        updateCv('langues', [
            ...langues,
            {
                nom: nom.trim(),
                niveau,
            },
        ]);

        setNom('');
        setNiveau('Intermédiaire');
    };

    const handleDelete = (index) => {
        updateCv(
            'langues',
            langues.filter((_, itemIndex) => itemIndex !== index)
        );
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Langue
                    </label>

                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        placeholder="Français"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Niveau
                    </label>

                    <select
                        value={niveau}
                        onChange={(e) => setNiveau(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                    >
                        {niveaux.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                >
                    Ajouter
                </button>
            </form>

            {langues.length > 0 && (
                <div className="space-y-3 border-t border-slate-200 pt-5">
                    {langues.map((langue, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
                        >
                            <div>
                                <p className="font-medium text-slate-900">
                                    {langue.nom}
                                </p>

                                <p className="text-xs text-slate-500">
                                    {langue.niveau}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => handleDelete(index)}
                                className="text-xs font-medium text-red-600 hover:underline"
                            >
                                Supprimer
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}