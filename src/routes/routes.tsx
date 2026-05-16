import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout/PublicLayout";
import Landing from "@/pages/Landing";
import Temp from "@/pages/Temp";
import Login from "@/pages/Login";
import HomePageLayout from "@/layouts/home/HomePageLayout";
import ProtectedLayout from "@/layouts/home/ProtectedLayout";
import { homeItems } from "@/config/homeItems";
import RoleGuard from "@/components/home/RoleGaurd";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout />,
        // errorElement: (
        // 	<Error404 />
        // ),
        children: [
            {
                index: true,
                element: <Landing />,
            },
            {
                path: "/temp",
                element: <Temp />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                element: <ProtectedLayout />,
                children: [
                    {
                        element: <HomePageLayout />,
                        path: "/home",
                        children: homeItems.map((item) => ({
                            path: item.path,
                            element: (
                                <RoleGuard roles={item.roles}>
                                    {item.component}
                                </RoleGuard>
                            ),
                        })),
                    },
                ],
            },
            // {
            // 	path: "/AboutUs",
            // 	element: <AboutUs />,
            // },
            // {
        ],
    },
    // {
    // 	element: <PrivateLayout />,
    // 	children: [
    // 		{
    // 			path: "/EditProfile",
    // 			element: <EditProfile />,
    // 		},
    // 		{
    // 			path: "/DashBoard",
    // 			element: <DashBoard />,
    // 		},
    // 	],
    // },
    // {
    // 	element: <AnotherLayout />,
    // 	children: [
    // 		{
    // 			path: "/login",
    // 			element: <Login />,
    // 		},
    // 		{
    // 			path: "/temp",
    // 			element: <Temp />,
    // 		},
    // 	],
    // },
]);
