export const saveKeyValue = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
}

export const getKey = (key) => {
    return JSON.parse(sessionStorage.getItem(key));
}