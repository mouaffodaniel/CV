import { useState } from 'react';
import { useCv } from '../context/CvContext';

export default function InteretForm() {
    const { cv, updateCv } = useCv();

    const [nom, setNom] = useState('');

    const interets = cv.interets || [];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nom.trim()) {
            return;
        }

        updateCv('interets', [
            ...interets,
            {
                nom: nom.trim(),
            },
        ]);

        setNom('');
    };

    const handleDelete = (index) => {
        updateCv(
            'interets',
            interets.filter((_, itemIndex) => itemIndex !== index)
        );
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Centre d'intérêt
                    </label>

                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        placeholder="Lecture"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                    />
                </div>

                <button
                    type="submit"
                    className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                >
                    Ajouter
                </button>
            </form>

            {interets.length > 0 && (
                <div className="border-t border-slate-200 pt-5">
                    <div className="flex flex-wrap gap-2">
                        {interets.map((interet, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 rounded-full bg-slate-100 px-4 py-2"
                            >
                                <span className="text-sm text-slate-700">
                                    {interet.nom}
                                </span>

                                <button
                                    type="button"
                                    onClick={() => handleDelete(index)}
                                    className="text-xs font-semibold text-red-600"
                                >
                                    Supprimer
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}