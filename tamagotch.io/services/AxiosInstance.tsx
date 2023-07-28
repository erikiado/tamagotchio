import axios, {AxiosResponse, RawAxiosResponseHeaders,AxiosResponseHeaders, AxiosRequestConfig} from 'axios';
// import { getFromStorage, setToStorage } from '../services/LocalStorage';
// import { parsePossibleLambdaResponse }  from '../services/LambdaBridge';
// import { AUTH_SERVICE, BASE_URL } from '../constants';
// import { setupCache, AxiosCacheInstance, buildWebStorage } from 'axios-cache-interceptor';

let axiosApi = axios.create({
  // baseURL: 'http://localhost:3998/',
  baseURL: "",
  timeout: 10000,
  // timeout: 2000,
  // headers: {'Access-Control-Allow-Origin': '*'}
});
//  as AxiosCacheInstance;

// axiosApi = setupCache(axiosApi, {
//   // storage: buildWebStorage(localStorage, 'axios-cache:')
// });

export const parseFiberResponse = (response: any, expectedStatus: number) => {
  // console.log({expectedStatus, response})
  if(response.status !== expectedStatus){
    console.log(`${response.status} received is not expected ${expectedStatus}`)
    throw response;
  }
  console.log(response.data)
  
  const fiberResponse = response.data;
  // console.log('fiberResponse');
  // console.log(fiberResponse);
  return fiberResponse;
};

// const getRefreshToken = async (headers: any) => {
//   const res = await axios.get(AUTH_SERVICE + "/refresh-token", {headers:headers});
//   return res.data;
// };

export interface FiberResponse<T = any, D = any> {
  data: T;
  statusCode: number;
}

let refreshing = false;

axiosApi.interceptors.request.use(async function (config) {

  // let version = null;
  // if (Constants.manifest !== null) {
  //   version = Constants.manifest.version
  // }

  // let token = getFromStorage('accessToken');
  // const lastUpdate = getFromStorage('lastTokenUpdate');

  // let serviceUrl = BASE_URL;
  // const servicePath = "";
  // if(Object.keys(BASE_URLS).indexOf(servicePath) > -1){
  //   serviceUrl = BASE_URLS[servicePath];
  // }
  // config.baseURL = serviceUrl;
  // config.baseURL = BASE_URL;

  // const refreshToken = getFromStorage('refreshToken');

  // if(refreshToken && !refreshing && parseInt(lastUpdate!) + 1250 * 1000 < Date.now()){
  //   // refreshing = true;

  //   const headers = { "Authorization": "Bearer " + refreshToken}
  //   const refreshReq = await getRefreshToken(headers);
  //   // const refreshParsed = parsePossibleLambdaResponse(refreshReq);
  //   const refreshData = JSON.parse(refreshReq.body).data;
  //   token = refreshData.access_token;
  //   setToStorage("accessToken", refreshData.access_token);
  //   setToStorage("lastTokenUpdate", Date.now());
  //   console.log("======> access token refreshed!")
  //   // refreshing = false;
  // }

  // if (token !== null && token !== undefined) {
  //   config.headers!["Authorization"] = "Bearer " + token;
  // }
  config.headers!["Accept"] = "application/json";
  config.headers!["Content-Type"] = "application/json";

  return config;
});

// axiosApi.interceptors.response.use((value: AxiosResponse<any, any>) => {
//   const parsedResponse = parsePossibleLambdaResponse(value);
//   return parsedResponse;
// })

export default axiosApi;
