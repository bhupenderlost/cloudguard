import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../Assets/Media/logo.png"
const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="text-center">
        <img src={Logo} alt="Cloudgaurd Logo" className="mx-4 mb-5 w-96" />
        

        <div className="bg-white shadow-lg rounded-lg p-8 w-80 mx-auto">
          <h4 className="text-xl font-semibold text-blue-800 mb-6">Login</h4>
          <form>
            <div className="mb-4">
              <label className="block text-left font-semibold text-blue-800 mb-2" htmlFor="userId">User ID</label>
              <input type="text" id="userId" placeholder="Enter Id" className="w-full px-4 py-2 border rounded-full text-sm text-gray-700 outline-none" />
            </div>
            <div className="mb-6">
              <label className="block text-left font-semibold text-blue-800 mb-2" htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter Password" className="  w-full px-4 py-2 border rounded-full text-sm text-gray-700 outline-none" />
            </div>
            <Link to='/dashboard'><button type="submit" className="w-full bg-red hover:shadow-lg text-white font-bold py-2 rounded-full transition duration-200">
              Login
            </button></Link>
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
