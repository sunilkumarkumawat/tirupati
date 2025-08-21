// src/App.jsx
import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect } from "react";
import Login from './components/LoginPage';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import AppointmentView from './pages/appointments/View';
import AppointmentBook from './pages/appointments/BookAppointment';
import AppointmentCalender from './pages/appointments/AppointmentCalender';
import Employee from './pages/Employee';
import Contact from './pages/Contact';
import List from './pages/task/List';
import WhatsappTemplate from './pages/WhatsappTemplate';
import { AppContext } from '../src/context/AppContext';
import "../src/assets/scss/style.scss";
import Registration from './pages/registration/registration';

function App() {
  const { isAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes under MainLayout */}
      <Route
        path="/dashboard"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />
      <Route
        path="/registration/registration"
        element={
          <MainLayout>
            <Registration />
          </MainLayout>
        }
      />
      <Route
        path="/appointments/calendar"
        element={
          <MainLayout>
            <AppointmentCalender />
          </MainLayout>
        }
      />
      <Route
        path="/appointments/view"
        element={
          <MainLayout>
            <AppointmentView />
          </MainLayout>
        }
      />
      <Route
        path="/appointments/book"
        element={
          <MainLayout>
            <AppointmentBook/>
          </MainLayout>
        }
      />
      <Route
        path="/employees"
        element={
          <MainLayout>
            <Employee />
          </MainLayout>
        }
      />
      <Route
        path="/contacts"
        element={
          <MainLayout>
            <Contact />
          </MainLayout>
        }
      />
      <Route
        path="/tasks/list"
        element={
          <MainLayout>
            <List />
          </MainLayout>
        }
      />
      <Route
        path="/whatsapptemplate"
        element={
          <MainLayout>
            <WhatsappTemplate />
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default App;
