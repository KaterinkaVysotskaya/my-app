import {Navigate} from "react-router-dom";
import {useAppSelector} from "../hooks/react-redux-hooks";

function PrivateRoute({ children }) {
    const isLoggedIn = useAppSelector(state=>state.auth.isLoggedIn)
    return isLoggedIn ? children : <Navigate to="/login" />;
}

export default PrivateRoute;