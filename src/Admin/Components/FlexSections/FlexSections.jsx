import './FlexSections.scss'

export default function FlexSections({children , style , wrap , direction , alignItems , flex , justify}) {
  return (
    <div style={flex ? {flex: +flex , ...style} : style} className={`FlexSections ${wrap ? "wrap" : ""} ${direction ? direction : ""} ${alignItems ==="end" ? "alignItems-end" : ""}  ${justify ==="end" ? "justify-end" : ""}`}>
        {children}
    </div>
  )
}
