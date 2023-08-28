import { asyncCallApiPostAsJson, asyncCallApiPatchAsJson, callApi, callApiPostAsJson, callApiPutAsJson, callGetApi, uploadFileNodeApi } from './CommonMethod'
import endpoints from '../utils/apiUrl.json'
import types from '../utils/type.json'
// import { getTokenBalance } from '../utils/utils'
export default {
    getApiToken: async () => {
        debugger
        let body = {
            "secretName": types.ApiSecret[0].secretName,
            "password": types.ApiSecret[0].password
        }
        if (!sessionStorage.getItem("apiToken")) {
            let response = await asyncCallApiPostAsJson(endpoints.getUserType, null, body, null);
            if (response && response.data && response.data.data) {
                sessionStorage.setItem("apiToken", response.data.data.token)
                return response.data.data.token
            }
        }
        else {
            return sessionStorage.getItem("apiToken")
        }
    },
    getConvertApiUrl(endpoint) {
        return endpoints.url + endpoint
    },

    login: async function (body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await asyncCallApiPostAsJson(endpoints.login, token, body, null);
        return response
    },

    signUp: async function (body = null, _cb = null) {
        debugger
        let token = await this.getApiToken()
        let response = await asyncCallApiPostAsJson(endpoints.signUp, token, body, null);
        return response;
    },
    getCatergory: async function (_body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await callGetApi(endpoints.categoryAll, token);
        return response
    },
    getSubCatergory: async function (_body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await callGetApi(endpoints.subCategoryAll, token);
        return response
    },

    getAllCareer: async function (_body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await callGetApi(endpoints.allCareer, token);
        return response
    },
    getAllRolelist: async function (_body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await callGetApi(endpoints.allRoleList, token);
        return response
    },
    getRoleById: async function (id, _body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await callGetApi(endpoints.roleId + id, token);
        return response
    },
    updateRole: async function (body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await asyncCallApiPatchAsJson(endpoints.updateRole + body.id, token, body, null);
        return response;
    },
    addCareer: async function (body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await asyncCallApiPostAsJson(endpoints.addCareer, token, body, null);
        return response;
    },
    uploadFile: async function (body = null, _cb = null) {
        let token = await this.getApiToken()
        const formData = new FormData();
        formData.append("file", body.file);
        formData.append("body", body.file.name);

        let response = await uploadFileNodeApi(formData, token)
        return response

    },
    addCategory: async function (body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await asyncCallApiPostAsJson(endpoints.addCategory, token, body, null);
        return response;
    },
    updateCategory: async function (body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await asyncCallApiPatchAsJson(endpoints.updateCategory + body.id, token, body, null);
        return response;
    },
    addSubCategory: async function (body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await asyncCallApiPostAsJson(endpoints.addSubCategory, token, body, null);
        return response;
    // },
    // getAllSubCategorylist: async function (body = null, cb = null) {
    //     let token = await this.getApiToken()
    //     let response = await callGetApi(endpoints.allSubCategoryList, token);
    //     return response
    },
    updateSubCategory: async function (body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await asyncCallApiPatchAsJson(endpoints.updateSubCategory + body.id, token, body, null);
        return response;
    },
    getSubCategoryById: async function (id, _body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await callGetApi(endpoints.subCategoryId + id, token);
        return response
    },
    addStatus: async function (body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await asyncCallApiPostAsJson(endpoints.addStatus, token, body, null);
        return response;
    },
    getAllStatuslist: async function (_body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await callGetApi(endpoints.allStatusList, token);
        return response
    },
    updateStatus: async function (body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await asyncCallApiPatchAsJson(endpoints.updateStatus + body.id, token, body, null);
        return response;
    },

    getStatusById: async function (id, _body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await callGetApi(endpoints.statusId + id, token);
        return response
    },
    
    addRole: async function (body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await asyncCallApiPostAsJson(endpoints.addRole, token, body, null);
        return response;
    },

    getAllUserlist: async function (_body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await callGetApi(endpoints.allUserList, token);
        return response
    },

    getCategoryById: async function (id, _body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await callGetApi(endpoints.categoryId + id, token);
        return response
    },
    addBank: async function (body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await asyncCallApiPostAsJson(endpoints.addBank, token, body, null);
        return response;
    },
    getBankById: async function (id, _body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await callGetApi(endpoints.bankId + id, token);
        return response
    }, 
    addOfferLetter: async function (body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await asyncCallApiPostAsJson(endpoints.addOfferLetter, token, body, null);
        return response;
    },
    getAllOfferLetter: async function (_body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await callGetApi(endpoints.allOfferLetterList, token);
        return response
    },
    updateOfferLetter: async function (body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await asyncCallApiPatchAsJson(endpoints.updateOfferLetter + body.id, token, body, null);
        return response;
    },

    getOfferLetterById: async function (id, _body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await callGetApi(endpoints.offerLetterId + id, token);
        return response
    }, 
    addAppointmentLetter: async function (body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await asyncCallApiPostAsJson(endpoints.addAppointmentLetter, token, body, null);
        return response;
    },
    getAllAppointmentLetter: async function (_body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await callGetApi(endpoints.allAppointmentLetterList, token);
        return response
    },
    updateAppointmentLetter: async function (body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await asyncCallApiPatchAsJson(endpoints.updateAppointmentLetter + body.id, token, body, null);
        return response;
    },

    getAppointmentLetterById: async function (id, _body = null, _cb = null) {
        let token = await this.getApiToken()
        let response = await callGetApi(endpoints.appointmentLetterId + id, token);
        return response
    }
}
