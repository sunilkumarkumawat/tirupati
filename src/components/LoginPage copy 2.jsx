import { useState,useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AppContext } from "../context/AppContext.jsx";
import {
  User,
  Stethoscope,
  Shield,
  Hospital,
  Heart,
  Activity,
  ChevronLeft,
  Lock,
  Mail,
} from "lucide-react";

export default function Login() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const { loggedIN } = useContext(AppContext);
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("roleSelection"); // "roleSelection" or "login"
  const [selectedRole, setSelectedRole] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [responseError, setResponseError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const roles = [
    {
      id: "admin",
      title: "Administrator",
      description: "System administration and management",
      icon: Shield,
      color: "from-purple-600 to-purple-800",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      id: "doctor",
      title: "Doctor",
      description: "Medical professionals and consultants",
      icon: Stethoscope,
      color: "from-blue-600 to-blue-800",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      id: "patient",
      title: "Patient",
      description: "Patient portal and medical records",
      icon: User,
      color: "from-green-600 to-green-800",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setResponseError("");

     try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        username: formData.email,
        password: formData.password,
      });

      const access_token = response.data.access_token;
      const userData = response.data.user;

      loggedIN(access_token, userData);

      navigate("/dashboard");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      setResponseError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "password") checkPasswordStrength(value);
  };

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setCurrentView("login");
    setFormData({ email: "", password: "", rememberMe: false });
    setErrors({});
    setResponseError("");
  };

  const handleBackToRoles = () => {
    setCurrentView("roleSelection");
    setSelectedRole("");
    setFormData({ email: "", password: "", rememberMe: false });
    setErrors({});
    setResponseError("");
  };

  // ROLE SELECTION VIEW
  if (currentView === "roleSelection") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-3 rounded-2xl shadow-lg">
                <Hospital className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
              MediCare HMS
            </h1>
            <p className="text-xl text-gray-600 mb-2">Hospital Management System</p>
            <p className="text-gray-500">Choose your role to continue</p>
          </div>

          {/* Role Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {roles.map((role) => {
              const IconComponent = role.icon;
              return (
                <div
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`${role.bgColor} ${role.borderColor} border-2 rounded-2xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl group`}
                >
                  <div className="text-center">
                    <div
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${role.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {role.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {role.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-sm">Patient Care Management</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Activity className="w-5 h-5 text-blue-500" />
              <span className="text-sm">Real-time Health Monitoring</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Lock className="w-5 h-5 text-green-500" />
              <span className="text-sm">Secure & HIPAA Compliant</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LOGIN FORM VIEW
  const currentRoleData = roles.find((role) => role.id === selectedRole);
  const IconComponent = currentRoleData?.icon || User;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={handleBackToRoles}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors duration-200"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to roles
        </button>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${currentRoleData?.color} mb-4`}>
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {currentRoleData?.title} Login
            </h2>
            <p className="text-gray-500 text-sm">
              Welcome back! Please enter your credentials
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Email */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`block w-full pl-12 pr-4 py-4 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg`}
                placeholder="Email address"
              />
              {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`block w-full pl-12 pr-12 py-4 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg`}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
              </button>

              {/* Password Strength */}
              {formData.password && (
                <div className="mt-3">
                  <div className="flex gap-1 mb-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                          i < passwordStrength
                            ? passwordStrength === 1
                              ? "bg-red-400"
                              : passwordStrength === 2
                              ? "bg-yellow-400"
                              : passwordStrength === 3
                              ? "bg-blue-400"
                              : "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    {passwordStrength === 0 && "Very weak"}
                    {passwordStrength === 1 && "Weak"}
                    {passwordStrength === 2 && "Fair"}
                    {passwordStrength === 3 && "Good"}
                    {passwordStrength === 4 && "Strong"}
                  </p>
                </div>
              )}

              {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password}</p>}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 transition-all duration-200"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                  Remember me
                </span>
              </label>
              <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium">
                Forgot Password?
              </button>
            </div>

            {/* Error */}
            {responseError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-600 text-sm font-medium">{responseError}</p>
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-4 bg-gradient-to-r ${currentRoleData?.color} text-white rounded-xl hover:shadow-lg focus:ring-4 focus:ring-blue-300 disabled:opacity-50 flex items-center justify-center text-lg font-semibold transition-all duration-300 transform hover:scale-[1.02]`}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <svg
                    className="animate-spin h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  <span>Signing in...</span>
                </div>
              ) : (
                `Sign in as ${currentRoleData?.title}`
              )}
            </button>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-6 bg-white text-gray-500 font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google */}
            <button className="w-full flex items-center justify-center px-6 py-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 text-lg font-medium group">
              <FcGoogle className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-200" />
              Continue with Google
            </button>

            {/* Help */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                Need help accessing your account?{" "}
                <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                  Contact IT Support
                </button>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-400">
              © 2025 MediCare HMS. Secure & HIPAA Compliant
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
