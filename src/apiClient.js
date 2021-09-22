import axios from "axios"
const url = "http://localhost:3005/"

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
        return this.apiCall("get", url);
    }

    addSession(date, volunteer) {
        return this.apiCall("post", url, { date, volunteer });
    }
}