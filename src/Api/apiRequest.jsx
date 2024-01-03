import axios from "axios";

const Api = axios.create({
    // baseURL: "http://localhost:3005/users"
    baseURL: "https://blog-api-t6u0.onrender.com/posts"
})


export const GetUsers = async () => {
    try {
        const response = Api.get("/")
        if (response.status !== 200) {
            throw new Error
        }
        else {
            const filterData = (await response).data.filter((user) => user.id > 100)
            return filterData
        }
    }
    catch (err) {
        console.log(err)
        throw err
    }
}


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