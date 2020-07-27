export const setToken = ({payload}) => {
    localStorage.setItem('token', payload)
    return payload;
}

export const getToken = () => {
    const token = localStorage.getItem('token')
    return token;
}

export const clearToken = ({payload}) => {
    localStorage.removeItem('token')
    return payload.data.token;
}