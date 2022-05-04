import axios from "../config/axios";

const getEmployees = () => {
    return axios.get("/employes")
        .then(response => response.data);
}

const getEmployeById = (idEmploye) => {
    return axios.get("/employes/" + idEmploye)
        .then(response => response.data);
}

const modifyEmploye = (nom, email, prenom, libAdresse, cpAdresse, villeAdresse, idRole, idEmploye) => {
    return axios.put("/employes/" + idEmploye,
        {"nom": nom, "email": email, "prenom": prenom, "libAdresse": libAdresse, "cpAdresse": cpAdresse,
        "villeAdresse": villeAdresse, "idRole": idRole})
        .then(response => response.data)
}

const getRoles = () => {
    return axios.get("/roles")
        .then(response => response.data)
}

export default { getEmployees,getEmployeById, modifyEmploye, getRoles }