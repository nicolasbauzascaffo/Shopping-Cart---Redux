import axios from "axios";

const getAllProducts = async () => {
    try {
        return await axios.get('http://localhost:3000/products')
    } catch (error) {
        console.log(error)
    }
};

export default getAllProducts