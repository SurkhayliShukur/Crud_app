import React, { useState, useEffect, useContext } from 'react'
import { useQuery } from 'react-query'
import { GetUsers } from '../../Api/apiRequest'
import { ROUTER } from '../../constant/Router';
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Context } from '../../Context/Context';
import { FaTrash } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import Delete from '../Delete';

const Home = () => {

  const navigate = useNavigate()
  const { openDelModal } = useContext(Context)

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
      <Delete />

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
        <div className='overflow-x-auto'>
          <table className='table'>
            <thead className=''>
              <tr>
                <th>Id</th>
                <th>FullName</th>
                <th>Age</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Added</th>
                <th>Update</th>
                <th>Actions</th>
                <th>Detail</th>
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
                            <td>
                              <button
                                onClick={() => {
                                  navigate(`${ROUTER.Edit}/${item.id}`)
                                }}
                                className="btn btn-warning text-white">Edit</button>
                            </td>
                            <td>
                              <button
                                onClick={() => openDelModal(item)}
                                className='btn btn-error text-white'>
                                <FaTrash />
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  navigate(`${ROUTER.Detail}/${item.id}`)
                                }}
                                className='btn btn-success text-white'>
                                <MdVisibility style={{fontSize:"x-large"}} />
                              </button>
                            </td>
                          </tr>
                        ))
                      }
                    </>
                  )
              }
            </tbody>
          </table>
        </div>

      </div>

    </>
  )
}

export default Home