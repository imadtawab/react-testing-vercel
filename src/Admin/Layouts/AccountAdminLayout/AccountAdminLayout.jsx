import './AccountAdminLayout.scss'
import Logo from '../../Components/Logo/Logo'
import { Navigate, Outlet } from 'react-router-dom'
import decodedCookies from '../../Utils/cookieUtils'

export default function AccountAdminLayout() {

  const {_auth} = decodedCookies()
  if(_auth) return <Navigate to="/admin" replace/>

  return (
    <main className='AccountAdminLayout'>
        <article className="left-account">
            <Logo/>
        </article>
        <article className="right-account">
            <Outlet/>
        </article>
    </main>
  )
}
