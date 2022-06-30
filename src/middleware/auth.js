import router from "@/router";

async function authVerifyToken ({next}) {
    const authToken = localStorage.getItem('leadhit-site-id');

    if(!authToken) {
        router.push({name: 'Autharization'});
    } else {
        next();
    }
}

async function ifAuthTokenThenCloseRoute ({next}) {
    const authToken = localStorage.getItem('leadhit-site-id');

    if(authToken) {
        router.push({name: 'Analysis'});
    } else {
        next();
    }
}
export {
    authVerifyToken,
    ifAuthTokenThenCloseRoute,
}
