import React from 'react'
import { QUERIES } from '../../constant/Queries'
import { GetSingleUsers } from "../../Api/apiRequest"
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

const Detail = () => {

    const { userId } = useParams()

    const { data, isLoading, isError } = useQuery({
        queryKey: QUERIES.SingleUser,
        queryFn: () => GetSingleUsers(userId),
        config: {
            refetchOnReconnect: true,
            refetchInterval: false,
        },
    })

    return (
        <>

            <div className="card w-100 bg-base-100 shadow-xl" style={{ maxWidth: 400, margin: "auto", marginTop: "5rem" }}>
                <div className="card-body ">
                    {isLoading && <p>Loading...</p>}
                    {isError && <p>Error fetching data...</p>}
                    {
                        data && (
                            <>
                                <h1 className='card-title'>Data Detail</h1>
                                <h2 className="text-xl">
                                    FullName:
                                    <span className="badge badge-lg badge-primary p-3 m-5">{data.fullName}</span>
                                </h2>
                                <h2 className="text-xl">
                                    Age:
                                    <span className="badge badge-lg badge-primary p-3 m-5">{data.age}</span>
                                </h2>
                                <h2 className="text-xl">
                                    Email:
                                    <span className="badge badge-lg badge-primary p-3 m-5">{data.email}</span>
                                </h2>
                                <h2 className="text-xl">
                                    Phone:
                                    <span className="badge badge-lg badge-primary p-3 m-5">{data.phone}</span>
                                </h2>
                              
                               
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Detail