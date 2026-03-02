import React, { useState } from 'react';
import { User, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CoustomerForm = () => {
  const navigate = useNavigate();

  // 1. Add State to capture inputs
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    password: '',
    confirmPassword: ''
  });

  // 2. Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle Form Submission to Backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Send data to Node.js backend
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          password: formData.password,
          role: 'customer' // Tell the backend this is a customer
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful!");
        // Save the JWT token to local storage so they stay logged in
        localStorage.setItem('token', data.token);
        navigate("/dashboard"); // Now we navigate AFTER successful registration
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] flex items-center justify-center py-12 px-4 font-sans text-gray-900">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-8 md:p-10 relative">
        <button onClick={() => navigate("/sign_up")} className="absolute top-8 left-8 text-gray-500 hover:text-gray-900 flex items-center gap-2 text-sm font-medium transition-colors">
          <ArrowLeft size={18} /> Back to role selection
        </button>

        <div className="mt-8 text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-4">
            <User size={32} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Registration</h1>
          <p className="text-gray-500 text-sm mt-1">Create your account to start ordering delicious meals</p>
        </div>

        {/* Note: Changed to onSubmit={handleSubmit} */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-gray-700">Full Name <span className="text-red-500">*</span></label>
            <input type="text" name="name" onChange={handleChange} required placeholder="Enter your full name" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-gray-700">Mobile Number <span className="text-red-500">*</span></label>
            <input type="tel" name="phone" onChange={handleChange} required placeholder="+91 9876543210" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-gray-700">Email</label>
            <input type="email" name="email" onChange={handleChange} placeholder="you@example.com" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-gray-700">Location / Area <span className="text-red-500">*</span></label>
            <input type="text" name="location" onChange={handleChange} required placeholder="Enter your area or landmark" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-gray-700">Password <span className="text-red-500">*</span></label>
            <input type="password" name="password" onChange={handleChange} required placeholder="Minimum 6 characters" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-gray-700">Confirm Password <span className="text-red-500">*</span></label>
            <input type="password" name="confirmPassword" onChange={handleChange} required placeholder="Re-enter your password" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>

          {/* Changed type to "submit" */}
          <button type="submit" className="w-full bg-[#EA580C] hover:bg-orange-700 text-white font-bold py-3.5 rounded-lg transition-colors shadow-lg shadow-orange-200 mt-6">
            Create Account
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Already have an account? <span onClick={() => navigate("/login")} className="text-orange-600 font-bold hover:underline cursor-pointer">Sign in</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CoustomerForm;