import axios from "axios"
const url = "https://golf-dka.herokuapp.com/"

export class ApiClient {

    apiCall(method, url, data) {
        return axios({
            method,
            url,
            data,
        }).catch((error) => {
            if (error.response.status === 403) {
                return Promise.reject()
            } else {
                throw error;
            }
        });
    }

    async getSessions() {
        return await this.apiCall("get", url + 'sessions');
    }

    getUsers() {
        return this.apiCall("get", url + 'user');
    }

    removeSession(id) {
        return this.apiCall('delete', `${url}session/${id}`)
    }
    
    addSessionUser(id, sessionUser) {
        return this.apiCall('put', `${url}sessionUser/${id}`, { user: sessionUser } )
    }

    removeSessionUser(id, sessionUser) {
        return this.apiCall('put', `${url}sessionDelUser/${id}`, { user: sessionUser})
    }
}