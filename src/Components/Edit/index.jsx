import React, { useState,useRef, useEffect } from 'react'
import { useQuery, useMutation } from 'react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { isValidEmail, isValidPhone } from "../../utils/ValidRegex"
import { toast } from "react-toastify"
import Input from 'antd/es/input/Input'
import { QUERIES } from '../../constant/Queries'
import { GetSingleUsers,EditUsers } from '../../Api/apiRequest'

const Edit = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const inputRef = useRef()

  const initialState = {
    fullName: "",
    age: 0,
    email: "",
    phone: ""
  }
  const [edit, setEdit] = useState(initialState)

  const { data, isLoading, isError } = useQuery({
    queryKey: QUERIES.SingleUser,
    queryFn: () => GetSingleUsers(userId),
    config: {
      refetchOnReconnect: true,
      refetchInterval: false,
    },
  });
 console.log("userID:",userId)
  const mutation = useMutation({
    mutationFn: () => EditUsers(userId, edit),
    onSuccess: () => {
      setEdit(initialState)
      toast.success("User updated successfully!", {
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate("/")
      }, [1500])
    },
    onError: (error) => {
      console.error("Error updating user:", error.message);
      toast.error("Error updating user", {
        autoClose: 1000,
      });
    },
  })
  const handleUserEdit = async () => {
    // if (!isValidEmail(edit.email)) {
    //   toast.error("Invalid email address", {
    //     autoClose: 1000,
    //   });
    //   return;
    // }
    // if (!isValidPhone(edit.phone)) {
    //   toast.error("Invalid phone address", {
    //     autoClose: 1000,
    //   })
    //   return
    // }
    mutation.mutate(edit)
  }

  const handleInput = (e) => {
    const { name, value } = e.target
    console.log(name, value)
    setEdit({
      ...edit,
      [name]:value,
    })
  }
  useEffect(() => {
    if(inputRef.current){
      inputRef.current.focus()
    }
  },[])

  useEffect(() => {
    if (data) {
      setEdit(data);
    }
  }, [data]);

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return (
      <div className='flex justify-center items-center'>
          <span className='text-lg'>Error</span>
      </div>
    )
  }

  return (
    <>
     <div className='flex flex-col items-center p-5 m-5'>
        <h1 className='text-3xl'>Update User</h1>

        <Input
          name='fullName'

          type='text'
          ref={inputRef}
          onChange={handleInput}
          value={edit.fullName}
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
          value={edit.email}
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
          value={edit.age}
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
          value={edit.phone}
          placeholder='enter phone'
          style={{
            width: '50%',
            borderRadius: "7px"
          }}
        />
        <button className="bg-cyan-500 hover:bg-cyan-600 w-1/2 rounded p-2 m-2 text-white text-l"
          onClick={handleUserEdit}
        >
          {mutation.isLoading ? "Updating User..." : "Update User"}
        </button>

      </div>
    </>
  )
}

export default Edit