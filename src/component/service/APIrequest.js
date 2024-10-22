

import axios from "../customize/Customize_axios";

const APIservice = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.post('api/v1/participant', data)

}
const GetallUser = () => {
    return axios.get('api/v1/participant/all')
}
const putUpdateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.put('api/v1/participant', data)

}

const DeleteUser = (userId) => {
    return axios.delete('api/v1/participant', { data: { id: userId } })
}
const getUserWithPaginatte = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}

const postLogin = (email, password) => {
    return axios.post(`api/v1/login`, { email, password })
}


const postSignin = (email, username, password) => {
    return axios.post(`api/v1/register`, { email, username, password })
}

export { APIservice, GetallUser, putUpdateUser, DeleteUser, getUserWithPaginatte, postLogin, postSignin };

