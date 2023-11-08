import React,{ useState } from 'react'
import modal from '../../components/modal.module.css'
import axios from 'axios';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { BASE_URL } from 'src/services/helper';


function Update(props) {

    const rowData = props.data.filter((orders)=>{
        if(orders.O_ID === props.row)
            return true;
        else
            return false;
    })
    console.log("Update : ", rowData[0]); 
    const[formdata,setformdata]=useState( rowData[0] );

  const [validationMsg, setvalidationMsg] = useState('');

  const valideForm = ()=>{
    if(formdata.O_ID && formdata.C_ID)
      return false;
    else  {
      setvalidationMsg('*Required input must be filled');
      return true;
    }
  }

  const handlechange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setformdata({...formdata, [name]: value})
    }
    const handlesubmit=(event)=>
    {
      event.preventDefault();
      if(valideForm()) return;
      // console.log(formdata);
      axios.put(BASE_URL + '/update_orders' ,{formdata})
      .then(res => {
        console.log(res);
        navigate('/');
      }).catch(error => console.log(error));
      props.updateClose();
      props.reload();

      // alert("Your form has been submitted.\nName: " + formdata.name + 
      // "\nEmail: " + formdata.email + "\Id: "+ formdata.id 
      // +"\Address:"+formdata.address)
    }
    const options = ["--Choose an option--", "2'1", "2'2", "2'3", "2'4"]
    const [selected, setSelected] = useState(options[0]);

  return (

    <div className={modal.container}
    onClick={(e)=>{
      if(e.target.className === modal.container) {
        props.updateClose();
      }
    }}>
        <div className={modal.modal} 
        style={{width:'50rem'}}>
        <form>
          <div className={modal.parent}>
            <div className={modal.child}>

            <div className={modal.form_group}>
              <label>
                <p>*Date :</p>
                <input type="date" 
                name="DT" 
                onChange={handlechange} 
                value = {formdata.DT}/>
              </label>
            </div>
            <div className={modal.form_group}>
              <label>
                <p>*Order ID :</p>
                <input type="text" 
                name="O_ID" 
                onChange={handlechange} 
                value={formdata.O_ID} 
                readOnly="readonly"/>
              </label>
            </div>
            <div className={modal.form_group}>
              <label>
                <p>*Customer ID</p>
                <input type="text" 
                name="C_ID" 
                onChange={handlechange} 
                value={formdata.C_ID}/>
              </label>
            </div>
          <div className={modal.form_group}>
            <label>
              <p>*Category :</p>
              <input type="text" 
              name="Category" 
              onChange={handlechange} 
              value={formdata.Category}/>
            </label>
          </div>
          <div className={modal.form_group}>
            <label>
              <p>*Approx Wgt. :</p>
              <input type="text" 
              name="Approx_wgt" 
              onChange={handlechange} 
              value={formdata.Approx_wgt}/>
            </label>
          </div>
          
          </div>
          <div className={modal.child}>
          <div className={modal.form_group}>
            <label>
              <p>*Piece :</p>
              <input type="Number" 
              name="Piece" 
              onChange={handlechange} 
              value={formdata.Piece}/>
            </label>
          </div>
          <div className={modal.form_group}>
            <label>
              <p>*Size :</p>
              <select value={selected} 
              name="Size" 
              onChange={(event)=>{
                setSelected(event.target.value);
                handlechange(event);
              }}>
                {options.map(value => (
                  <option key={value} 
                  value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className={modal.form_group}>
            <label>
              <p>*Wastage :</p>
              <input type="text" 
              name="Wastage" 
              onChange={handlechange} 
              value={formdata.Wastage}/>
            </label>
          </div>
          <div className={modal.form_group}>
            <label>
              <p>*Extra Ghut :</p>
              <input type="text" 
              name="Extra_ghut" 
              onChange={handlechange} 
              value={formdata.Extra_ghut}/>
            </label>
          </div>
          
          <div style={{color:"red",fontSize:"0.8rem",paddingBottom:"0.5rem"}}>{validationMsg}</div>
          </div>
          </div>
          <Button onClick={handlesubmit} 
          variant="contained" 
          style={{marginLeft:"1rem"}}>
            Update
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Update