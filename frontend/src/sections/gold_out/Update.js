import React,{ useState } from 'react'
import modal from '../../components/modal.module.css'
import axios from 'axios';
import { Button } from '@mui/material';
import { BASE_URL } from 'src/services/helper';


function Update(props) {

    const rowData = props.data.filter((gold_out)=>{
        if(gold_out.O_ID === props.row)
            return true;
        else
            return false;
    })
    console.log(props.data); 
  const[formdata,setformdata]=useState( rowData[0] );
  console.log(formdata);

  const [validationMsg, setvalidationMsg] = useState('');

  const valideForm = ()=>{
    if(formdata.Gold_wgt && formdata.C_ID)
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
      axios.put(BASE_URL + '/update_gold_out' ,{formdata})
      .then(res => {
        console.log(res);
        navigate('/');
      }).catch(error => console.log(error));
      props.updateClose();
      props.reload();
    }

  return (

    <div className={modal.container}
    onClick={(e)=>{
      if(e.target.className === modal.container) {
        props.updateClose();
      }
    }}>
        <div className={modal.modal}>
            <form>
                <div className={modal.form_group}>
                    <label>
                        <p>*Date :</p>
                        <input type="date" 
                        name="DT" 
                        value={formdata.DT} 
                        onChange={handlechange} />
                    </label>
                </div>
                <div className={modal.form_group}>
                    <label>
                        <p>*Gold Wgt. : </p>
                        <input type="text" 
                        name="Gold_wgt" 
                        value={formdata.Gold_wgt} 
                        onChange={handlechange}/>
                    </label>
                </div>
                <div style={{color:"red",fontSize:"0.8rem",paddingBottom:"0.5rem"}}>{validationMsg}</div>
                <Button
                  onClick = {handlesubmit}
                  variant="contained"
                  >
                  Update
                </Button>
            </form>
        </div>
    </div>
  )
}

export default Update