import React, { useState } from 'react'
import Input from 'antd/es/input/Input'
import { AddUsers } from '../../Api/apiRequest'
import { useMutation } from 'react-query'
import {isValidEmail,isValidPhone} from "../../utils/ValidRegex"
import { toast } from "react-toastify"
import moment from 'moment'

const Add = () => {

  const initialState = {
    fullName: "",
    email: "",
    age: 0,
    phone: ""
  }

  const mutation = useMutation({
    mutationFn: AddUsers,
    onSuccess: () => {
      setNewUser(initialState);
      toast.success("Added successfully!", {
        autoClose: 1000,
      })
    },

    onError: (error) => {
      console.error("Error adding user:", error.message);
      toast.error("Error adding user", {
        autoClose: 1000,
      })
    }
  })
  const isFormValid = () => {
    return Object.values(newUser).every((value) => value !== "");
  };

  const handleAddUser = async () => {

    if (!isValidEmail(newUser.email)) {
      toast.error("required email", {
        autoClose: 1000,
      })
      return;
    }
    if (!isValidPhone(newUser.phone)) {
      toast.error("required phone", {
        autoClose: 1000,
      })
      return;
    }
    const createDate = moment().valueOf()
    const userCreateDate = { ...newUser, create_at: createDate }

    mutation.mutate(userCreateDate)

  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    })
  }



  const [newUser, setNewUser] = useState([])

  return (
    <>
      <div className='flex flex-col items-center p-5 m-5'>
        <h1 className='text-3xl'>Add User</h1>

        <Input
          name='fullName'
          type='text'
          onChange={handleInput}
          value={newUser.fullName}
          placeholder='enter fullName'
          style={{
            width: '50%',
            borderRadius: "7px"
          }}
          className='m-2'
        />
        <Input
          name='email'
          type='email'
          onChange={handleInput}
          value={newUser.email}
          placeholder='enter email'
          style={{
            width: '50%',
            borderRadius: "7px"
          }}
        />
        <Input
          name='age'
          type='number'
          onChange={handleInput}
          value={newUser.age}
          placeholder='enter age'
          style={{
            width: '50%',
            borderRadius: "7px"
          }}
          className='m-2'
        />
        <Input
          name='phone'
          type='text'
          onChange={handleInput}
          value={newUser.phone}
          placeholder='enter phone'
          style={{
            width: '50%',
            borderRadius: "7px"
          }}
        />
        <button className="bg-cyan-500 hover:bg-cyan-600 w-1/2 rounded p-2 m-2 text-white text-l"
          onClick={handleAddUser}
          disabled={!isFormValid()}
        >
          {mutation.isLoading ? "Adding User..." : "Add User"}
        </button>

      </div>
    </>
  )
}

export default Add