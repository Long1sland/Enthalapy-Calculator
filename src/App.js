import {
  Autocomplete,

  Button,

  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./App.css";
 let options = [""]
function App() {
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState("");
  const [streamTemp, setStreamTemp] = useState();
  const [streamFlow, setStreamFlow] = useState();
  const [enthalpy, setEnthalpy] = useState(0)
  console.log(value)

  async function getData(){
let data = await (await fetch("./data.json")).json()
options = data


  }

useEffect(() =>{
getData()
},[])
 
function handleSubmit(e){
e.preventDefault()


let Temp = Number(streamTemp)
let Flow = Number(streamFlow)

// Calculating Enthalpy
let Q1=(value.A*(Temp-298))
let Q2=(value.B*(((Temp**2)-(298**2))/2))
let Q3=(value.C*(((Temp**3)-(298**3))/3))
let Q4=(value.D*(((Temp**4)-(298**4))/4))

let Enthalpy = Flow *(Q1 + Q2 + Q3 + Q4)

setEnthalpy(Enthalpy)

}



  
  


  return (
    <>
    <h1 id = "header">Enthalpy Calculator</h1>
    <form onSubmit={handleSubmit}>
      
<div>
  <Autocomplete
      sx={{ width: "80vmin" }}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        
        renderInput={(params) => <TextField {...params} label="Enter a Compound"  />}
      />
</div>
      
<div>
  <TextField
          id="stream_temp"
          label="Stream Temperature (K)"
          type="number"
          variant="filled"
          sx={{ width: "80vmin" }}
          onChange={(e) => {
           
            setStreamTemp(e.target.value);
          }}
          />
</div>
<div>
  <TextField
          id="stream_flow"
          label="Molar Flow Rate (Kmol/hr)"
          type="number"
          variant="filled"
          onChange={(e) => {
            setStreamFlow(e.target.value);
          }}
          sx={{ width: "80vmin" }}
          />
</div>

        <Button variant="contained" type = "submit"sx={{ width: "80vmin" }}>Calculate</Button>
    </form>
    <h1 id = "enthalpy">{`${enthalpy.toFixed(3)} KJ/HR`}</h1>
    </>

  );
}

export default App;
