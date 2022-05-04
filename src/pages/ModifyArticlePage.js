import React, {useEffect, useState} from "react";
import ArticleApi from "../services/ArticleApi";

const ModifyArticlePage = (({
                                match: {
                                    params: {idArticle}
                                }
                            }, history) => {

    const [rubriques, setRubriques] = useState([]);
    const [rubrique, setRubrique] = useState([])
    const [article, setArticle] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [etatAddRubric, setEtatAddRubric] = useState();
    const [addRubric, setAddRubric] = useState();

    const fetchRubrique = async () => {
        try {
            const data = await ArticleApi.getRubriques();
            setRubriques(data);
        } catch (e) {
            console.log(e);
        }
    }

    const fetchArticle = async () => {
        try {
            const data = await ArticleApi.getArticleById(idArticle);
            setArticle(data);
            setRubrique(data["idRubrique"])
            setTitle(data["titre"])
            setContent(data["contenue"])
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchRubrique()
        fetchArticle()
    }, [])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await ArticleApi.createArticle(title, content, rubrique);
            history.replace("/admin/rubrique");
        } catch (e) {
            alert("Données rentrée invalides")
            console.log(e)
        }
    }

    const handleNewRubric = async (e) =>{
        try {
            e.preventDefault();
            await ArticleApi.createRubrique(addRubric);
            await fetchRubrique()
        } catch (e) {
            alert("Données rentrée invalides")
            console.log(e)
        }
    }

    const _rubriques = rubriques.map((rubrique) => (
        <option key={rubrique["idRubrique"]} value={rubrique["idRubrique"]}>{rubrique["titre"]}</option>
    ))

    return (
        <div className={"container mt-3"}>
            <h3><u>Rédaction d'un article</u></h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="rubrique"
                           className="form-label">Rubrique</label>


                    {
                        etatAddRubric && (
                            <>
                                <button className="btn btn-primary" onClick={(e) => {
                                    e.preventDefault();
                                    setEtatAddRubric(0)
                                }}>
                                    -
                                </button>

                                <input type="text"
                                       className="form-control"
                                       id="titleRubric"
                                       value={addRubric}
                                       onChange={e => setAddRubric(e.target.value)}/>

                                <button className="btn btn-primary" onClick={handleNewRubric}>
                                    Créer la nouvelle rubrique
                                </button>
                            </>

                        ) || (
                            <>
                                <select value={rubrique.idRubrique} name={"rubrique"} id={"rubrique"} onChange={(e) =>setRubrique(e.target.value)}>
                                    <option value={rubrique.idRubrique}>{rubrique.titre}</option>
                                    {_rubriques}
                                </select>

                                <button className="btn btn-primary" onClick={(e) => {
                                    e.preventDefault();
                                    setEtatAddRubric(1)
                                }}>
                                    +
                                </button>
                            </>

                        )
                    }


                </div>
                <div className="mb-3">
                    <label htmlFor="titleArticle"
                           className="form-label">Titre de l'article</label>
                    <input type="text"
                           className="form-control"
                           id="titleArticle"
                           value={title}
                           onChange={e => setTitle(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="contentArticle"
                           className="form-label">Contenue de l'article</label>
                    <input type="text"
                           className="form-control"
                           id="contentArticle"
                           value={content}
                           onChange={e => setContent(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Enregistrer</button>
            </form>
        </div>
    )
})

export default ModifyArticlePage;