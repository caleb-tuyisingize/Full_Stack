import {useState,useEffect} from "react";
const API ="http://localhost:3001/mevis";
function App() {
  const [tableData,setTableData] = useState([]);
 const [name,setName] = useState("");
 const [classe,setClasse] = useState("");
 const [editing,setEditing] = useState(null);

 useEffect(()=>{
  fetch(API)
       .then(res => res.json())
       .then(data => setTableData(data));
 });
 const addDatas = ()=>{
   fetch(API,{
     method:"POST",
     headers: {"content-type":"application/json"},
     body: JSON.stringify({ mname: name, mclass: classe })
   })
   .then(res => res.json())
   .then(data=>{
     setTableData([...tableData,data]);
     setName("");
     setClasse("");
   });
   

};
const deleteData= (id)=>{
  fetch(`${API}/${id}`,{
    method:"DELETE",
  })
  .then(()=>{
    setTableData(mevis.filter(data=> data.mid !==id));
  });
  

};

const  updateData = id =>{
  fetch(`${API}/${editing.mid}`,{
    method:"put"
  })
  .then(res => res.json())
  .then(()=>{
    setTableData(mevis.map(data=>{
      data.mid === editing.mid ?{...data,mname}:data
    }));
    setName("");
    setEditing(null);
  });
  

};

  return (
    <>
      <h1>CRUD with fetch</h1><br />
      {/* <form method="post"> */}

      <input type="text" placeholder="Add Mevis name" value={name} onChange={e=>setName(e.target.value)}/>
      <input type="text" placeholder="Add Mevis Class" value={classe} onChange={e=>setClasse(e.target.value)}/>
      <button onClick={addDatas}> Add  </button>
      {/* </form> */}

      <table border={2} cellPadding={0} cellSpacing={0}>
        <tr>
         <th>ID</th>
         <th>Name</th>
          <th>Class</th>
          <th>Action</th>
        </tr>
        {
          tableData.map((datase)=>(
            <>
            <tr key={datase.id}>

               <td>{datase.mid}</td>
               <td>{datase.mname}</td>
               <td>{datase.mclass}</td>
               <td>
                <button onClick={()=> deleteData(datase.mid)}>Delete</button>
                <button>Update data</button>
               </td>
            </tr>
            </>
          ))
        }
      </table>
    </>
  )
}

export default App
