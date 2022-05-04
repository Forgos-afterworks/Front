import React, {useEffect, useState} from "react";
import ArticleApi from "../services/ArticleApi";

const ModifyRubricPage = ({
                              match: {
                                  params: {idRubric}
                              }, history
                          }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const fetchInfos = async () => {
        try {
            const data = await ArticleApi.getRubriqueById(idRubric);
            setTitle(data.titre)
            setDescription(data.description)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchInfos()
    }, [])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await ArticleApi.modifyRubrique(title, description, idRubric);
            history.replace("/admin/rubrique");
        } catch (e) {
            alert("Données rentrée invalides")
            console.log(e)
        }
    }

    return (
        <div className={"container mt-3"}>
            <h3>Modification d'une rubrique</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="titleRubric"
                           className="form-label">Titre de la rubrique</label>
                    <input type="text"
                           className="form-control"
                           id="titleRubric"
                           value={title}
                           onChange={e => setTitle(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="descriptionRubrique"
                           className="form-label">Description de la rubrique</label>
                    <input type="text"
                           className="form-control"
                           id="descriptionRubrique"
                           value={description}
                           onChange={e => setDescription(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Enregistrer</button>
            </form>
        </div>
    )
}

export default ModifyRubricPage;