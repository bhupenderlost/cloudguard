import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../Assets/Media/logo.png"
import { signIn } from '../Helpers/Authentication';
const Home = () => {
  useEffect(() => {
    window.electron.ipcRenderer.invoke('get-user')
      .then(data => {
          if(data.user) {
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
        emailAddress: e.target.emailAddress.value,
        password: e.target.password.value,

      }
      const response = await signIn(formData)
      console.log(response)
      if(response.error) {
        alert(response.message)
        return setError(response)
      }
      const {
        firstName,
        lastName,
        emailAddress,
        companyName,
        accountType,
        role,
        username
      } = response.dbRes
      const jwtToken = response.token
      const { success, user, error } = await window.electron.ipcRenderer.invoke('create-user', { 
        firstName,
        lastName,
        emailAddress,
        companyName,
        accountType,
        role,
        username,
        jwtToken
      })
      console.log(success)
      if(success) {
        return navigate('/dashboard')
      }
      alert(error)
      setError(error)
    }catch(err) {
      alert(err)
      setError(err)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="text-center">
        <img src={Logo} alt="Cloudgaurd Logo" className="mx-4 mb-5 w-96" />
        
        <div className="bg-white shadow-lg rounded-lg p-8 w-80 mx-auto">
          <h4 className="text-xl font-semibold text-blue-800 mb-6">Login</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-left font-semibold text-blue-800 mb-2" htmlFor="userId">Email</label>
              <input name='emailAddress' type="text" id="userId" placeholder="Enter Id" className="w-full px-4 py-2 border rounded-full text-sm text-gray-700 outline-none" />
            </div>
            <div className="mb-6">
              <label className="block text-left font-semibold text-blue-800 mb-2" htmlFor="password">Password</label>
              <input name='password' type="password" id="password" placeholder="Enter Password" className="  w-full px-4 py-2 border rounded-full text-sm text-gray-700 outline-none" />
            </div>
            {/* <Link to='/dashboard'><button type="submit" className="w-full bg-red hover:shadow-lg text-white font-bold py-2 rounded-full transition duration-200">
              Login
            </button></Link> */}
            <button type='submit' className="w-full bg-red hover:shadow-lg text-white font-bold py-2 rounded-full transition duration-200">
              Login
            </button>
          </form>
          <div className="mt-6 text-sm text-gray-600">
            OR <Link to="/signup" className="text-blue-800 font-semibold hover:underline">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
