import React,{useState} from 'react'
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
    // const sortData = [...data];

    data.sort((a,b) => {
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
    setSortUser(data)

  }

  return (
    <div>index</div>
  )
}

export default Home