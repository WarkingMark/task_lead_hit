// Шаблоны
import defaultLayout from "@/views/layouts/DefaultLayout";
// Страницы
import NotFound from "@/views/NotFound";
import Autharization from "@/views/auth/Autharization";
import Analysis from "@/views/Analysis";
//Middleware
import {authVerifyToken, ifAuthTokenThenCloseRoute} from "@/middleware/auth";


const IndexRoutes = [
    {
        path : '/',
        component : defaultLayout,
        name : 'Default Layout',
        children : [
            {
                path: ':pathMatch(.*)*',
                name: 'NotFound',
                component: NotFound
            },
            {
                path : '',
                component: Autharization,
                name: 'Autharization',
                meta : {
                    title: 'Autharization',
                    description: 'Autharization page',
                    middleware: [ifAuthTokenThenCloseRoute]
                },
            },
            {
                path: 'analysis',
                component: Analysis,
                name: 'Analysis',
                meta : {
                    middleware : [authVerifyToken],
                    // dynamically inside the page
                }
            }
        ]
    }
]

export default IndexRoutes

