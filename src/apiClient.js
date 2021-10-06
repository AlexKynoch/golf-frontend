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

    getUser(id) {
        return this.apiCall("get", url + `userid/${id}`)
    }

    updateUser(id, dataObj) {
        return this.apiCall("put", url + `user/${id}`, dataObj)
    }



    removeSession(id) {
        return this.apiCall('delete', `${url}session/${id}`)
    }

    addSessionUser(id, sessionUser) {
        return this.apiCall('put', `${url}sessionUser/${id}`, { user: sessionUser })
    }

    removeSessionUser(id, sessionUser) {
        return this.apiCall('put', `${url}sessionDelUser/${id}`, { user: sessionUser })
    }

    getLocations() {
        return this.apiCall("get", url + 'location')
    }

    getUserByRole(role) {
        return this.apiCall("get", `${url}userrole/${role}`)
    }

    addSession(date, volunteer, sessionLocation, sessionTimeStart, sessionTimeFinish, userLimit, details) {
        return this.apiCall("post", url + 'session', { date: date, volunteer: volunteer, sessionUsers: [],  sessionLocation: sessionLocation, 
            sessionTimeStart: sessionTimeStart, sessionTimeFinish: sessionTimeFinish, userLimit: userLimit, details: details })
    }

    updateUser(id, data) {
        return this.apiCall("put", `${url}user/${id}`, data)
    }
}