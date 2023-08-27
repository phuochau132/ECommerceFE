import { Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLinkTo } from "../../redux/slice/authSlice";

function PrivateRoute({ Page, path }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => {
    return state.auth;
  });
  if (!auth.user) {
    dispatch(setLinkTo(path));
  }
  return auth.user ? Page : <Navigate to="/login" />;
}

export default PrivateRoute;
