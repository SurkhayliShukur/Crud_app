import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:3005/users"
  // baseURL: "https://blog-api-t6u0.onrender.com/posts"
})


export const GetUsers = async () => {
  try {
    const response = await Api.get("/");
    if (response.status !== 200) {
      throw new Error("Error");
    } else {
      // const filteredata = response.data.filter((user) => user.id > 100);
      // return filteredata;

      return response.data
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const GetSingleUsers = async (userId) => {
  try {
    const response = await Api.get(`/${userId}`)
    if (response.status !== 200) {
      throw new Error("Error");
    }
    else {
      return response.data
    }
  }
  catch (error) {
    console.log(error.message);
    throw error;
  }
}
export const EditUsers = async (userId, editedData) => {
  try {
    const request = await Api.put(`/${userId}`, editedData);
    if (request.status !== 200) {
      throw new Error("Error");
    } else {
      return request.data;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

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

export const DeleteUsers = async (userId) => {
  try {
    const response = Api.delete(`/${userId}`)
    if(response.status === 200){
      throw new Error("Error")
    }
    else{
      return response.data
    }
  } 
  catch (error) {
    console.log(error.message)
    throw error
  }

}