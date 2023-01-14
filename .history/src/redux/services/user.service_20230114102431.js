
const APi_URL = 'https://alfront.atmatech.id/'

const login = (email, password) => {
    return axios.post(APi_URL + '/auth/login', {
        email,
        password
    })
    .then((response) =>{
        if (response.data.token) {
            localStorage.setItem('token', JSON.stringify(response.data));
        }

        return response.data
    })
}