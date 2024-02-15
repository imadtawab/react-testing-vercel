import './Account.scss'
import InputBox from '../../Components/InputBox/InputBox'
import Btn from '../../Components/Btn/Btn'
import { NavLink, useNavigate, useParams} from 'react-router-dom'
import { useDispatch,useSelector } from "react-redux";
import { useEffect, useState } from 'react'
import { activationAccount, forgotChangePassword, forgotPassword, loginUser, registerUser, resendEmail } from '../../store/usersSlice'
import ShadowLoading from '../../Components/ShadowLoading/ShadowLoading'
import Alert from '../../Components/Alert/Alert'
import { useSignIn } from 'react-auth-kit';
import ModalValidation, { ModalValidationStatic } from '../../Components/ModalValidation/ModalValidation';
import Loading from '../../Components/Loading/Loading'
export default function Account({page , children}) {
  const dispatch = useDispatch()
  const {registerUserStatus , loginUserStatus , addAuthToStateStatus} = useSelector(s => s.users)
  // const navigate = useNavigate()
  // if(registerUserStatus.success){
  //   navigate("/admin/account/login")
    
  // }
  useEffect(() => {
    dispatch({type: "users/states" , payload: ["registerUserStatus" , "loginUserStatus" , "addAuthToStateStatus"]}) 
  }, [])
  
  return (
    <>
            {registerUserStatus.isLoading && (
      <ShadowLoading/>
    )}
    {registerUserStatus.error && (
      <Alert type="danger">{registerUserStatus.error}</Alert>
    )}
        {addAuthToStateStatus.error && (
      <Alert type="danger">{addAuthToStateStatus.error}</Alert>
    )}
          {registerUserStatus.success && (
            <Alert type="success">{registerUserStatus.success}</Alert>
          )}
                      
    {loginUserStatus.error && (
      <Alert type="danger">{loginUserStatus.error}</Alert>
    )}
{page ? (
   <div className="content-parent">
    <div className='Account'>
        <h3>{page}</h3>
        {children}
    </div>
</div>
) : children}
    </>
  )
}

export function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const signIn = useSignIn()

  const loginHandle = (e) => {
    e.preventDefault()
    // console.log({userName,email,password,confirmPassword});
    dispatch(loginUser({email,password})).then((docs) => {
      console.log(docs.payload.token, docs.payload.user.email);
      if(docs.type === "loginUser/fulfilled"){
        signIn({
          token: docs.payload.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: {email: docs.payload.user.email}
        })
        navigate("/admin")
      }

    })
    // navigate("/admin/account/login")
    
  }
  return (
    <Account page="Login">
        <form onSubmit={loginHandle} action="">
            <InputBox required onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="email" placeholder="Email" label="Email" />
            <InputBox required onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" placeholder="Password" label="Password" />
            <NavLink to="/admin/account/forgot-password" className="forgot-password">Forgot your password?</NavLink>
            <Btn width="full" type="sbmit" element="button" btnStyle="bg" color="success">Login</Btn>
        </form>
    </Account>
  )
}
export function Register() {
  const [showConfirmEmail , setConfirmEmail] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {registerUserStatus} = useSelector(s => s.users)
  useEffect(() => {
    dispatch({type: "users/states" , payload: "registerUserStatus"}) 
  }, [])

  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")


  const registerHandle = (e) => {
    e.preventDefault()
    // console.log({userName,email,password,confirmPassword});
    dispatch(registerUser({userName,email,password,confirmPassword})).then((docs) => {
      console.log(docs);
      if(docs.type === "registerUser/fulfilled"){
        // navigate("/admin/account/login")
        setConfirmEmail(true)
        window.history.pushState(null, "/", "activation")
      }

    })
    // navigate("/admin/account/login")
    
  }
  useEffect(() => {
    console.log(window.location);
    if(window.location.pathname === "/admin/account/register"){
      setConfirmEmail(false)
    }
  }, [window.location.pathname])
  return (
    showConfirmEmail ? (  
      <ConfirmEmail isActive={false} email={email}/>
    ) : (

    <Account page="Register">
        <form onSubmit={registerHandle} action="">
            <InputBox 
            // required
            onChange={(e) => setUserName(e.target.value)} value={userName} type="text" name="userName" id="userName" placeholder="User Name" label="User Name" />
            <InputBox 
            // required
            onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="email" placeholder="Email" label="Email" />
            <InputBox 
            // required
            onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" placeholder="Password" label="Password" />
            <InputBox 
            // required
            onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type="confirmPassword" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" label="Confirm Password" />
            <br />
            <Btn loading={registerUserStatus.isLoading} width="full" type="sbmit" element="button" btnStyle="bg" color="success">Create Account</Btn>
        </form>
    </Account>
    )
  )
}

export function ConfirmEmail({isActive , email , validModal}) {
  const {activationAccount_Status , resendEmail_Status} = useSelector(s => s.users)
  const dispatch = useDispatch()
  const {activationCode} = useParams()
  const [resendActive , setResendActive] = useState(false)
  const [counter, setCounter] = useState(120);
  
  const resendEmailHandle = () => {
    console.log(email);
    dispatch(resendEmail(email)).then(docs => {
      if(docs.type === "resendEmail/fulfilled"){
        console.log("object is activated");
        setResendActive(false)
      }
    })
  }
  useEffect(() => {
    if(!resendActive){
      const intervalId = setInterval(() => {
        if (counter > 0) {
          setCounter((prevCounter) => prevCounter - 1);
          console.log('Interval running...');
        } else {
          clearInterval(intervalId);
          setResendActive(true)
          setCounter(120)
          console.log('Interval cleared.');
        }
      }, 1000);
    return () => clearInterval(intervalId);
    }
  }, [counter , resendActive]);

  useEffect(() => {
    if(isActive){
      dispatch(activationAccount(activationCode))
      console.log(activationCode);
    }
  }, [])
  
  return (
    <Account page={false}>
      {resendEmail_Status.error && (
        <Alert type="danger">{resendEmail_Status.error}</Alert>
        )}
            {resendEmail_Status.success && (
              <Alert type="success">{resendEmail_Status.success}</Alert>
      )}
{
  isActive ? (
    <Loading showError={true} status={activationAccount_Status}>
      {activationAccount_Status.error ? (
        <ModalValidationStatic type="error" title="Activation account" message="Oops, il y a un probléme ..." path="/admin/account/register" validModal="" status="" btnContent="Go to register"/>
      ) : (
        <ModalValidationStatic type="success" title="Activation account" message="Activation account was successful" path="/admin/account/login" validModal="" status="" btnContent="Login in your account"/>
      )}
    </Loading>
    ) : (
      <>
        <ModalValidationStatic counter={counter} type="error" title="Activation account" message={<><div style={{fontSize: "18px", fontWeight: "bold", marginBottom: "5px"}}>{email}</div>Please check your mailbox</>} path="" validModal={resendEmailHandle} btnContent="Resend Email" status={resendEmail_Status} BtnDisabled={!resendActive}/>
      </>
  )
}
    </Account>
  ) 
    // <Account page="Activer Votre Compte">activer</Account>
}

export function ForgotPassword() {
const navigate = useNavigate()
const {loginUserStatus , forgotPassword_Status} = useSelector(s => s.users)
const dispatch = useDispatch()
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const signIn = useSignIn()

const forgotPasswordHandle = (e) => {
  e.preventDefault()
  dispatch(forgotPassword(email))
}
return (
  <>
  {forgotPassword_Status.success && (
    <Alert type="success">{forgotPassword_Status.success}</Alert>
  )}
    {forgotPassword_Status.error && (
    <Alert type="danger">{forgotPassword_Status.error}</Alert>
  )}
  <Account page="Forgot password">
      <form onSubmit={forgotPasswordHandle} action="">
          <InputBox required onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="email" placeholder="Email" label="Email" />
          <Btn loading={forgotPassword_Status.isLoading} width="full" type="sbmit" element="button" btnStyle="bg" color="success">Forgot password</Btn>
      </form>
  </Account>
  </>
)
}
export function ForgotChangePassword(){
  const {forgotChangePassword_Status} = useSelector(s => s.users)
  const dispatch = useDispatch()
  const [showModal , setShowModald] = useState(false)
  const [password , setPassword] = useState("")
  const [confirmPassword , setConfirmPassword] = useState("")
  const {forgotPasswordCode} = useParams()
  const forgotChangePasswordHandle = (eo) => {
    eo.preventDefault()
    dispatch(forgotChangePassword({forgotPasswordCode , passwordObj: {password , confirmPassword}})).then(docs => {
      if(docs.type === "forgotChangePassword/fulfilled" && docs.payload.success === true){
        setShowModald(true)
      }
    })
  }
  
  return (
    <>
      {/* {forgotChangePassword_Status.success && (
    <Alert type="success">{forgotChangePassword_Status.success}</Alert>
  )} */}
    {forgotChangePassword_Status.error && (
    <Alert type="danger">{forgotChangePassword_Status.error}</Alert>
  )}
  {showModal ? (
     <ModalValidationStatic type="success" title="Password Saved" message="Your password save with successfully" path="/admin/account/login" validModal="" status="" btnContent="Login"/>
  ) : (
    <Account page={"New Password"}>
      <form onSubmit={forgotChangePasswordHandle} action="">
            <InputBox required onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" placeholder="Password" label="Password" />
            <InputBox required onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type="confirmPassword" name="confirmPassword" id="confirmPassword" placeholder="confirmPassword" label="confirmPassword" />
            <Btn loading={forgotChangePassword_Status.isLoading} width="full" type="sbmit" element="button" btnStyle="bg" color="success">Save Password</Btn>
        </form>

    </Account>
  )}
    </>
  ) 
    // <Account page="Activer Votre Compte">activer</Account>
}