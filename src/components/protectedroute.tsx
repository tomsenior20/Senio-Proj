import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const loggedIn = localStorage.getItem("logged_in_name");

    if (!loggedIn) {
        return <Navigate to="/" replace />;
    }

    return children;
}
