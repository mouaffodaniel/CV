import { useCv } from '../context/CvContext';

export default function ProfileForm() {
    const { cv, updateCv } = useCv();

    return (
        <div className="space-y-5">
            <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                    Profil professionnel
                </label>

                <textarea
                    value={cv.profil_professionnel}
                    onChange={(e) =>
                        updateCv('profil_professionnel', e.target.value)
                    }
                    rows={8}
                    placeholder="Présentez votre parcours, vos compétences principales, vos objectifs et votre valeur ajoutée..."
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />

                <p className="mt-2 text-xs text-slate-500">
                    Un résumé de 4 à 6 lignes est généralement recommandé.
                </p>
            </div>
        </div>
    );
}