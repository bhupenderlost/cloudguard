/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../Assets/Media/logo.png";
import { signUp } from '../Helpers/Authentication';



const Signup = () => {
  useEffect(() => {
    window.electron.ipcRenderer.invoke('get-user')
      .then(data => {
          if(data.user.length === 1) {
            return navigate('/dashboard')
          } 
      })
      .catch(err => {
        alert(err)
      })
  })

  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      const formData = {
        firstName: e.target.firstName.value,
        username: e.target.username.value,
        emailAddress: e.target.emailAddress.value,
        password: e.target.password.value,
        accountType: e.target.accountType.value,
        companyName: e.target.companyName.value,

      }
      console.log(formData)
      const response = await signUp(formData)
      if(response.error) {
        alert(response.message)
        return setError(response)
      }
      if(response.success) {
        return navigate('/')
      }
    }catch(err) {
      setError(err)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="text-center">
      <img src={Logo} alt="Cloudgaurd Logo" className="mx-4 mb-5 w-96" />
        
        <div className="bg-white shadow-lg rounded-lg p-8 w-80 mx-auto">
          <h4 className="text-xl font-semibold text-blue-800 mb-6">Sign up</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-left font-semibold text-blue-800 mb-2" htmlFor="userId">First Name</label>
              <input name='firstName' type="text" id="firstName" placeholder="Enter First Name" className="w-full px-4 py-2 border rounded-full text-sm text-gray-700 outline-red" />
            </div>
            <div className="mb-4">
              <label className="block text-left font-semibold text-blue-800 mb-2" htmlFor="username">Username</label>
              <input name='username' type="text" id="username" placeholder="Enter username" className="w-full px-4 py-2 border rounded-full text-sm text-gray-700 outline-red" />
            </div>
            <div className="mb-4">
              <label className="block text-left font-semibold text-blue-800 mb-2" htmlFor="emailAddress">Email</label>
              <input name='emailAddress' type="email" id="emailAddress" placeholder="Enter Email" className="w-full px-4 py-2 border rounded-full text-sm text-gray-700 outline-red" />
            </div>
            <div className="mb-4">
              <label className="block text-left font-semibold text-blue-800 mb-2" htmlFor="accountType">Account Type</label>
              <select name='accountType' id="accountType" className="w-full px-4 py-2 border rounded-full text-sm text-gray-700 outline-red">
                <option value={0}>Select Account Type</option>
                <option value={1}>Individual</option>
                <option value={2}>Company</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-left font-semibold text-blue-800 mb-2" htmlFor="companyName">Company Name</label>
              <input name='companyName' type="text" id="companyName" placeholder="Enter Company ( For Individual Type Individual )" className="w-full px-4 py-2 border rounded-full text-sm text-gray-700 outline-red" />
            </div>
            <div className="mb-6">
              <label className="block text-left font-semibold text-blue-800 mb-2" htmlFor="confirmPassword">Password</label>
              <input name='password' type="password" id="confirmPassword" placeholder="Enter Password" className="w-full px-4 py-2 border rounded-full text-sm text-gray-700 outline-red" />
            </div>
            <button type="submit" className="w-full bg-red hover:shadow-lg text-white font-bold py-2 rounded-full transition duration-200">
              SIGN UP
            </button>
          </form>
          <div className="mt-6 text-sm text-gray-600">
            OR <Link to="/" className="text-blue-800 font-semibold hover:underline">LOGIN</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
