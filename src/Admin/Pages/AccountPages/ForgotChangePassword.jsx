import { NavLink, useNavigate, useParams } from 'react-router-dom'
import Btn from '../../Components/Btn/Btn'
import Input from '../../Components/Input/Input'
import './AccountPages.scss'
import { BiRightArrowAlt } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { forgotChangePassword } from '../../../Store/Admin/accountSlice'

export default function ForgotChangePassword() {
  const {isLoading} = useSelector(s => s.account)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {forgotPasswordCode} = useParams()

  // Form useState
  const [password, setPassword] = useState("")
  const [confirm_password, setConfirm_password] = useState("")

  // Submit Form
  const submitHandle = (e) => {
    e.preventDefault()
    dispatch(forgotChangePassword({forgotPasswordCode, passwords:{password, confirm_password}})).unwrap().then((docs) => {
      toast.success(docs.message)
        navigate("/admin/account/login")
    }).catch(err => toast.error(err.message))
  }
  return (
    <div className='AccountPages'>
        <h2>Change your password!</h2>
        <h3>Enter your new password</h3>
        <form onSubmit={submitHandle}>
            <Input onChange={e => setPassword(e.target.value)} required name="password" id="password" label="Password" type="password"/>
            <Input onChange={e => setConfirm_password(e.target.value)} required name="confirm_password" id="confirm_assword" label="Confirm Password" type="password"/>
            <br />
            <Btn loading={isLoading} width="full">Change password</Btn>
            <div className="footer-p">Try again your password, <NavLink to="/admin/account/login">login <BiRightArrowAlt/></NavLink></div>
        </form>
    </div>
  )
}
