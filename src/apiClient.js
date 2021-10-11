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

    getSessionByLocation(location) {
        return this.apiCall("get", `${url}sessionlocation/${location}`)
    }

    getUsersByLocation(location) {
        return this.apiCall("get", `${url}userlocation/${location}`)
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

    updateUserProfile(id, username, firstname, lastname, location, emaildata, phonedata) {
        return this.apiCall("put", url + `user/${id}`, {
            userName: username, nameFirst: firstname, nameLast: lastname,
            location: location, email: emaildata, phone: phonedata
        })
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
        return this.apiCall("post", url + 'session', {
            date: date, volunteer: volunteer, sessionUsers: [], sessionLocation: sessionLocation,
            sessionTimeStart: sessionTimeStart, sessionTimeFinish: sessionTimeFinish, userLimit: userLimit, details: details
        })
    }

    getLocationByCGA(activeCGA) {
        return this.apiCall('get', `${url}locationcga/${activeCGA}`)
    }

    getUserByLocation(location) {
        return this.apiCall('get', `${url}userlocation/${location}`)
    }

    getAdminById(id) {
        return this.apiCall('get', `${url}adminid/${id}`)
    }

    getAdminByLocation(location) {
        return this.apiCall('get', `${url}adminlocation/${location}`)

    }

    getAdmins() {
        return this.apiCall('get', url + 'admin')
    }

    addLocation(data) {
        return this.apiCall('post', url + 'location', data)
    }

    addCga(username, password, locationdata, emaildata, phonedata, namef, namel) {
        return this.apiCall('post', url + 'admin', { userName: username, password: password, location: locationdata, 
            role: "CGA", email: emaildata, phone: phonedata, nameFirst: namef, nameLast: namel })
    }

    getCgaByLocation(location) {
        return this.apiCall('get', `${url}cgalocation/${location}`)
    }
}