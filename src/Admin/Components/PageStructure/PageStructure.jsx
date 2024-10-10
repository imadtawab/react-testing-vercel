import EmptyErrorSection from "../../../MainComponent/EmptyErrorSection/EmptyErrorSection"
import "./PageStructure.scss"
import Loading from '../../../MainComponent/Loading/Loading'
import Btnx from "../Btnx/Btnx"


export default function PageStructure({key , children , title , button , personelButton, length, loading}) {
    // children = content
    // title = h1
    // button = {type, href, name}
  return (
    <article key={key} className="PageStructure">
        <div className="head">
            <h1>{title}</h1>
            {button && (
               <Btnx onClick={button.onClick} color="success" btnStyle="bg" element={button.type ? button.type : "a"} to={button.href}> {button.icon ? <div className="icon">{button.icon}</div> : ""} {button.name}</Btnx>
            )}
            {personelButton && (personelButton)}
        </div>
        {loading ? <Loading loading={true}/> : (typeof(length) === "number" ? (length > 0 ? children : <EmptyErrorSection/>) : children)}
    </article>
  )
}
