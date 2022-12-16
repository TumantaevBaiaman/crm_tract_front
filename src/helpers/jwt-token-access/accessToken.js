let accessToken = ''
try{
    accessToken = JSON.parse(localStorage.getItem("authUser"))['access'];
} catch (e) {
    accessToken = null;
}
// const accessToken = JSON.parse(localStorage.getItem("authUser"))['access'] || null;
export default accessToken
