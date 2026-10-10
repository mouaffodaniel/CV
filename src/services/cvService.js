import api from './api';

function appendIfDefined(formData, key, value) {
    if (value !== undefined && value !== null) {
        formData.append(key, value);
    }
}

export async function createCv(cv) {
    const formData = new FormData();

    appendIfDefined(formData, 'titre_poste', cv.titre_poste);
    appendIfDefined(formData, 'nom', cv.nom);
    appendIfDefined(formData, 'prenom', cv.prenom);
    appendIfDefined(formData, 'telephone', cv.telephone);
    appendIfDefined(formData, 'email', cv.email);
    appendIfDefined(formData, 'adresse', cv.adresse);
    appendIfDefined(formData, 'linkedin', cv.linkedin);
    appendIfDefined(formData, 'github', cv.github);
    appendIfDefined(formData, 'portfolio', cv.portfolio);
    appendIfDefined(
        formData,
        'profil_professionnel',
        cv.profil_professionnel
    );

    if (cv.photo?.file instanceof File) {
        formData.append('photo', cv.photo.file);
    }

    const response = await api.post('/cvs', formData);

    return response.data;
}

export async function getCvs() {
    const response = await api.get('/cvs');

    return response.data;
}

export async function getCvById(id) {
    const response = await api.get(`/cvs/${id}`);

    return response.data;
}

export async function updateCv(id, cv) {
    const formData = new FormData();

    appendIfDefined(formData, 'titre_poste', cv.titre_poste);
    appendIfDefined(formData, 'nom', cv.nom);
    appendIfDefined(formData, 'prenom', cv.prenom);
    appendIfDefined(formData, 'telephone', cv.telephone);
    appendIfDefined(formData, 'email', cv.email);
    appendIfDefined(formData, 'adresse', cv.adresse);
    appendIfDefined(formData, 'linkedin', cv.linkedin);
    appendIfDefined(formData, 'github', cv.github);
    appendIfDefined(formData, 'portfolio', cv.portfolio);
    appendIfDefined(
        formData,
        'profil_professionnel',
        cv.profil_professionnel
    );

    if (cv.photo?.file instanceof File) {
        formData.append('photo', cv.photo.file);
    }

    formData.append('_method', 'PUT');

    const response = await api.post(`/cvs/${id}`, formData);

    return response.data;
}

export async function deleteCv(id) {
    const response = await api.delete(`/cvs/${id}`);

    return response.data;
}

export async function createExperience(cvId, experience) {
    const response = await api.post(
        `/cvs/${cvId}/experiences`,
        {
            poste: experience.poste,
            entreprise: experience.entreprise,
            lieu: experience.lieu || null,
            date_debut: experience.date_debut || null,
            date_fin: experience.poste_actuel
                ? null
                : experience.date_fin || null,
            poste_actuel: Boolean(experience.poste_actuel),
            description: experience.description || null,
        }
    );

    return response.data;
}

export async function updateExperience(
    cvId,
    experienceId,
    experience
) {
    const response = await api.put(
        `/cvs/${cvId}/experiences/${experienceId}`,
        {
            poste: experience.poste,
            entreprise: experience.entreprise,
            lieu: experience.lieu || null,
            date_debut: experience.date_debut || null,
            date_fin: experience.poste_actuel
                ? null
                : experience.date_fin || null,
            poste_actuel: Boolean(experience.poste_actuel),
            description: experience.description || null,
        }
    );

    return response.data;
}

export async function deleteExperience(cvId, experienceId) {
    const response = await api.delete(
        `/cvs/${cvId}/experiences/${experienceId}`
    );

    return response.data;
}

export async function createFormation(cvId, formation) {
    const response = await api.post(
        `/cvs/${cvId}/formations`,
        {
            diplome: formation.diplome,
            etablissement: formation.etablissement,
            lieu: formation.lieu || null,
            date_debut: formation.date_debut || null,
            date_fin: formation.date_fin || null,
            description: formation.description || null,
        }
    );

    return response.data;
}

export async function updateFormation(
    cvId,
    formationId,
    formation
) {
    const response = await api.put(
        `/cvs/${cvId}/formations/${formationId}`,
        {
            diplome: formation.diplome,
            etablissement: formation.etablissement,
            lieu: formation.lieu || null,
            date_debut: formation.date_debut || null,
            date_fin: formation.date_fin || null,
            description: formation.description || null,
        }
    );

    return response.data;
}

export async function deleteFormation(cvId, formationId) {
    const response = await api.delete(
        `/cvs/${cvId}/formations/${formationId}`
    );

    return response.data;
}

export async function createInformationComplementaire(cvId, information) {
    const response = await api.post(
        `/cvs/${cvId}/informations-complementaires`,
        {
            type: information.type,
            intitule: information.intitule,
            etablissement: information.etablissement || null,
            date_obtention: information.date_obtention || null,
            description: information.description || null,
        }
    );

    return response.data;
}

export async function updateInformationComplementaire(
    cvId,
    informationId,
    information
) {
    const response = await api.put(
        `/cvs/${cvId}/informations-complementaires/${informationId}`,
        {
            type: information.type,
            intitule: information.intitule,
            etablissement: information.etablissement || null,
            date_obtention: information.date_obtention || null,
            description: information.description || null,
        }
    );

    return response.data;
}

export async function deleteInformationComplementaire(
    cvId,
    informationId
) {
    const response = await api.delete(
        `/cvs/${cvId}/informations-complementaires/${informationId}`
    );

    return response.data;
}

export async function createCompetence(cvId, competence) {
    const response = await api.post(
        `/cvs/${cvId}/competences`,
        {
            nom: competence.nom,
            niveau: Number(competence.niveau) || 1,
        }
    );

    return response.data;
}

export async function updateCompetence(
    cvId,
    competenceId,
    competence
) {
    const response = await api.put(
        `/cvs/${cvId}/competences/${competenceId}`,
        {
            nom: competence.nom,
            niveau: Number(competence.niveau) || 1,
        }
    );

    return response.data;
}

export async function deleteCompetence(cvId, competenceId) {
    const response = await api.delete(
        `/cvs/${cvId}/competences/${competenceId}`
    );

    return response.data;
}

export async function createSavoirFaire(cvId, savoirFaire) {
    const response = await api.post(
        `/cvs/${cvId}/savoir-faires`,
        {
            nom: savoirFaire.nom,
            niveau: Number(savoirFaire.niveau) || 1,
        }
    );

    return response.data;
}

export async function updateSavoirFaire(
    cvId,
    savoirFaireId,
    savoirFaire
) {
    const response = await api.put(
        `/cvs/${cvId}/savoir-faires/${savoirFaireId}`,
        {
            nom: savoirFaire.nom,
            niveau: Number(savoirFaire.niveau) || 1,
        }
    );

    return response.data;
}

export async function deleteSavoirFaire(
    cvId,
    savoirFaireId
) {
    const response = await api.delete(
        `/cvs/${cvId}/savoir-faires/${savoirFaireId}`
    );

    return response.data;
}

export async function createLogiciel(cvId, logiciel) {
    const response = await api.post(
        `/cvs/${cvId}/logiciels`,
        {
            nom: logiciel.nom,
            niveau: Number(logiciel.niveau) || 1,
        }
    );

    return response.data;
}

export async function updateLogiciel(
    cvId,
    logicielId,
    logiciel
) {
    const response = await api.put(
        `/cvs/${cvId}/logiciels/${logicielId}`,
        {
            nom: logiciel.nom,
            niveau: Number(logiciel.niveau) || 1,
        }
    );

    return response.data;
}

export async function deleteLogiciel(cvId, logicielId) {
    const response = await api.delete(
        `/cvs/${cvId}/logiciels/${logicielId}`
    );

    return response.data;
}

export async function createLangue(cvId, langue) {
    const response = await api.post(
        `/cvs/${cvId}/langues`,
        {
            nom: langue.nom,
            niveau: langue.niveau,
        }
    );

    return response.data;
}

export async function updateLangue(
    cvId,
    langueId,
    langue
) {
    const response = await api.put(
        `/cvs/${cvId}/langues/${langueId}`,
        {
            nom: langue.nom,
            niveau: langue.niveau,
        }
    );

    return response.data;
}

export async function deleteLangue(cvId, langueId) {
    const response = await api.delete(
        `/cvs/${cvId}/langues/${langueId}`
    );

    return response.data;
}

export async function createInteret(cvId, interet) {
    const response = await api.post(
        `/cvs/${cvId}/interets`,
        {
            nom: interet.nom,
        }
    );

    return response.data;
}

export async function updateInteret(
    cvId,
    interetId,
    interet
) {
    const response = await api.put(
        `/cvs/${cvId}/interets/${interetId}`,
        {
            nom: interet.nom,
        }
    );

    return response.data;
}

export async function deleteInteret(cvId, interetId) {
    const response = await api.delete(
        `/cvs/${cvId}/interets/${interetId}`
    );

    return response.data;
}

export async function saveCv(cv) {
    const cvResponse = await createCv(cv);

    const createdCv = cvResponse.data || cvResponse;
    const cvId = createdCv.id;

    if (!cvId) {
        throw new Error('Le CV créé ne possède pas d’identifiant.');
    }

    for (const experience of cv.experiences || []) {
        await createExperience(cvId, experience);
    }

    for (const formation of cv.formations || []) {
        await createFormation(cvId, formation);
    }

    for (const information of cv.informationsComplementaires || []) {
    await createInformationComplementaire(cvId, information);
}

    for (const competence of cv.competences || []) {
        await createCompetence(cvId, competence);
    }

    for (const savoirFaire of cv.savoirFaires || []) {
        await createSavoirFaire(cvId, savoirFaire);
    }

    for (const logiciel of cv.logiciels || []) {
        await createLogiciel(cvId, logiciel);
    }

    for (const langue of cv.langues || []) {
        await createLangue(cvId, langue);
    }

    for (const interet of cv.interets || []) {
        await createInteret(cvId, interet);
    }

    const finalResponse = await getCvById(cvId);

    return finalResponse.data || finalResponse;
}