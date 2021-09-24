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
        return this.apiCall("get", url);
    }

    addSession(date, volunteer) {
        return this.apiCall("post", url, { date, volunteer });
    }

    addUser(userName, password) {
    return this.apiCall('post', url + 'user', {userName, password})
    }

  async login(userName, password) {
    return await axios({
      method: 'POST',
      url: `${url}auth`,
      data: {
        userName,
        password,
      }
    })
  }    

}
