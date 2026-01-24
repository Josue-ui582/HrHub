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
import Home from "./pages/home/home"


function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['USER']}>
            <UserDashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/history" element={
          <ProtectedRoute allowedRoles={['USER']}>
            <UserHistory />
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/history" element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminHistory />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}

export default App;