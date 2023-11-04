import React, { useState } from "react";
import modal from "../../components/modal.module.css";
import axios from "axios";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";

function Insert({ addClose, reload }) {
  const [formdata, setformdata] = useState({});
  // const [reload, setReload] = useState(false);
  const handlechange = (event) => {
    
    const name = event.target.name;
    const value = event.target.value;
    setformdata({ ...formdata, [name]: value });
  };
  const [validationMsg, setvalidationMsg] = useState('');

  const valideForm = ()=>{
    if(formdata.Name && formdata.C_ID)
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
      .post("http://localhost:3001/add_balance", { formdata })
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
              <p>*Name :</p>
              <input type="text" name="Name" onChange={handlechange} />
            </label>
          </div>
          <div className={modal.form_group}>
            <label>
              <p>*Customer ID</p>
              <input type="text" name="C_ID" onChange={handlechange} />
            </label>
          </div>
          {/* <div className={modal.form_group}>
            <label>
              <p>*Gold wgt. : </p>
              <input type="text" name="Gold_wgt" onChange={handlechange} />
            </label>
          </div> */}
          
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
