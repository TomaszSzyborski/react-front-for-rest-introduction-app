import axios from 'axios';
import {reactorBackendConfig} from './config';

class ReactorBackend {
    constructor(reactorBackendConfig) {
        this.config = reactorBackendConfig;
        this.client = axios.create(this.config);
        this.client.interceptors.request.use((config) => {
          config.headers['X-Forwarded-Host'] = 'reactor-backend';
          return config;
        });
        this.client.interceptors.response.use((response) => {
          response.headers['Access-Control-Allow-Origin'] = '*';
          return response;
        });
    }
}
const reactorBackend = new ReactorBackend(reactorBackendConfig);
export { reactorBackend }