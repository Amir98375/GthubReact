import { useEffect, useState } from "react"
import axios from "axios"


const GetgitubUser=(query,page=1)=>{
    
   return  axios(`https://api.github.com/search/users`,{
        method:"GET",
        params:{
         q:query,
         per_page:5,
         page
        }
    }
    )

}



export const Github = ()=>{
    const [data,setdata] =useState([])
    const [error,setError] =useState(false)
    const [text,setText] =useState('')
    const [query,setquery]=useState("masai")
    const [page,setPage] =useState(1)

    const handlsearch =(query)=>setquery(query)
    const handlePage=()=>setPage(page)
  
    useEffect(()=>{
        GetgitubUser(query,page)
        .then((res)=>{
      setdata(res.data.items)
        })
        .catch((err)=>{
         setError(true)
        })

    },[query,page])
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
          <button disabled={page==1} onClick={()=>setPage(page-1)}>Prev</button>
          <button onClick={()=>setPage(page+1)}>Next</button>
        </div>

    )

    
}