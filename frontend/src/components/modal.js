import React from 'react'
import modal from './modal.module.css'
function Modal() {
  return (
    <div className={modal.container}>
        <div className={modal.modal}>
            <form>
                <div className={modal.form_group}>
                    <label>
                        <p>Name</p><input type="text" />
                    </label>
                </div>
                <div className={modal.form_group}>
                    <label>
                        <p>ID</p><input type="text" />
                    </label>
                </div>
                <div className={modal.form_group}>
                    <label>
                        <p>E-mail : </p><input type="text" />
                    </label>
                </div>
                <div className={modal.form_group}>
                    <label>
                        <p>Contact :</p> <input type="text" />
                    </label>
                </div>
                <div className={modal.form_group}>
                    <label>
                        <p>Address :</p> <textarea />
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Modal