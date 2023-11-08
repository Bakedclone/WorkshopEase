import React, { useState } from "react";
import modal from "../../components/modal.module.css";
import axios from "axios";
import { Button } from "@mui/material";
import { BASE_URL } from 'src/services/helper';

function Update(props) {
  const rowData = props.data.filter((customers) => {
    if (customers.C_ID === props.row) return true;
    else return false;
  });
  console.log(rowData);
  const [formdata, setformdata] = useState(rowData[0]);

  const [validationMsg, setvalidationMsg] = useState("");

  const valideForm = () => {
    if (formdata.Name && formdata.C_ID) return false;
    else {
      setvalidationMsg("*Required input must be filled");
      return true;
    }
  };

  const handlechange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setformdata({ ...formdata, [name]: value });
  };
  const handlesubmit = (event) => {
    event.preventDefault();
    if (valideForm()) return;
    // console.log(formdata);
    axios
      .put(BASE_URL + "/update_customer", { formdata })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((error) => console.log(error));
    props.updateClose();
    props.reload();
  };

  return (
    <div
      className={modal.container}
      onClick={(e) => {
        if (e.target.className === modal.container) {
          props.updateClose();
        }
      }}
    >
      <div className={modal.modal}>
        <form>
          <div className={modal.form_group}>
            <label>
              <p>*Name :</p>
              <input type="text"
                name="Name"
                value={formdata.Name}
                onChange={handlechange} />
            </label>
          </div>
          <div className={modal.form_group}>
            <label>
              <p>ID :</p>
              <input
                type="text"
                name="C_ID"
                value={formdata.C_ID}
                onChange={handlechange}
                readonly="readonly"
              />
            </label>
          </div>
          <div className={modal.form_group}>
            <label>
              <p>E-mail : </p>
              <input type="text"
                name="Mail"
                value={formdata.Mail}
                onChange={handlechange} />
            </label>
          </div>
          <div className={modal.form_group}>
            <label>
              <p>Contact :</p>{" "}
              <input type="text"
                name="Contact"
                value={formdata.Contact}
                onChange={handlechange} />
            </label>
          </div>
          <div className={modal.form_group}>
            <label>
              <p>Address :</p>{" "}
              <textarea name="Address"
                value={formdata.Address}
                onChange={handlechange} />
            </label>
          </div>
          <div style={{ color: "red", fontSize: "0.8rem", paddingBottom: "0.5rem" }}>
            {validationMsg}
          </div>
          <Button onClick={handlesubmit}
            variant="contained">
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Update;
