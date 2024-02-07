import {createBrowserRouter} from "react-router-dom";
import Layout from "@/pages/layout/layout";
import Login from "@/pages/login/login";
import Article from "@/pages/article/article";
import Publish from "@/pages/publish/publish";
import Home from "@/pages/home/home";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout></Layout>,
        children: [
            {
                path: 'article',
                element: (<Article></Article>)
            },
            {
                path: 'publish',
                element: (<Publish></Publish>)
            },
            {
                index: true,
                // path: 'home',
                element: (<Home></Home>)
            }
        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    }
])

export default router