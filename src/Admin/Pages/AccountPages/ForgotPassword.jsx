import { NavLink } from 'react-router-dom'
import Btn from '../../Components/Btn/Btn'
import Input from '../../Components/Input/Input'
import './AccountPages.scss'
import { BiRightArrowAlt } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { forgotPassword } from '../../../Store/Admin/accountSlice'

export default function ForgotPassword() {
  const {isLoading} = useSelector(s => s.account)
  const dispatch = useDispatch()

  // Form useState
  const [email, setEmail] = useState("")

  // Submit Form
  const submitHandle = (e) => {
    e.preventDefault()
    dispatch(forgotPassword(email)).unwrap().then((docs) => {
      toast.success(docs.message)
    }).catch(err => toast.error(err.message))
  }
  return (
    <div className='AccountPages'>
        <h2>You forgot your password!</h2>
        <h3>Reset your password</h3>
        <form onSubmit={submitHandle}>
            <Input onChange={e => setEmail(e.target.value)} required name="email" id="email" label="Email" type="email"/>
            <br />
            <Btn loading={isLoading} width="full">Forgot password</Btn>
            <div className="footer-p">Try again your password, <NavLink to="/admin/account/login">login <BiRightArrowAlt/></NavLink></div>
        </form>
    </div>
  )
}
