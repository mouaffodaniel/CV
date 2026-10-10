import { useState } from 'react';
import { useCv } from '../context/CvContext';

const emptyExperience = {
    poste: '',
    entreprise: '',
    lieu: '',
    date_debut: '',
    date_fin: '',
    poste_actuel: false,
    description: '',
};

export default function ExperienceForm() {
    const { cv, updateCv } = useCv();

    const [form, setForm] = useState(emptyExperience);
    const [editingIndex, setEditingIndex] = useState(null);
    const [errors, setErrors] = useState({});

    const experiences = cv.experiences || [];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (errors[name]) {
            setErrors((previous) => ({
                ...previous,
                [name]: '',
            }));
        }

        if (name === 'poste_actuel' && checked) {
            setForm((previous) => ({
                ...previous,
                date_fin: '',
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!form.poste.trim()) {
            newErrors.poste = 'Le poste est obligatoire.';
        }

        if (!form.entreprise.trim()) {
            newErrors.entreprise = "L'entreprise est obligatoire.";
        }

        if (!form.date_debut) {
            newErrors.date_debut = 'La date de début est obligatoire.';
        }

        if (!form.poste_actuel && !form.date_fin) {
            newErrors.date_fin = 'La date de fin est obligatoire.';
        }

        if (
            form.date_debut &&
            form.date_fin &&
            form.date_fin < form.date_debut
        ) {
            newErrors.date_fin =
                'La date de fin doit être postérieure à la date de début.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const resetForm = () => {
        setForm(emptyExperience);
        setEditingIndex(null);
        setErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        if (editingIndex !== null) {
            const updatedExperiences = [...experiences];

            updatedExperiences[editingIndex] = {
                ...form,
            };

            updateCv('experiences', updatedExperiences);
        } else {
            updateCv('experiences', [
                ...experiences,
                {
                    ...form,
                },
            ]);
        }

        resetForm();
    };

    const handleEdit = (index) => {
        setForm({
            ...experiences[index],
        });

        setEditingIndex(index);

        setErrors({});
    };

    const handleDelete = (index) => {
        const confirmed = window.confirm(
            'Voulez-vous supprimer cette expérience ?'
        );

        if (!confirmed) {
            return;
        }

        const updatedExperiences = experiences.filter(
            (_, experienceIndex) => experienceIndex !== index
        );

        updateCv('experiences', updatedExperiences);

        if (editingIndex === index) {
            resetForm();
        }
    };

    const inputClass = (field) => {
        return `w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
            errors[field]
                ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                : 'border-slate-300 focus:border-slate-900 focus:ring-2 focus:ring-slate-200'
        }`;
    };

    return (
        <div className="space-y-6">
            {experiences.length > 0 && (
                <section>
                    <div className="mb-3 flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-semibold text-slate-900">
                                Expériences ajoutées
                            </h3>

                            <p className="mt-1 text-xs text-slate-500">
                                {experiences.length}{' '}
                                {experiences.length > 1
                                    ? 'expériences'
                                    : 'expérience'}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {experiences.map((experience, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <h4 className="break-words text-sm font-semibold text-slate-900">
                                            {experience.poste}
                                        </h4>

                                        <p className="mt-1 text-xs font-medium text-slate-600">
                                            {experience.entreprise}

                                            {experience.lieu && (
                                                <>
                                                    {' — '}
                                                    {experience.lieu}
                                                </>
                                            )}
                                        </p>

                                        <p className="mt-1 text-xs text-slate-500">
                                            {experience.date_debut}

                                            {experience.poste_actuel
                                                ? ' — Présent'
                                                : experience.date_fin
                                                  ? ` — ${experience.date_fin}`
                                                  : ''}
                                        </p>
                                    </div>

                                    <div className="flex shrink-0 gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleEdit(index)}
                                            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                                        >
                                            Modifier
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleDelete(index)}
                                            className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <section className="border-t border-slate-200 pt-6">
                <div className="mb-5">
                    <h3 className="text-base font-semibold text-slate-900">
                        {editingIndex !== null
                            ? 'Modifier l’expérience'
                            : 'Ajouter une expérience'}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                        Ajoutez vos expériences professionnelles de la plus
                        récente à la plus ancienne.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="poste"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Intitulé du poste
                            <span className="ml-1 text-red-500">*</span>
                        </label>

                        <input
                            id="poste"
                            name="poste"
                            type="text"
                            value={form.poste}
                            onChange={handleChange}
                            placeholder="Ex. Développeur web"
                            className={inputClass('poste')}
                            maxLength={150}
                        />

                        {errors.poste && (
                            <p className="mt-1.5 text-xs text-red-600">
                                {errors.poste}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="entreprise"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Entreprise
                                <span className="ml-1 text-red-500">*</span>
                            </label>

                            <input
                                id="entreprise"
                                name="entreprise"
                                type="text"
                                value={form.entreprise}
                                onChange={handleChange}
                                placeholder="Nom de l'entreprise"
                                className={inputClass('entreprise')}
                                maxLength={150}
                            />

                            {errors.entreprise && (
                                <p className="mt-1.5 text-xs text-red-600">
                                    {errors.entreprise}
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
                                className={inputClass('lieu')}
                                maxLength={150}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="date_debut"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Date de début
                                <span className="ml-1 text-red-500">*</span>
                            </label>

                            <input
                                id="date_debut"
                                name="date_debut"
                                type="month"
                                value={form.date_debut}
                                onChange={handleChange}
                                className={inputClass('date_debut')}
                            />

                            {errors.date_debut && (
                                <p className="mt-1.5 text-xs text-red-600">
                                    {errors.date_debut}
                                </p>
                            )}
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
                                disabled={form.poste_actuel}
                                className={`${inputClass('date_fin')} ${
                                    form.poste_actuel
                                        ? 'cursor-not-allowed bg-slate-100 text-slate-400'
                                        : ''
                                }`}
                            />

                            {errors.date_fin && (
                                <p className="mt-1.5 text-xs text-red-600">
                                    {errors.date_fin}
                                </p>
                            )}
                        </div>
                    </div>

                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <input
                            name="poste_actuel"
                            type="checkbox"
                            checked={form.poste_actuel}
                            onChange={handleChange}
                            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                        />

                        <span>
                            <span className="block text-sm font-medium text-slate-800">
                                J’occupe actuellement ce poste
                            </span>

                            <span className="mt-1 block text-xs text-slate-500">
                                La date de fin sera automatiquement remplacée
                                par « Présent ».
                            </span>
                        </span>
                    </label>

                    <div>
                        <label
                            htmlFor="description"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Missions et réalisations
                        </label>

                        <textarea
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder={
                                'Ex. Conception et développement d’applications web.\nOptimisation des performances.\nMaintenance et correction des erreurs.'
                            }
                            rows={6}
                            maxLength={1500}
                            className={`${inputClass(
                                'description'
                            )} resize-none`}
                        />

                        <p className="mt-1.5 text-right text-xs text-slate-400">
                            {form.description.length}/1500
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-5">
                        {editingIndex !== null && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                Annuler
                            </button>
                        )}

                        <button
                            type="submit"
                            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            {editingIndex !== null
                                ? 'Enregistrer les modifications'
                                : 'Ajouter l’expérience'}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}