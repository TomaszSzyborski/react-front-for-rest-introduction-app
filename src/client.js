import axios from 'axios';
import config from './config';

class FastAPIClient {
  constructor(overrides) {
    this.config = {
      ...config,
      ...overrides,
    };
    this.apiClient = this.getApiClient(this.config);
  }

  getApiClient(config) {
    let initialConfig = {
      baseURL: config.apiBasePath,
    };
    let client = axios.create(initialConfig);
    return client;
  }
}

const client = new FastAPIClient(config);
export default client;

//import config from "./config"
//const axios = require("axios")
//
//
//class FastAPIClient {
//	constructor(overrides) {
//		this.config = {
//			...config,
//			...overrides,
//		}
//
//		this.apiClient = this.getApiClient(this.config)
//	}
//
//	getApiClient(config) {
//		let initialConfig = {
//			baseURL: config.apiBasePath
//		}
//		let client = axios.create(initialConfig)
////		client.interceptors.request.use(localStorageTokenInterceptor)
//		return client
//	}
//}
//
//const client = new FastAPIClient(config)
//export default client
