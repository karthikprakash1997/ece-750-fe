import axios from 'axios';

export function createAction(type, payload) {
  return payload === undefined ? { type } : { type, payload };
}

const handleErrors = (error) =>{
  console.error(error)
}

export const apiCall = async (apiConfig, promisePayload) => {
  try {
    let url = apiConfig.url||`${process.env.API_BASE_URL}${apiConfig.apiPath}`;

    const requestConfig = {
      url,
      method: apiConfig.action,
      data: apiConfig.data,
      headers: apiConfig.headers || defaultHeader(),
      params: apiConfig.params,
      timeout: 0,
      validateStatus(status) {
        return status >= 200 && status <= 500;
      }
    };

    const response = await axios(requestConfig)
      .then((res) => {
        return {
          ...res,
          ...(promisePayload && { promisePayload })
        };
      })
      .catch((error) => handleErrors(error));

    return response;
  } catch (ex) {
    return false;
  }
};

export const defaultHeader = () => {
  // let token = store.getState().login.activeUser?.token || null;
  // store.subscribe(() => {
  //   token = store.getState().login.activeUser?.token || null;
  // });
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    requestStartTime: new Date()
  };
  // if (token) {
  //   headers['X-Rallio-API-Key'] = token;
  // } else indexedDB.deleteDatabase('localforage');
  return headers;
};