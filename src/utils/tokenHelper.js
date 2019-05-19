export const setToken = token => sessionStorage.setItem('GAT', token);

export const getToken = () => sessionStorage.getItem('GAT');

export const removeToken = () => sessionStorage.removeItem('GAT');
