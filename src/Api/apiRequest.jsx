import axios from "axios";

const Api = axios.create({
    // baseURL: "http://localhost:3005/users"
    baseURL: "https://blog-api-t6u0.onrender.com/posts"
})


export const AddUsers = async (newUser) => {
    try {
        const response = await Api.post("/", newUser)
        if (response.status !== 201) {
            throw new Error("Error")
        }
        else {
            return response.data
        }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}