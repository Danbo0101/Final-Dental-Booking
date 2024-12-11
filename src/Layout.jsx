import App from "./App";
// import HomePage from './components/HomePage/HomePage';
import { Route, Routes } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import { Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./component/HomePage/HomePage";
import ListDoctor from "./component/User/Doctor/Doctor";
import ListSpecialties from "./component/User/Specialties/Specialties";
import DoctorInfo from "./component/User/Doctor/DoctorInfo";
import BookingSuccess from "./component/User/Booking/BookingSuccess";
import Login from "./component/Auth/Login";
import Register from "./component/Auth/Register";
import Admin from "./component/Admin/Admin";
import Doctor from "./component/Admin/Doctor/Doctor";
import Specialties from "./component/Admin/Specialties/Specialties";
import PrivateRoute from "./routes/PrivateRoute";
import { useSelector } from "react-redux";
import ProfileAdmin from "./component/Admin/Profile";
import ChangePassword from "./component/Admin/ChangePassword";
import HomeDoctor from "./component/Doctor/Doctor";
import Appointment from "./component/Doctor/Appointment/Appointment";
import Service from "./component/Admin/Service/Service";
import Patient from "./component/Doctor/Patient/Patient";

const NotFound = () => {
  return (
    <div className="container mt-4 alert alert-danger">404. NOT FOUND</div>
  );
};

const Layout = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <Suspense fallback="...is loading">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="specialties" element={<ListSpecialties />} />
          <Route path="doctor-list/:id" element={<ListDoctor />} />
          <Route path="doctor-info/:id" element={<DoctorInfo />} />
          <Route path="booking-success" element={<BookingSuccess />} />
        </Route>
        <Route
          path="admin"
          // element={<PrivateRoute allowedRoles={[1]} />}
        >
          <Route element={<Admin />}>
            <Route path="profile-admin" element={<ProfileAdmin />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route index element={<Doctor />} />
            <Route path="specialties" element={<Specialties />} />
            <Route path="services" element={<Service />} />
          </Route>
        </Route>
        <Route
          path="doctor"
          // element={<PrivateRoute allowedRoles={[2]} />}
        >
          <Route element={<HomeDoctor />}>
            <Route index element={<Appointment />} />
            <Route path="patients" element={<Patient />} />
            <Route path="profile-admin" element={<ProfileAdmin />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </Suspense>
  );
};

export default Layout;
