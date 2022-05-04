import React, {useEffect, useState} from "react";
import EmployeAPI from "../services/EmployeAPI";
import employeAPI from "../services/EmployeAPI";

const CreateRedacteurPage = (history) => {
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [libAdr, setLibAdr] = useState("");
    const [cpAdr, setCpAdr] = useState("");
    const [villeAdr, setVilleAdr] = useState("");

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await employeAPI.modifyEmploye(name, mail, firstName, libAdr, cpAdr, villeAdr)
            history.replace("/admin/gestion-employe");
        } catch (e) {
            alert("Données rentrée invalides")
            console.log(e)
        }
    }

    return (
        <div className={"container mt-3"}>
            <h1>Page de création d'un employé</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstNameEmploye"
                           className="form-label">Prénom</label>
                    <input type="text"
                           className="form-control"
                           id="firstNameEmploye"
                           value={firstName}
                           onChange={e => setFirstName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="nameEmploye"
                           className="form-label">Nom</label>
                    <input type="text"
                           className="form-control"
                           id="nameEmploye"
                           value={name}
                           onChange={e => setName(e.target.value)}/>
                </div>


                <div className="mb-3 mt-3">
                    <label htmlFor="mailEmploye"
                           className="form-label">E-mail</label>
                    <input type="text"
                           className="form-control"
                           id="mailEmploye"
                           value={mail}
                           onChange={e => setMail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="libAdrEmploye"
                           className="form-label">Rue</label>
                    <input type="text"
                           className="form-control"
                           id="libAdrEmploye"
                           value={libAdr}
                           onChange={e => setLibAdr(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="villeEmploye"
                           className="form-label">Ville</label>
                    <input type="text"
                           className="form-control"
                           id="villeEmploye"
                           value={villeAdr}
                           onChange={e => setVilleAdr(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpAdrEmploye"
                           className="form-label">Code postal</label>
                    <input type="text"
                           className="form-control"
                           id="cpAdrEmploye"
                           value={cpAdr}
                           onChange={e => setCpAdr(e.target.value)}/>
                </div>

                <button type="submit" className="btn btn-primary">Créer</button>
            </form>
        </div>
    )
}

export default CreateRedacteurPage;