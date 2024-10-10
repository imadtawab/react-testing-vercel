import undefined_avatar from '../../Assets/undefined_avatar.png'

export const avatarHandle = (avatar) => {
    if(avatar) return `${process.env.REACT_APP_SERVER_DOMAINE}/media/${avatar}`
    else return undefined_avatar
  }
