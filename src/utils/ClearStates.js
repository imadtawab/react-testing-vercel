 const ClearStates = (state , initState , action) => {
    if(action.payload){
        if (Array.isArray(action.payload)) {
          let newStates = {}
          action.payload.forEach(s => {
            newStates[s] = initState[s]
          })
          return {
            ...state,
            ...newStates
          }
        }else{
          return {
            ...state,
            [action.payload]: initState[action.payload]
          }
        }
      }
        console.log(action.payload);
        return state
}
export default ClearStates