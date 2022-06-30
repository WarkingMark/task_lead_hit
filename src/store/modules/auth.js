import router from "@/router";

const authModuleStore = {
    namespaced : true,
    state : {
    },
    mutations: {

    },
    actions: {
        async auth (id_site = "") {
            const request = await fetch('https://track-api.leadhit.io/client/test_auth', {
                method: 'GET',
                headers : {
                    'Content-Type' : 'application/json',
                    'Api-Key' : '5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo',
                    'Leadhit-Site-Id' : '5f8475902b0be670555f1bb3',
                }
            })
            const response = await request.json();

            if(response.message = "ok") {
                localStorage.setItem('leadhit-site-id', '5f8475902b0be670555f1bb3');
                router.push({name: 'Analysis'});
            }
        },
        exit () {
            localStorage.removeItem('leadhit-site-id');
            router.push({name: 'Autharization'})
        }
    },
    getters : {

    }
}
export default authModuleStore;
