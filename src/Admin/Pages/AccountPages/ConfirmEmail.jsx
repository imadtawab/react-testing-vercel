import React, { useEffect, useState } from 'react'
import Btn from '../../Components/Btn/Btn'
import { BiCheck } from 'react-icons/bi'
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
import { confirmEmail } from '../../../Store/Admin/accountSlice'
import PageNotFound from '../../Components/PageNotFound/PageNotFound'
import Loading from '../../../MainComponent/Loading/Loading'

export default function ConfirmEmail() {
  const {isLoadingPage} = useSelector(s => s.account)
  let a = false
  const dispatch = useDispatch()
  const params = useParams()
  const [email, setEmail] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if(a) return
    // eslint-disable-next-line react-hooks/exhaustive-deps
    a = true

    dispatch(confirmEmail(params.activationCode)).unwrap().then((docs) => {
      setEmail(docs.email)
    }).catch(err => setError(true))
  }, [])
  
  if(error){
    return <PageNotFound/>
  }
  return (
    <Loading loading={isLoadingPage}>
          <div className='AccountPages'>
    <h2>Activation account !</h2>
        <div className="icon-account success"><BiCheck/></div>
        <h4>{email}</h4>
        <div className="footer-p"> your account has been activated</div>
        <br />
        <Btn width="full" element="a" to="/admin/account/login">Go to login</Btn>
</div>
    </Loading>
  )
}
