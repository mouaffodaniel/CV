
import { useState } from 'react';
import { useCv } from '../context/CvContext';

const initialForm = {
    type: 'Diplôme',
    intitule: '',
    etablissement: '',
    date_obtention: '',
    description: '',
};

const typesInformation = [
    'Diplôme',
    'Certification',
    'Attestation',
    'Permis de conduire',
    'Formation complémentaire',
    'Autre',
];

export default function InformationsComplementairesForm() {
    const { cv, updateCv } = useCv();

    const informations = cv.informationsComplementaires || [];

    const [form, setForm] = useState(initialForm);
    const [editingIndex, setEditingIndex] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError('');
    };

    const resetForm = () => {
        setForm(initialForm);
        setEditingIndex(null);
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.intitule.trim()) {
            setError("Veuillez renseigner l'intitulé.");
            return;
        }

        const nouvelleInformation = {
            ...form,
            intitule: form.intitule.trim(),
            etablissement: form.etablissement.trim(),
            description: form.description.trim(),
        };

        let updatedInformations;

        if (editingIndex !== null) {
            updatedInformations = informations.map((item, index) =>
                index === editingIndex
                    ? nouvelleInformation
                    : item
            );
        } else {
            updatedInformations = [
                ...informations,
                nouvelleInformation,
            ];
        }

        updateCv(
            'informationsComplementaires',
            updatedInformations
        );

        resetForm();
    };

    const handleEdit = (index) => {
        const information = informations[index];

        setForm({
            type: information.type || 'Autre',
            intitule: information.intitule || '',
            etablissement: information.etablissement || '',
            date_obtention: information.date_obtention
                ? information.date_obtention.substring(0, 10)
                : '',
            description: information.description || '',
        });

        setEditingIndex(index);
        setError('');
    };

    const handleDelete = (index) => {
        const updatedInformations = informations.filter(
            (_, currentIndex) => currentIndex !== index
        );

        updateCv(
            'informationsComplementaires',
            updatedInformations
        );

        if (editingIndex === index) {
            resetForm();
        } else if (editingIndex !== null && editingIndex > index) {
            setEditingIndex(editingIndex - 1);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-slate-800">
                    Informations complémentaires
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Ajoutez vos diplômes, certifications, attestations
                    et autres informations utiles à votre CV.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
                <div>
                    <label
                        htmlFor="type"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        Type d'information
                    </label>

                    <select
                        id="type"
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    >
                        {typesInformation.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="intitule"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        Intitulé
                        <span className="text-red-500"> *</span>
                    </label>

                    <input
                        id="intitule"
                        name="intitule"
                        type="text"
                        value={form.intitule}
                        onChange={handleChange}
                        placeholder="Ex. : Certification HTML/CSS"
                        maxLength={255}
                        required
                        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                <div>
                    <label
                        htmlFor="etablissement"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        Établissement ou organisme
                    </label>

                    <input
                        id="etablissement"
                        name="etablissement"
                        type="text"
                        value={form.etablissement}
                        onChange={handleChange}
                        placeholder="Ex. : OpenClassrooms"
                        maxLength={255}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                <div>
                    <label
                        htmlFor="date_obtention"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        Date d'obtention
                    </label>

                    <input
                        id="date_obtention"
                        name="date_obtention"
                        type="date"
                        value={form.date_obtention}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        Description
                    </label>

                    <textarea
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Précisez les compétences acquises ou les détails utiles..."
                        rows={4}
                        className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                {error && (
                    <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                        {error}
                    </p>
                )}

                <div className="flex flex-wrap gap-3">
                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        {editingIndex !== null
                            ? 'Enregistrer les modifications'
                            : 'Ajouter cette information'}
                    </button>

                    {editingIndex !== null && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                        >
                            Annuler
                        </button>
                    )}
                </div>
            </form>

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-800">
                        Informations enregistrées
                    </h3>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        {informations.length}
                    </span>
                </div>

                {informations.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                        <p className="text-sm text-slate-500">
                            Aucune information complémentaire ajoutée.
                        </p>
                    </div>
                ) : (
                    informations.map((information, index) => (
                        <div
                            key={information.id ?? index}
                            className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-start sm:justify-between"
                        >
                            <div className="min-w-0">
                                <span className="mb-1 inline-block rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                                    {information.type}
                                </span>

                                <h4 className="break-words font-semibold text-slate-800">
                                    {information.intitule}
                                </h4>

                                {information.etablissement && (
                                    <p className="mt-1 text-sm text-slate-600">
                                        {information.etablissement}
                                    </p>
                                )}

                                {information.date_obtention && (
                                    <p className="mt-1 text-xs text-slate-500">
                                        Obtenu le :{' '}
                                        {information.date_obtention.substring(0, 10)}
                                    </p>
                                )}

                                {information.description && (
                                    <p className="mt-2 whitespace-pre-line text-sm text-slate-600">
                                        {information.description}
                                    </p>
                                )}
                            </div>

                            <div className="flex shrink-0 gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleEdit(index)}
                                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                                >
                                    Modifier
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleDelete(index)}
                                    className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}