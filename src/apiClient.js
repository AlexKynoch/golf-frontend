import axios from "axios"
const url = "https://golf-dka.herokuapp.com/"

export class ApiClient {

    apiCall(method, url, data) {
        return axios({
            method,
            url,
            data,
        }).catch((error) => {
            console.log(error)
            if (error.response.status === 403) {
                return Promise.reject()
            } else {
                throw error;
            }
        });
    }

    getSessions() {
        return this.apiCall("get", url + 'sessions');
    }

    getUsers() {
        return this.apiCall("get", url + 'user');
    }

    removeSession(id) {
        return this.apiCall('delete', `${url}session/${id}`)
    }
    
    addSessionUser(id, sessionUsers) {
        return this.apiCall('put', `${url}session/${id}`, { sessionUsers })
    }

    removeSessionUser(id, sessionUsers) {
        return this.apiCall('put', `${url}session/${id}`, { sessionUsers })
    }
}