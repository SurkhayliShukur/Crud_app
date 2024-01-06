import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { GetUsers } from '../../Api/apiRequest'
import moment from "moment";

const Home = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: GetUsers,
    config: {
      refetchOnReconnect: true,
      refetchInterval: false,
    },
  })
  const [sortUser, setSortUser] = useState([])

  const handleUser = (e) => {
    const sortValue = e.target.value;
    const sortData = [...data];

    sortData.sort((a, b) => {
      if (sortValue === "A-Z") {
        return a.fullName.localeCompare(b.fullName)
      }
      else if (sortValue === "Z-A") {
        return b.fullName.localeCompare(a.fullName)
      }
      else if (sortValue === "Low-to-High") {
        return a.age - b.age
      }
      else {
        return b.age - a.age
      }
    })
    setSortUser(sortData)

  }
  const resetSortedData = async () => {
    await refetch();
    setSortUser([]);
  };
  console.log(sortUser)

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <div className="styleContainer">
        <h1>Table</h1>
        <div className="sortAble">
          <h3>Sort Users</h3>
          <select onChange={handleUser}>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="Low-to-High">Low-to-High</option>
            <option value="High-to-Low">High-to-Low</option>
          </select>
          <button className='reset-btn' onClick={resetSortedData}>Reset</button>
        </div>
        <table className='w-full text-sm text-center m-3  text-gray-500 dark:text-gray-400 '>
          <thead className='text-l text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 p-8'>
            <tr>
              <th>Id</th>
              <th>FullName</th>
              <th>Age</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Added</th>
              {/* <th>Update</th>
              <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {
              isLoading ? (
                <tr>
                  <td>Loading...</td>
                </tr>
              ) :
                isError ? (
                  <tr>
                    <td>No Data</td>
                  </tr>
                ) : (
                  <>
                    {
                      (sortUser.length > 0 ? sortUser : data).map((item, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{item.fullName}</td>
                          <td>{item.age}</td>
                          <td>{item.email}</td>
                          <td>{item.phone}</td>
                          <td>{moment(item?.create_at).fromNow()}</td>
                        </tr>
                      ))
                    }
                  </>
                )
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Home