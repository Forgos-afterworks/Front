import React, {useEffect, useState} from "react";
import EmployeAPI from "../services/EmployeAPI";
import employeAPI from "../services/EmployeAPI";

const ModifyEmployePage = ({
                               match: {
                                   params: {idEmploye}
                               }, history
                           }) => {

    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [libAdr, setLibAdr] = useState("");
    const [cpAdr, setCpAdr] = useState("");
    const [villeAdr, setVilleAdr] = useState("");
    const [roles, setRoles] = useState([]);
    const [idRole, setIdRole] = useState();
    const [role, setRole] = useState([]);

    const fetchInfos = async () => {
        try {
            const data = await EmployeAPI.getEmployeById(idEmploye);
            setName(data.nom);
            setMail(data.email);
            setFirstName(data.prenom);
            setLibAdr(data.libAdresse);
            setCpAdr(data.cpAdresse);
            setVilleAdr(data.villeAdresse);
            setIdRole(data.idRole.idRole);
            setRole(data.idRole);
        } catch (e) {
            console.log(e);
        }
    }

    const fetchRoles = async () => {
        try {
            const data = await EmployeAPI.getRoles();
            setRoles(data);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchInfos()
        fetchRoles()
    }, [])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await employeAPI.modifyEmploye(name, mail, firstName, libAdr, cpAdr, villeAdr, idRole, idEmploye)
            history.replace("/admin/gestion-employe");
        } catch (e) {
            alert("Données rentrée invalides")
            console.log(e)
        }
    }

    const _roles = roles.filter(roleAlpha => roleAlpha.idRole !== role.idRole).map((role) => (
        <option key={role.idRole} value={role.idRole}>{role.nom}</option>
    ))

    return (
        <div className={"container mt-3"}>
            <h1>Page de Modification de l'employé</h1>
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

                <div>
                    <label htmlFor="role"
                           className="form-label">Choix du role</label>
                    <br/>
                    <select value={idRole} name={"role"} id={"role"} onChange={(e) =>setIdRole(e.target.value)}>
                        <option value={role.idRole}>{role.nom}</option>
                        {_roles}
                    </select>
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

                <button type="submit" className="btn btn-primary">Enregistrer</button>
            </form>
        </div>
    )
}

export default ModifyEmployePage;