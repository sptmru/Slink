export const addUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
}

export const getUser = () => {
  return JSON.parse(localStorage.getItem('user'));
}

export const logOut = () => {
  localStorage.removeItem('user');
}

