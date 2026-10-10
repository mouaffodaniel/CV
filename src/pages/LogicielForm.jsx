// import { useState } from 'react';
// import { useCv } from '../context/CvContext';

// export default function LogicielForm() {
//     const { cv, updateCv } = useCv();

//     const [nom, setNom] = useState('');
//     const [niveau, setNiveau] = useState(3);

//     const logiciels = cv.logiciels || [];

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (!nom.trim()) {
//             return;
//         }

//         updateCv('logiciels', [
//             ...logiciels,
//             {
//                 nom: nom.trim(),
//                 niveau: Number(niveau),
//             },
//         ]);

//         setNom('');
//         setNiveau(3);
//     };

//     const handleDelete = (index) => {
//         updateCv(
//             'logiciels',
//             logiciels.filter((_, itemIndex) => itemIndex !== index)
//         );
//     };

//     return (
//         <div className="space-y-6">
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <label className="mb-2 block text-sm font-medium text-slate-700">
//                         Logiciel
//                     </label>

//                     <input
//                         type="text"
//                         value={nom}
//                         onChange={(e) => setNom(e.target.value)}
//                         placeholder="Microsoft Word"
//                         className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
//                     />
//                 </div>

//                 <div>
//                     <label className="mb-2 block text-sm font-medium text-slate-700">
//                         Niveau : {niveau}/5
//                     </label>

//                     <input
//                         type="range"
//                         min="1"
//                         max="5"
//                         value={niveau}
//                         onChange={(e) => setNiveau(e.target.value)}
//                         className="w-full"
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
//                 >
//                     Ajouter
//                 </button>
//             </form>

//             {logiciels.length > 0 && (
//                 <div className="space-y-3 border-t border-slate-200 pt-5">
//                     {logiciels.map((logiciel, index) => (
//                         <div
//                             key={index}
//                             className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
//                         >
//                             <div>
//                                 <p className="font-medium text-slate-900">
//                                     {logiciel.nom}
//                                 </p>

//                                 <p className="text-xs text-slate-500">
//                                     Niveau : {logiciel.niveau}/5
//                                 </p>
//                             </div>

//                             <button
//                                 type="button"
//                                 onClick={() => handleDelete(index)}
//                                 className="text-xs font-medium text-red-600 hover:underline"
//                             >
//                                 Supprimer
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }

import { useState } from 'react';
import { useCv } from '../context/CvContext';

const emptyLogiciel = {
    nom: '',
    niveau: 1,
};

const levels = [
    { value: 1, label: 'Débutant' },
    { value: 2, label: 'Intermédiaire' },
    { value: 3, label: 'Avancé' },
    { value: 4, label: 'Très avancé' },
    { value: 5, label: 'Expert' },
];

export default function LogicielForm() {
    const { cv, updateCv } = useCv();

    const logiciels = cv.logiciels || [];

    const [form, setForm] = useState(emptyLogiciel);
    const [editingIndex, setEditingIndex] = useState(null);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: name === 'niveau' ? Number(value) : value,
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: '',
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!form.nom.trim()) {
            newErrors.nom = 'Le nom du logiciel est obligatoire.';
        }

        if (form.niveau < 1 || form.niveau > 5) {
            newErrors.niveau = 'Veuillez sélectionner un niveau valide.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        if (editingIndex !== null) {
            const updatedLogiciels = [...logiciels];

            updatedLogiciels[editingIndex] = {
                ...form,
            };

            updateCv('logiciels', updatedLogiciels);
        } else {
            updateCv('logiciels', [
                ...logiciels,
                {
                    ...form,
                },
            ]);
        }

        resetForm();
    };

    const handleEdit = (index) => {
        setForm({
            ...logiciels[index],
        });

        setEditingIndex(index);
        setErrors({});
    };

    const handleDelete = (index) => {
        const confirmed = window.confirm(
            'Voulez-vous vraiment supprimer ce logiciel ?'
        );

        if (!confirmed) {
            return;
        }

        const updatedLogiciels = logiciels.filter(
            (_, logicielIndex) => logicielIndex !== index
        );

        updateCv('logiciels', updatedLogiciels);

        if (editingIndex === index) {
            resetForm();
        }
    };

    const resetForm = () => {
        setForm(emptyLogiciel);
        setEditingIndex(null);
        setErrors({});
    };

    const getLevelLabel = (niveau) => {
        return (
            levels.find((level) => level.value === Number(niveau))
                ?.label || 'Débutant'
        );
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-base font-semibold text-slate-900">
                    {editingIndex !== null
                        ? 'Modifier le logiciel'
                        : 'Ajouter un logiciel'}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    Indiquez les logiciels et outils que vous maîtrisez.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label
                        htmlFor="logiciel-nom"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Logiciel ou outil
                    </label>

                    <input
                        id="logiciel-nom"
                        name="nom"
                        type="text"
                        value={form.nom}
                        onChange={handleChange}
                        placeholder="Ex. Microsoft Excel"
                        className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
                            errors.nom
                                ? 'border-red-400 focus:border-red-500'
                                : 'border-slate-300 focus:border-slate-800'
                        }`}
                    />

                    {errors.nom && (
                        <p className="mt-1 text-xs text-red-600">
                            {errors.nom}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="logiciel-niveau"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Niveau de maîtrise
                    </label>

                    <select
                        id="logiciel-niveau"
                        name="niveau"
                        value={form.niveau}
                        onChange={handleChange}
                        className={`w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none transition ${
                            errors.niveau
                                ? 'border-red-400 focus:border-red-500'
                                : 'border-slate-300 focus:border-slate-800'
                        }`}
                    >
                        {levels.map((level) => (
                            <option
                                key={level.value}
                                value={level.value}
                            >
                                {level.label}
                            </option>
                        ))}
                    </select>

                    {errors.niveau && (
                        <p className="mt-1 text-xs text-red-600">
                            {errors.niveau}
                        </p>
                    )}
                </div>

                <div>
                    <p className="mb-2 text-xs font-medium text-slate-500">
                        Aperçu du niveau
                    </p>

                    <div className="flex gap-1.5">
                        {levels.map((level) => (
                            <div
                                key={level.value}
                                className={`h-2 flex-1 rounded-full transition ${
                                    level.value <= form.niveau
                                        ? 'bg-slate-800'
                                        : 'bg-slate-200'
                                }`}
                            />
                        ))}
                    </div>

                    <p className="mt-2 text-xs text-slate-500">
                        {getLevelLabel(form.niveau)}
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button
                        type="submit"
                        className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        {editingIndex !== null
                            ? 'Mettre à jour'
                            : 'Ajouter le logiciel'}
                    </button>

                    {editingIndex !== null && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                        >
                            Annuler
                        </button>
                    )}
                </div>
            </form>

            {logiciels.length > 0 && (
                <div className="border-t border-slate-200 pt-5">
                    <div className="mb-4">
                        <h3 className="text-sm font-semibold text-slate-900">
                            Logiciels ajoutés
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                            {logiciels.length}{' '}
                            {logiciels.length > 1
                                ? 'logiciels'
                                : 'logiciel'}
                        </p>
                    </div>

                    <div className="space-y-3">
                        {logiciels.map((logiciel, index) => {
                            const niveau = Math.min(
                                5,
                                Math.max(1, Number(logiciel.niveau) || 1)
                            );

                            return (
                                <div
                                    key={index}
                                    className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                                >
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="min-w-0 flex-1">
                                            <h4 className="break-words text-sm font-semibold text-slate-900">
                                                {logiciel.nom}
                                            </h4>

                                            <p className="mt-1 text-xs text-slate-500">
                                                {getLevelLabel(niveau)}
                                            </p>

                                            <div className="mt-3 flex gap-1.5">
                                                {levels.map((level) => (
                                                    <div
                                                        key={level.value}
                                                        className={`h-1.5 flex-1 rounded-full ${
                                                            level.value <= niveau
                                                                ? 'bg-slate-800'
                                                                : 'bg-slate-200'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex shrink-0 gap-2">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleEdit(index)
                                                }
                                                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                                            >
                                                Modifier
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(index)
                                                }
                                                className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}