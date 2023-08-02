export let user = null;

export const addUser = (data) => {
    if(typeof data === 'object') {
    user = data;
  } else {
    return;
  }
}

export const isAuth = () => {
  return user ? true : false
}

export const logOut = () => {
  user = null;
}