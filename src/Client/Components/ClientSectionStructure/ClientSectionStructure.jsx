import EmptyErrorSection from '../../../MainComponent/EmptyErrorSection/EmptyErrorSection'
import Loading from '../../../MainComponent/Loading/Loading'
import './ClientSectionStructure.scss'

export default function ClientSectionStructure({key , subTitle, title , children, description, loading, length, emptyMessage}) {
  if(!loading && typeof(length) === "number" && length <= 0 && emptyMessage) return emptyMessage
  return (
    <div key={key} className='ClientSectionStructure'>
        <div className="head">
            <h5>{subTitle}</h5>
            <h2>{title}</h2>
            {description && <p>{description}</p>}
        </div>
        {loading ? <Loading loading={true}/> : (typeof(length) === "number" ? 
        (length > 0 ? <div className="content">
                  {children}
              </div> : <EmptyErrorSection/>) : <div className="content">
                  {children}
              </div>)}
    </div>
  )
}
