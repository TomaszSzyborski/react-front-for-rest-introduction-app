
let backendBaseUrl = ""

if (process.env.NODE_ENV === 'development') {
    backendBaseUrl = `http://${process.env.REACT_APP_REACTOR_BACKEND_HOST}:${process.env.REACT_APP_REACTOR_BACKEND_PORT}`
}
else{
    backendBaseUrl = `${process.env.REACT_APP_PRODUCTION_REACTOR_BACKEND_HOST}`
}


export const reactorBackendConfig = {
        baseURL : backendBaseUrl
}