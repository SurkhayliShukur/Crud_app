import React,{useState,useEffect} from 'react'
import { useQuery } from 'react-query'
import { GetUsers } from '../../Api/apiRequest'

const Home = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: GetUsers,
    config: {
      refetchOnReconnect: true,
      refetchInterval: false,
    },
  })
  const [sortUser,setSortUser] = useState([])

  const handleUser = (e) => {
    const sortValue = e.target.value;
    const sortData = [...data];

    sortData.sort((a,b) => {
      if(sortValue === "A-Z"){
        return a.fullName.localeCompare(b.fullName)
      }
      else if(sortValue === "Z-A"){
          return b.fullName.localeCompare(a.fullName)
      }
      else if(sortValue === "Low-to-High"){
        return a.age - b.age
      }
      else{
        return b.age -a.age
      }
    })
    setSortUser(sortData)

  }
  const resetSortedData = async () => {
    await refetch();
    setSortUser([]);
  };

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
        <button className='reset-btn'>Reset</button>
      </div>
      <table>

      </table>
    </div>
    </>
  )
}

export default Home