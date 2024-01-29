import './FlexSections.scss'

export default function FlexSections({children , style , wrap , direction , alignItems}) {
  return (
    <div style={style} className={`FlexSections ${wrap ? "wrap" : ""} ${direction ? direction : ""} ${alignItems ==="end" ? "alignItems-end" : ""}`}>
        {children}
    </div>
  )
}
