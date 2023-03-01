import React, { useContext } from "react";
import Header from "./components/Header";
import SignUp from "./pages/auth/SignUp";
import "./App.css";
import Login from "./pages/auth/Login";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import DashboaderHeader from "./components/DashboaderHeader";
import UserState from "./context/UserState";
import { AnimatePresence,  LayoutGroup } from "framer-motion";
import ProtectedRoute from "./routes/ProtectedRoute";
import Settings from "./pages/Settings";

function App() {
  const { state } = useContext(UserState);
  return (
    <div className="app">
      <AnimatePresence exitBeforeEnter>
        <LayoutGroup>
          {!state.user ? <Header /> : <DashboaderHeader />}
          <div className=" h-full flex flex-col justify-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="sign-up" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={
              <ProtectedRoute auth={state.user}>
                <Dashboard />
                </ProtectedRoute>
             } />
              <Route path="/settings" element={
              <ProtectedRoute auth={state.user}>
                <Settings />
                </ProtectedRoute>
             } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </LayoutGroup>
      </AnimatePresence>
    </div>
  );
}

export default App;
