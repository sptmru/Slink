export const user = null;

export const isAuth = (data) => {
  if(typeof data === 'object') {
    user = data;
    console.log(user)
  } else {
    return 'нет пользователя';
  }
}

// Функция для сохранения информации о залогиненном пользователе
// export const saveLoggedInUser = (user) => {
// 	localStorage.setItem('loggedInUser', JSON.stringify(user));
//   };
  
//   // Функция для получения информации о залогиненном пользователе
//   export const getLoggedInUser = () => {
// 	const loggedInUser = localStorage.getItem('loggedInUser');
// 	return loggedInUser ? JSON.parse(loggedInUser) : null;
//   };
  
//   // Функция для выхода пользователя (очистка информации о статусе входа)
//   export const logoutUser = () => {
// 	localStorage.removeItem('loggedInUser');
//   };