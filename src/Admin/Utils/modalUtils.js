import store from '../../Store'

export function Modal(show , nextFunc=null,modalInfo) {
    store.dispatch({
      type : "modal/show" ,
      payload : {
          showModal: show,
          nextFunc: nextFunc,
          modalInfo
        }
      })
  }

