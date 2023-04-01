'use strict';

//function getNetworkIP() {
//  axios.get('https://api.ipify.org?format=json')
//}
console.log(process.env.environment);
const environment = process.env.environment || 'production';
const currentIpAddress = "192.168.50.12"
let basePath = 'http://localhost:9011'
if(environment === 'production') {
    basePath = `http://${currentIpAddress}:9011`
}
const config = {
    apiBasePath : basePath
}

export default config;