// import { useState } from 'react';
// import { useCv } from '../context/CvContext';

// const emptyFormation = {
//     diplome: '',
//     etablissement: '',
//     lieu: '',
//     date_debut: '',
//     date_fin: '',
//     description: '',
// };

// export default function FormationForm() {
//     const { cv, updateCv } = useCv();

//     const [form, setForm] = useState(emptyFormation);
//     const [editingIndex, setEditingIndex] = useState(null);

//     const formations = cv.formations || [];

//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         setForm((previous) => ({
//             ...previous,
//             [name]: value,
//         }));
//     };

//     const resetForm = () => {
//         setForm(emptyFormation);
//         setEditingIndex(null);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (!form.diplome || !form.etablissement) {
//             return;
//         }

//         const updated = [...formations];

//         if (editingIndex === null) {
//             updated.push(form);
//         } else {
//             updated[editingIndex] = form;
//         }

//         updateCv('formations', updated);
//         resetForm();
//     };

//     const handleEdit = (index) => {
//         setForm({ ...formations[index] });
//         setEditingIndex(index);
//     };

//     const handleDelete = (index) => {
//         updateCv(
//             'formations',
//             formations.filter((_, itemIndex) => itemIndex !== index)
//         );

//         if (editingIndex === index) {
//             resetForm();
//         }
//     };

//     return (
//         <div className="space-y-6">
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <label className="mb-2 block text-sm font-medium text-slate-700">
//                         Diplôme / Formation
//                     </label>

//                     <input
//                         type="text"
//                         name="diplome"
//                         value={form.diplome}
//                         onChange={handleChange}
//                         placeholder="Licence en Informatique"
//                         className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
//                     />
//                 </div>

//                 <div>
//                     <label className="mb-2 block text-sm font-medium text-slate-700">
//                         Établissement
//                     </label>

//                     <input
//                         type="text"
//                         name="etablissement"
//                         value={form.etablissement}
//                         onChange={handleChange}
//                         placeholder="Université de Douala"
//                         className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
//                     />
//                 </div>

//                 <div>
//                     <label className="mb-2 block text-sm font-medium text-slate-700">
//                         Lieu
//                     </label>

//                     <input
//                         type="text"
//                         name="lieu"
//                         value={form.lieu}
//                         onChange={handleChange}
//                         placeholder="Douala, Cameroun"
//                         className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
//                     />
//                 </div>

//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                     <div>
//                         <label className="mb-2 block text-sm font-medium text-slate-700">
//                             Date de début
//                         </label>

//                         <input
//                             type="month"
//                             name="date_debut"
//                             value={form.date_debut}
//                             onChange={handleChange}
//                             className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
//                         />
//                     </div>

//                     <div>
//                         <label className="mb-2 block text-sm font-medium text-slate-700">
//                             Date de fin
//                         </label>

//                         <input
//                             type="month"
//                             name="date_fin"
//                             value={form.date_fin}
//                             onChange={handleChange}
//                             className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
//                         />
//                     </div>
//                 </div>

//                 <div>
//                     <label className="mb-2 block text-sm font-medium text-slate-700">
//                         Description
//                     </label>

//                     <textarea
//                         name="description"
//                         value={form.description}
//                         onChange={handleChange}
//                         rows={4}
//                         placeholder="Informations complémentaires..."
//                         className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
//                     />
//                 </div>

//                 <div className="flex gap-3">
//                     <button
//                         type="submit"
//                         className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
//                     >
//                         {editingIndex === null ? 'Ajouter' : 'Modifier'}
//                     </button>

//                     {editingIndex !== null && (
//                         <button
//                             type="button"
//                             onClick={resetForm}
//                             className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//                         >
//                             Annuler
//                         </button>
//                     )}
//                 </div>
//             </form>

//             {formations.length > 0 && (
//                 <div className="space-y-3 border-t border-slate-200 pt-5">
//                     {formations.map((formation, index) => (
//                         <div
//                             key={index}
//                             className="rounded-xl border border-slate-200 p-4"
//                         >
//                             <div className="flex justify-between gap-4">
//                                 <div>
//                                     <h3 className="font-semibold text-slate-900">
//                                         {formation.diplome}
//                                     </h3>

//                                     <p className="text-sm text-slate-600">
//                                         {formation.etablissement}
//                                     </p>
//                                 </div>

//                                 <div className="flex gap-2">
//                                     <button
//                                         type="button"
//                                         onClick={() => handleEdit(index)}
//                                         className="text-xs font-medium text-slate-700 hover:underline"
//                                     >
//                                         Modifier
//                                     </button>

//                                     <button
//                                         type="button"
//                                         onClick={() => handleDelete(index)}
//                                         className="text-xs font-medium text-red-600 hover:underline"
//                                     >
//                                         Supprimer
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }

import { useState } from 'react';
import { useCv } from '../context/CvContext';

const emptyFormation = {
    diplome: '',
    etablissement: '',
    lieu: '',
    date_debut: '',
    date_fin: '',
    description: '',
};

export default function FormationForm() {
    const { cv, updateCv } = useCv();

    const formations = cv.formations || [];

    const [form, setForm] = useState(emptyFormation);
    const [editingIndex, setEditingIndex] = useState(null);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: '',
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!form.diplome.trim()) {
            newErrors.diplome = 'Le diplôme est obligatoire.';
        }

        if (!form.etablissement.trim()) {
            newErrors.etablissement =
                "L'établissement est obligatoire.";
        }

        if (form.date_debut && form.date_fin) {
            if (form.date_fin < form.date_debut) {
                newErrors.date_fin =
                    'La date de fin doit être postérieure à la date de début.';
            }
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
            const updatedFormations = [...formations];

            updatedFormations[editingIndex] = {
                ...form,
            };

            updateCv('formations', updatedFormations);
        } else {
            updateCv('formations', [
                ...formations,
                {
                    ...form,
                },
            ]);
        }

        resetForm();
    };

    const handleEdit = (index) => {
        setForm({
            ...formations[index],
        });

        setEditingIndex(index);
        setErrors({});
    };

    const handleDelete = (index) => {
        const confirmed = window.confirm(
            'Voulez-vous vraiment supprimer cette formation ?'
        );

        if (!confirmed) {
            return;
        }

        const updatedFormations = formations.filter(
            (_, formationIndex) => formationIndex !== index
        );

        updateCv('formations', updatedFormations);

        if (editingIndex === index) {
            resetForm();
        }
    };

    const resetForm = () => {
        setForm(emptyFormation);
        setEditingIndex(null);
        setErrors({});
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-base font-semibold text-slate-900">
                    {editingIndex !== null
                        ? 'Modifier la formation'
                        : 'Ajouter une formation'}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    Ajoutez vos diplômes, formations et parcours académiques.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label
                        htmlFor="diplome"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Diplôme ou formation
                    </label>

                    <input
                        id="diplome"
                        name="diplome"
                        type="text"
                        value={form.diplome}
                        onChange={handleChange}
                        placeholder="Ex. Licence en Informatique"
                        className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
                            errors.diplome
                                ? 'border-red-400 focus:border-red-500'
                                : 'border-slate-300 focus:border-slate-800'
                        }`}
                    />

                    {errors.diplome && (
                        <p className="mt-1 text-xs text-red-600">
                            {errors.diplome}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="etablissement"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Établissement
                    </label>

                    <input
                        id="etablissement"
                        name="etablissement"
                        type="text"
                        value={form.etablissement}
                        onChange={handleChange}
                        placeholder="Ex. Université de Douala"
                        className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
                            errors.etablissement
                                ? 'border-red-400 focus:border-red-500'
                                : 'border-slate-300 focus:border-slate-800'
                        }`}
                    />

                    {errors.etablissement && (
                        <p className="mt-1 text-xs text-red-600">
                            {errors.etablissement}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="lieu"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Lieu
                    </label>

                    <input
                        id="lieu"
                        name="lieu"
                        type="text"
                        value={form.lieu}
                        onChange={handleChange}
                        placeholder="Ex. Douala, Cameroun"
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-800"
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="date_debut"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Date de début
                        </label>

                        <input
                            id="date_debut"
                            name="date_debut"
                            type="month"
                            value={form.date_debut}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-800"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="date_fin"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Date de fin
                        </label>

                        <input
                            id="date_fin"
                            name="date_fin"
                            type="month"
                            value={form.date_fin}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
                                errors.date_fin
                                    ? 'border-red-400 focus:border-red-500'
                                    : 'border-slate-300 focus:border-slate-800'
                            }`}
                        />

                        {errors.date_fin && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.date_fin}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Description
                    </label>

                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Décrivez brièvement votre formation, spécialisation, projets ou matières importantes."
                        className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-800"
                    />

                    <p className="mt-1 text-xs text-slate-400">
                        Facultatif
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button
                        type="submit"
                        className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        {editingIndex !== null
                            ? 'Mettre à jour'
                            : 'Ajouter la formation'}
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

            {formations.length > 0 && (
                <div className="border-t border-slate-200 pt-5">
                    <div className="mb-4">
                        <h3 className="text-sm font-semibold text-slate-900">
                            Formations ajoutées
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                            {formations.length}{' '}
                            {formations.length > 1
                                ? 'formations'
                                : 'formation'}
                        </p>
                    </div>

                    <div className="space-y-3">
                        {formations.map((formation, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                            >
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="min-w-0">
                                        <h4 className="break-words text-sm font-semibold text-slate-900">
                                            {formation.diplome}
                                        </h4>

                                        <p className="mt-1 break-words text-sm text-slate-600">
                                            {formation.etablissement}
                                        </p>

                                        <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-xs text-slate-500">
                                            {formation.lieu && (
                                                <span>
                                                    {formation.lieu}
                                                </span>
                                            )}

                                            {formation.date_debut && (
                                                <span>
                                                    {formation.date_debut}
                                                </span>
                                            )}

                                            {formation.date_fin && (
                                                <span>
                                                    {formation.date_fin}
                                                </span>
                                            )}
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
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}