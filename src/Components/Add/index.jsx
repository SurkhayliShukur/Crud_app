import React from 'react'
import Input from 'antd/es/input/Input'

const Add = () => {
  return (
    <>
      <div className='text-center p-5 m-5'>
        <h1>Add User</h1>
        <div className='p-2'>
        <Input 
          name='fullName'
          placeholder='enter fullName'
          style={{
            width:'50%',
            borderRadius:"10px"
          }}
          />
        </div>
        <div className='p-2'>
        <Input 
          name='email'
          placeholder='enter email'
          style={{
            width:'50%',
            borderRadius:"10px"
          }}
          />
        </div>

      </div>
    </>
  )
}

export default Add