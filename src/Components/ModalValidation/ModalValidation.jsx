import './ModalValidation.scss'
import Btn from '../Btn/Btn'
import { useDispatch, useSelector } from 'react-redux'
import { BsCheck, BsInfo, BsX } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function ModalValidation({status,type}) {
  // type : "valide" || "info"
    const {showModal , nextFunc , modalInfo} = useSelector(s => s.modal)
    // console.log(showModal , nextFunc,66666);
    const dispatch = useDispatch()
    const closeModal = () => {
      const action = {
        type : "modal/show" ,
        payload : {
            showModal: false,
            nextFunc: null,
            modalInfo: {
              title: "Validation of the operation",
              message: "You want to validate your online declaration",
              type: "info",
              closeX: false,
              path: false
            }
          }
        }
        dispatch(action)
        // console.log("dima maghrib",modalActions.show(action));
      
    }
    const validModal = ()=> {
      nextFunc()
      // closeModal()
    }
    
    useEffect(() => {
      if ((status?.success || status?.error) && !status?.isLoading) closeModal()
    }, [status])
    
// console.log(modalInfo);
    // return <h1>{value}</h1>
    return showModal &&
     (
<>
<div className={`ModalValidation${" active" ? " activeModal" : ""} ${modalInfo.type}`}>

      {
        type === "info" ? (
          <div className="modal-box info-modal">
                  {modalInfo.closeX && (
          <div onClick={closeModal} className="close-x"><BsX/></div>
        )}
            <div className="modal-title">{modalInfo.title}</div>
            <div className="modal-icon">
              {modalInfo.type === "success" ? <BsCheck/> : modalInfo.type === "error" ? <BsX/> : <BsInfo/>}
            </div>
            <div className="modal-info">{modalInfo.message}</div>
            <div className="modal-controllers">
              {modalInfo.path ? (
                <Btn btnStyle="bg" color="success" element="a" to={modalInfo.path}>Continue Shopping</Btn>
              ) : (
                <Btn onClick={validModal} loading={status?.isLoading} btnStyle="bg" color="success" element="button">Continue Shopping</Btn>
              )}
            </div>
          </div>
        ) : (
          <div className="modal-box">
                  {modalInfo.closeX && (
          <div className="close-x"><BsX/></div>
        )}
            <div className="modal-icon">
              <BsInfo/>
            </div>
            <div className="modal-title">{modalInfo.title}</div>
            <div className="modal-info">{modalInfo.message}</div>
            <div className="modal-controllers">
                 <Btn onClick={closeModal} disabled={status?.isLoading} btnStyle="bg" color="success" element="button">No</Btn>
                 
                 <Btn onClick={validModal} loading={status?.isLoading} btnStyle="bg" color="success" element="button">Yes</Btn>
            </div>
          </div>
        )
      }
      </div>
    </>
    )
}

export function ModalValidationStatic({counter , type , title , message , path , validModal , status , btnContent , BtnDisabled}) {
  const [showModal , setShowModal] = useState(true)
  // const closeModal = () => {
  //   setShowModal(false)
  // }
    return (
<>
<div className={`ModalValidation static-modal ${showModal ? "activeModal" : ""} ${type}`}>

      {
          <div className="modal-box info-modal">
            <div className="modal-title">{title}</div>
            <div className="modal-icon">
              {type === "success" ? <BsCheck/> : type === "error" ? <BsX/> : <BsInfo/>}
            </div>
            <div className="modal-info">{message}</div>
            {BtnDisabled && (
              <div className='resend-p'>You will be able to send a new email in {`${Math.floor(counter / 60) >= 10 ? Math.floor(counter / 60) : "0" + Math.floor(counter / 60)}:${Math.floor(counter % 60) >= 10 ? Math.floor(counter % 60) : "0" + Math.floor(counter % 60)}`}</div>
            )}
            <div className="modal-controllers">
              {path ? (
                <Btn btnStyle="bg" color="success" element="a" to={path}>{btnContent}</Btn>
              ) : (
                <Btn disabled={BtnDisabled} onClick={validModal} loading={status?.isLoading} btnStyle="bg" color="success" element="button">{btnContent}</Btn>
              )}
            </div>
          </div>
      }
      </div>
    </>
    )
}


// eslint-disable-next-line no-lone-blocks
{/* 
                  Modal Docs
----------------------------------------------------------------

import ModalValidation from '../../Components/ModalValidation/ModalValidation'

----------------------------------------------------------------

const showModal = (show , nextFunc) => {
  const action = {
    type : "modal/show" ,
    payload : {
        showModal: show,
        nextFunc: nextFunc,
        modalInfo: {
          title: "Change password",
          message: "Vous voulez valider le changement de password ?",
          type: "info"
        }
      }
    }
    dispatch(action)
}
  
----------------------------------------------------------------

<ModalValidation status={updatePassword_settings_Status}/>

----------------------------------------------------------------

showModal(true,() => {...})

----------------------------------------------------------------  
*/}