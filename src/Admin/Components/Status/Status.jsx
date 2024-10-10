import './Status.scss'

export default function Status({type,active}) {
    // in stock
    // outOfStock
    let message = ["active", "not active"]
    if(type === "product") message = ["in stock", "out of stock"]
    if(type === "coupon") message = ["active", "expired"]
  return (
    <div className={`Status${active ? " active" : ""}`}>
        <span className="status-name">{active ? message[0] : message[1]}</span>
  </div>
  )
}
