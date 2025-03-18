import React , { useState , useEffect} from 'react'
import { fetchClaims } from '../api/coupon';

const Claim = ({ isLoading , setisLoading}) => {

    const [claims, setClaims] = useState([]);
        const [responseMessage, setresponseMessage] = useState("")
    
        const getData = async() => {
            setisLoading(true);
            try {
                const response = await fetchClaims();
                if (response) {
                    setClaims(response.data);
                    setresponseMessage(response.message);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    alert("🔒 Unauthorized! Please log in to access this page.");
                } else {
                    console.error("Error fetching claims:", error);
                }
            }
            setisLoading(false);
        }
    
        useEffect(() => {
            getData()
          
        }, [])
  return (
    <div className='w-[100%] overflow-scroll'>
        
        {isLoading ? (<div className='m-10 font-medium text-lg'>Loading....</div>)
        : (<table className=' my-10 mx-10 overflow-scroll w-[60rem]'>
            <thead>
                <tr className='bg-purple-100'>
                    <td className='font-bold text-lg pl-3 py-2'>code</td>
                    <td className='font-bold text-lg pl-3 py-2'>claimer ip</td>
                    <td className='font-bold text-lg pl-3 py-2'>claimed At</td>
                </tr>
            </thead>
            <tbody>
                {claims.map(item=>(
                    <tr key={item._id}>
                        <td className=' pl-3 py-2'>{item.code}</td>
                        <td className=' pl-3 py-2'>{item.claimedBy}</td>
                        <td className=' pl-3 py-2'>{item.claimedAt}</td>
                    </tr>
                )
                )}

            </tbody>
        </table>)}
      
    </div>
  )
}

export default Claim
