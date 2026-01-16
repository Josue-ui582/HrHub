import { Route, Routes } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"
import ProtectedRoute from "./routes/protectedRoute"
import UserDashboard from "./pages/users/userDashboard"
import AdminDashboard from "./pages/admin/adminDashboard"
import AdminHistory from "./pages/admin/adminHistory"
import UserHistory from "./pages/users/userHistory"
import NotFound from "./pages/notFound"


function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['user']}>
            <UserDashboard />
            <UserHistory />
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
            <AdminHistory />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}

export default App;