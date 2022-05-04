import axios from "../config/axios";

const getCategoriesWithProduct = () => {
    return axios.get("/categories/withProduct")
        .then(response => response.data);
}

export default {getCategoriesWithProduct}