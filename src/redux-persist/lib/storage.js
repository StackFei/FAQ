export default {
    setState(key, value) {
        localStorage.setItem(key, value)
    },
    getState(key) {
        return localStorage.getItem(key)
    }
}