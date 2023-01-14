export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('token'));

    if (user && user.token) {
        return {
            Authorization: 'Bearer ' + user.token
        }
    } else {
        return {};
    }
}