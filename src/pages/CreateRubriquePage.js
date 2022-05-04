import React, {useEffect, useState} from "react";
import ArticleApi from "../services/ArticleApi";

const CreateRubriquePage = ({history}) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await ArticleApi.createRubrique(title, description);
            history.replace("/admin/rubrique");
        } catch (e) {
            alert("Données rentrée invalides")
            console.log(e)
        }
    }

    return (
        <div className={"container mt-3"}>
            <h3><u>Rédaction d'une rubrique</u></h3>
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
                    <label htmlFor="descriptionRubric"
                           className="form-label">Description de la rubrique</label>
                    <input type="text"
                           className="form-control"
                           id="descriptionRubric"
                           value={description}
                           onChange={e => setDescription(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Créer la rubrique</button>
            </form>
        </div>
    )
}

export default CreateRubriquePage;