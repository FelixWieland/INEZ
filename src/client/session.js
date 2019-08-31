
export const hasSession = () => window.sessionStorage.getItem('jwt') !== null ? true : false
