import './Loading.scss'

export default function Loading({loading,children}) {
  return loading ? <div className="Loading">
    <span className="circle"></span>
  </div> : children
}
