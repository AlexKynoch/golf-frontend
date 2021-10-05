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

    getSessions() {
        return this.apiCall("get", url + 'sessions')
    }

    getUsers() {
        return this.apiCall("get", url + 'user')
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

    getLocations() {
        return this.apiCall("get", url + 'location')
    }

    getUserByRole(role) {
        return this.apiCall("get", `${url}userrole/${role}`)
    }

    addSession() {
        return this.apiCall("post", url + 'session')
    }
}