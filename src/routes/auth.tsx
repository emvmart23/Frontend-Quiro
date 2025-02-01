import AuthLayout from "../layout/AuthLayout";
import LoginCard from "@/page/auth/components/Logincard";

const createAuthRoute = (element: React.ReactNode) => (
    <AuthLayout>{element}</AuthLayout>
)

const authRouter = [
    {
        path: "/login",
        element: createAuthRoute(<LoginCard/>),
    },
    {
        path: "/register",
        element: createAuthRoute(<div></div>),
    }
]

export default authRouter;