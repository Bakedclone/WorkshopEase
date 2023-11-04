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
    if(formdata.Gold_wgt && formdata.O_ID && formdata.DT )
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
      .post("http://localhost:3001/add_gold_out", { formdata })
      .then((res) => {
        console.log(res);
        navigate("/");
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
      <div className={modal.modal}>
        <form>
          <div className={modal.form_group}>
            <label>
              <p>*Date :</p>
              <input type="date" name="DT" onChange={handlechange} />
            </label>
          </div>
          <div className={modal.form_group}>
            <label>
              <p>*Order ID</p>
              <input type="text" name="O_ID" onChange={handlechange} />
            </label>
          </div>
          <div className={modal.form_group}>
            <label>
              <p>*Gold wgt. : </p>
              <input type="text" name="Gold_wgt" onChange={handlechange} />
            </label>
          </div>
          
          <div style={{color:"red",fontSize:"0.8rem",paddingBottom:"0.5rem"}}>{validationMsg}</div>
          <Button onClick={handlesubmit} variant="contained">
            Insert
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Insert;
