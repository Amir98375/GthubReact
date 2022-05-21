import { useEffect, useState } from "react"
import axios from "axios"


const GetgitubUser=(query)=>{
    
   return  axios(`https://api.github.com/search/users`,{
        method:"GET",
        params:{
         q:query,
        }
    }
    )

}



export const Github = ()=>{
    const [data,setdata] =useState([])
    const [error,setError] =useState(false)
    const [text,setText] =useState('')
    const [query,setquery]=useState("masai")

    const handlsearch =(query)=>setquery(query)
  
    useEffect(()=>{
        GetgitubUser(query)
        .then((res)=>{
      setdata(res.data.items)
        })
        .catch((err)=>{
         setError(true)
        })

    },[query])
console.log(text)
    console.log(data)
    return(
        <div>
            <div>
                <input type="text" value={text} onChange={e=>{setText(e.target.value)}}/>
                <button onClick={()=>{handlsearch(text)}}>Search</button>
            </div>
        { data.map((el)=>{
              return(
                 
                  <div style={{display:"flex" , direction:"col"}}>
                      <img height={"50px"} width="100px" src={el.avatar_url} alt="" />
                      <p>{el.login}</p>
                  </div>
                  
              )
          })}
        </div>

    )

    
}