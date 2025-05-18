import SignUpPage from "./pages/SignUpPage";
import LoginUpPage from "./pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPAge";
import AdmingPage from "./pages/AdmingPage";
import ProtectedRoute from "../context/ProtectedRoute";
import UnAuthorizedPage from "./pages/UnAuthorizedPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUpPage />} />
      <Route path="/login" element={<LoginUpPage />} />
      <Route element={<ProtectedRoute allowedRoles={['user']} />}>
          <Route path="/user" element={<UserPage />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdmingPage />} />
        </Route>
      <Route
      path="/admin"
      element={
        <AdmingPage/>
      }
      />

      <Route path='/unauthorized'
      element={
        <UnAuthorizedPage/>
      }
      />

    </Routes>
  );
}

export default App;
