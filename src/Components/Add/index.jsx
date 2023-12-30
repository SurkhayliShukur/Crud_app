import React, { useState } from 'react'
import Input from 'antd/es/input/Input'
import { AddUsers } from '../../Api/apiRequest'
import { useMutation } from 'react-query'
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
      toast.error("Error adding user", {
        autoClose: 1000,
      })
    }
  })
  const isFormValid = () => {
    return Object.values(newUser).every((value) => value !== "");
  };

  const handleAddUser = async () => {

    if(!isFormValid(newUser.email)){
      toast.error("required email",{
        autoClose:1000,
      })
      return;
    }
    if(!isFormValid(newUser.phone)){
      toast.error("required phone",{
        autoClose:1000,
      })
      return;
    }
    const createDate = moment().valueOf()
    const userCreateDate = {...newUser , create_at: createDate}

    mutation.mutate(userCreateDate)
    
  }



  const [newUser, setNewUser] = useState([])

  return (
    <>
      <div className='text-center p-5 m-5'>
        <h1>Add User</h1>
        <div className='p-2'>
          <Input
            name='fullName'
            placeholder='enter fullName'
            style={{
              width: '50%',
              borderRadius: "10px"
            }}
          />
        </div>
        <div className='p-2'>
          <Input
            name='email'
            placeholder='enter email'
            style={{
              width: '50%',
              borderRadius: "10px"
            }}
          />
        </div>

      </div>
    </>
  )
}

export default Add