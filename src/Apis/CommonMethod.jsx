//const custJson = require('./type.json')
import custJson from './JSON/type.json'
import endpoints from './JSON/apiUrl.json'
import axios from 'axios'
//import S3 from 'react-aws-s3'
//import { navigate } from '@reach/router'
const headers = (token = null,) => {
    /* Uncomment beare token if its required
      const bearer = `Bearer ${token}`;
       headers.append("Authorization", bearer);
   */
    const headers = {
        "Content-Type": custJson.headerContent.appJson,
        "Accept": custJson.headerContent.accept,
        "Access-Control-Allow-Origin": '*',
        "Auth": token
    }
    return headers
}

export const callApi = (endpoint, token, callback) => {
    endpoint = getApiUrl(endpoint)
    axios.get(endpoint, { headers: headers(token) }).then(response => { getTokenFromHeader(response); responseStatus(response); callback(response.data, endpoint) })
        .catch(error => errorResponse(error, callback, endpoint));

}
export const callApiPostAsJson = (endpoint, token, body, uploads, callback) => {
    endpoint = getApiUrl(endpoint)

    axios.post(endpoint, body, { headers: headers(token) }).then(response => { getTokenFromHeader(response); responseStatus(response); callback(response.data, endpoint) })
        .catch(error => errorResponse(error, callback, endpoint));

}
export const callApiPutAsJson = (endpoint, token, body, uploads, callback) => {
    endpoint = getApiUrl(endpoint)
    axios.put(endpoint, body, { headers: headers(token) }).then(response => { getTokenFromHeader(response); callback(response.data, endpoint) })
        .catch(error => errorResponse(error, callback, endpoint));
    responseStatus()
}
export const errorResponse = (error, callback, endpoint) => {
    console.log(error)
    //console.log('Something Went Wrong! Or Network Connection Error. Check your Internet connection. Check any cables and reboot any routers, modems, or other network devices you may be using.')
    return callback(JSON.stringify({ success: false, error }), endpoint)
}

export const asyncCallApiPostAsJson = async (endpoint, token, body, uploads) => {
    endpoint = getApiUrl(endpoint);
    console.log(endpoint);
    console.log(body);
    let response = await axios.post(endpoint, body, { headers: headers(token) })
        .then((response) => { getTokenFromHeader(response); return response })
        .catch((error) => { return error });
    responseStatus(response)
    return response
}

export const asyncCallApiPatchAsJson = async (endpoint, token, body, uploads) => {
    endpoint = getApiUrl(endpoint);
    console.log(endpoint);
    console.log(body);
    let response = await axios.patch(endpoint, body, { headers: headers(token) })
        .then((response) => { getTokenFromHeader(response); return response })
        .catch((error) => { return error });
    responseStatus(response)
    return response
}
export const callGetApi = async (endpoint, token) => {
    endpoint = getApiUrl(endpoint)
    let response = await axios.get(endpoint, { headers: headers(token) })
        .then(response => { getTokenFromHeader(response); return response })
        .catch(error => { return error });
    responseStatus(response)
    return response
}

export const mapTwoObjectProps = (obj1, obj2) => {
    let newObj = { ...obj1 }
    for (let key in obj1) {
        let prop = (key + '').toLowerCase()
        for (let key2 in obj2) {
            if (obj2.hasOwnProperty(key2) && prop == (key2 + '').toLowerCase()) {
                newObj[key] = obj2[key2]
            }
        }
    }
    return newObj
}
export const getApiUrl = (endpoint) => {
    return endpoints.url + endpoint
}
export const getTokenFromHeader = (res) => {
    if (res && res.headers.token) {
        sessionStorage.setItem("apiToken", res.headers.token)
    }
}
export const GlobalDebug = (function () {
    var savedConsole = console;
    /**
    * @param {boolean} debugOn
    * @param {boolean} suppressAll
    */
    return function (debugOn, suppressAll = false) {
        var suppress = suppressAll || false;
        if (debugOn === false) {
            // supress the default console functionality
            // console = {};
            console.log = function () { };
            // supress all type of consoles
            if (suppress) {
                console.info = function () { };
                console.warn = function () { };
                console.error = function () { };
            } else {
                console.info = savedConsole.info;
                console.warn = savedConsole.warn;
                console.error = savedConsole.error;
            }
        } else {
            console = savedConsole;
        }
    };
})();


export const uploadFileNodeApi = async (formBody, token, cb = null) => {

    const res = await axios.post(
        endpoints.uploadFile,
        formBody, { headers: { "Content-Type": "multipart/form-data", "Auth": token } }
    ).then((response) => { getTokenFromHeader(response); return response })
        .catch((error) => { return error });
    // const res = await fetch(endpoints.uploadFile, {
    //     method: 'POST',
    //     body: formData,
    // })   
    console.log(res, 'file uploaded');
    return res;

};
export const responseStatus = (response = null) => {
    if (response && response.statusCode == 401) {
        //navigate("/logIn")
    }
    else {
        return true
    }
    console.log(response)
    console.log(response.statusText)
    console.log(response.status)
}
