import './PageNotFound.scss'
import pageNotFound from '../../../Assets/404.jpg'
import Btn from '../Btn/Btn'
export default function PageNotFound({to}) {
  return (
    <div className='PageNotFound'>
      <div className="not-found-image">
        <img src={pageNotFound} alt="404,Page Not Found." />
        <Btn width="full" element="a" to={to}>Home Page</Btn>
      </div>
    </div>
  )
}
