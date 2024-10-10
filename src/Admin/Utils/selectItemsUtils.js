export const itemsSelectedHandler = (e, setItemsSelected) => {
    setItemsSelected(prev => e.target.checked ? [...prev, e.target.id] : prev.filter(i => i !== e.target.id))
  }
export const selectAllItemsHandler = (e, setItemsSelected, array) => {
setItemsSelected(prev => e.target.checked ? array.map(a => a._id) : [])
    let selectOneCheckboxs = document.querySelectorAll("[name=selectOne]")
    // selectOne Checkbox Handle
    selectOneCheckboxs.forEach(i => {
        i.checked = e.target.checked
    });
}
export const selectAllActivingHandler = (itemsSelected, array) => {
    let selectAllCheckbox = document.querySelector("[name=selectAll]")
    if (!selectAllCheckbox) return
    // selectAll Checkbox Handle
    if (itemsSelected.length === array.length) {
      selectAllCheckbox.checked = true
    }else {
      selectAllCheckbox.checked = false
    }
}