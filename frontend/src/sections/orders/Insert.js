import React, { useState } from "react";
import modal from "../../components/modal.module.css";
import axios from "axios";
import { Button } from "@mui/material";

function Insert({ addClose, reload }) {
  const [formdata, setformdata] = useState({});

  const handlechange = (event) => {
    
    const name = event.target.name;
    const value = event.target.value;
    setformdata({ ...formdata, [name]: value });
  };
  const today = new Date();
  const formatedate = today.toISOString().substr(0, 10);
  const [date, setdate] = useState(formatedate);
  const [validationMsg, setvalidationMsg] = useState('');

  const valideForm = ()=>{
    if(formdata.O_ID && formdata.C_ID && formdata.DT && formdata.Wastage)
      return false;
    else  {
      setvalidationMsg('*Required input must be filled');
      return true;
    }
  }
  
  const handlesubmit = (event) => {
    event.preventDefault();
    if(valideForm()) return;
    addClose();
    axios
      .post("http://localhost:3001/add_orders", { formdata })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
    reload();
  };

  return (
    <div
      className={modal.container}
      onClick={(e) => {
        if (e.target.className === modal.container) {
          addClose();
        }
      }}
    >
      <div className={modal.modal} style={{width:'50rem'}}>
        <form>
          <div className={modal.parent}>
            <div className={modal.child}>

            <div className={modal.form_group}>
              <label>
                <p>*Date :</p>
                <input type="date" name="DT" onChange={handlechange} />
              </label>
            </div>
            <div className={modal.form_group}>
              <label>
                <p>*Order ID :</p>
                <input type="text" name="O_ID" onChange={handlechange} />
              </label>
            </div>
            <div className={modal.form_group}>
              <label>
                <p>*Customer ID</p>
                <input type="text" name="C_ID" onChange={handlechange} />
              </label>
            </div>
          <div className={modal.form_group}>
            <label>
              <p>Category :</p>
              <input type="text" name="Category" onChange={handlechange} />
            </label>
          </div>
          <div className={modal.form_group}>
            <label>
              <p>Approx Wgt. :</p>
              <input type="text" name="Approx_wgt" onChange={handlechange} />
            </label>
          </div>
          
          </div>
          <div className={modal.child}>
          <div className={modal.form_group}>
            <label>
              <p>Piece :</p>
              <input type="Number" name="Piece" onChange={handlechange} />
            </label>
          </div>
          <div className={modal.form_group}>
            <label>
              <p>Size :</p>
              <select onChange={handlechange} name="Size">
                <option selected disabled> Select Size </option>
                <option value="2'1">2'1</option>
              </select>
            </label>
          </div>
          <div className={modal.form_group}>
            <label>
              <p>*Wastage :</p>
              <input type="text" name="Wastage" onChange={handlechange} />
            </label>
          </div>
          <div className={modal.form_group}>
            <label>
              <p>Extra Ghut :</p>
              <input type="text" name="Extra_ghut" onChange={handlechange} />
            </label>
          </div>
          
          <div style={{color:"red",fontSize:"0.8rem",paddingBottom:"0.5rem"}}>{validationMsg}</div>
          </div>
          </div>
          <Button onClick={handlesubmit} variant="contained" style={{marginLeft:"1rem"}}>
            Insert
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Insert;
