import {createBrowserRouter} from "react-router-dom";
import Layout from "@/pages/layout/layout";
import Login from "@/pages/login/login";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout></Layout>
    },
    {
        path: '/login',
        element: <Login></Login>
    }
])

export default router