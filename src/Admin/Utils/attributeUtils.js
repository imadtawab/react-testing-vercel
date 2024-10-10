export const addValueHandle = (e, newValue, setNewValue, type, newColor, setNewColor, updateValue,values, setValues, setUpdateValue) => {
    e.preventDefault()
    if(newValue.value === ""){
      setNewValue(prev => ({...prev,error:"Please Enter Value"}))
      return
    }
    if(type === "colorSpans"){
      if(newColor.value === ""){
        setNewColor(prev => ({...prev,error:"Please Enter Color"}))
        return
      }
      if(newColor.value.length !== 7 || !newColor.value.startsWith("#")){
        setNewColor(prev => ({...prev,error:"Please Enter value : #rrggbb"}))
        return
      }
    }
    // if(values.find(v => v.value)){
    //   setNewValue(prev => ({...prev,error:"This value is already"}))
    //   return
    // }
  
    // edit value handle Start
  
    if(updateValue) {
      setValues(prev => prev.map(v => {
        if(v.name === updateValue.name) {
          if(type === "colorSpans") {
            return {
              name: newValue.value,
              color: newColor.value
            }
          }
          return {
            name: newValue.value,
          }
        }
        return v
      }))
      setNewValue({value: "",error: false})
      setNewColor({value: "",error: false})
      setUpdateValue(null)
      return
    }
    // edit value handle End
  
    if(type === "colorSpans"){
      setValues(prev => [...prev,{
        name: newValue.value,
        color: newColor.value,
      }])
    }else{
      setValues(prev => [...prev,{
        name: newValue.value,
      }])
    }
    setNewValue({value: "",error: false})
    setNewColor({value: "",error: false})
    // else{
    //   setNewValue(prev => ({...prev,error:false}))
    // }
  }

  export const attributeTypes = ["dropDown", "colorSpans", "checkBox"]