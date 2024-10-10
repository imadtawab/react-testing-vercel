import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InputBox from '../../../../MainComponent/InputBox/InputBox'
import BtnsFooter from '../../../Components/BtnsFooter/BtnsFooter'
import Btnx from '../../../Components/Btnx/Btnx'
import SectionStructure from '../../../Components/SectionStructure/SectionStructure'
import { Modal } from '../../../Utils/modalUtils'
import { changePassword } from '../../../../Store/Admin/accountSlice'
import { toast } from 'react-toastify'

export default function Password() {
  const dispatch = useDispatch()

  const [current_password , setCurrent_password] = useState("")
  const [password , setPassword] = useState("")
  const [confirm_password , setConfirm_password] = useState("")

  const updatePasswordHandle = (e) => {
    if(!current_password) return toast.error("The current password field is required")
    if(!password) return toast.error("The new password field is required")
    if(!confirm_password) return toast.error("The confirm password field is required")
    let body = {current_password, password, confirm_password}
    let dispatchFunc = () => dispatch(changePassword(body)).unwrap()
    .then((docs) => {
      setCurrent_password("")
      setPassword("")
      setConfirm_password("")
      toast.success(docs.message)
      Modal(false)
    }).catch(err => {
      setCurrent_password("")
      setPassword("")
      setConfirm_password("")
      toast.error(err.message)
      Modal(false)
    })
    Modal(true, dispatchFunc, {
      title: "Change Password",
      message: "You want to change password ?",
      type: "info"
    })
  }
  return (
        <from className='Password'>
          <SectionStructure title="Change Password">
          <InputBox
                      required
                      value={current_password}
                      onChange={(e) => setCurrent_password(e.target.value)}
                      mx_width
                      type="password"
                      name="current_password"
                      id="current_password"
                      placeholder="Current Password"
                      label="Current Password"
                    />
                              <InputBox
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      mx_width
                      type="password"
                      name="password"
                      id="password"
                      placeholder="New Password"
                      label="New Password"
                    />
                              <InputBox
                      required
                      value={confirm_password}
                      onChange={(e) => setConfirm_password(e.target.value)}
                      mx_width
                      type="password"
                      name="confirm_password"
                      id="confirm_password"
                      placeholder="Confirm Password"
                      label="Confirm Password"
                    />
            <BtnsFooter>
            <div className="box"></div>
              <div className="box">
                <Btnx
                  onClick={updatePasswordHandle}
                  btnStyle="bg"
                  color="success"
                  element="button"
                  type="submit"
                >
                  Update Password
                </Btnx>
              </div>
            </BtnsFooter>
          </SectionStructure>
        </from>
  )
}
