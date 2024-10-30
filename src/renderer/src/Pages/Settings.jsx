/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import Base from '../Components/Base/Base'; // Importing Base component
import ProfilePicture from '../Assets/Media/profile-picture.jpg';

const Settings = () => {
  useEffect(() => {
    window.document.title = 'Settings | Cloudguard';
  }, []);

  const [activeTab, setActiveTab] = useState('profile');

  const [formData, setFormData] = useState({
    name: 'Charlene Reed',
    username: 'Charlene Reed',
    email: 'charlenereed@gmail.com',
    password: '******',
    dateOfBirth: '1990-01-25',
    phone: '+91 XXXXXXXXX',
  });

  const [profilePicture, setProfilePicture] = useState(''); // Placeholder image
  const [enabled, setEnabled] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle onBlur for input fields
  const handleBlur = (e) => {
    const { name, value } = e.target;
    console.log(`${name} field blurred with value: ${value}`);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // Setting the new profile picture
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    console.log('Profile picture submitted:', profilePicture);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    console.log('Current Password:', currentPassword);
    console.log('New Password:', newPassword);
  };

  return (
    <Base title={'Settings'}>
      <div className="max-w-3xl mx-auto p-10 bg-white dark:bg-darkbg2 rounded-lg shadow-lg dark:text-textgrey">
        {/* Header Area */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img
              src={ProfilePicture}
              alt="profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-red"
            />
            <label htmlFor="profilePicUpload" className="absolute bottom-0 right-0 bg-red text-white rounded-full p-2 cursor-pointer">
              ✏️
            </label>
            <input
              type="file"
              id="profilePicUpload"
              className="hidden"
              accept="image/*"
              onChange={handleProfilePictureChange}
            />
          </div>
          <h2 className="text-2xl font-bold mt-4 text-gray-800 dark:text-gray-100">{formData.name}</h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-4">
          <span
            className={`${activeTab === 'profile' ? 'border-b-2 border-red text-red' : 'text-gray-500'} mx-4 cursor-pointer font-semibold pb-2`}
            onClick={() => setActiveTab('profile')}
          >
            Edit Profile
          </span>
          <span
            className={`${activeTab === 'security' ? 'border-b-2 border-red text-red' : 'text-gray-500'} mx-4 cursor-pointer font-semibold pb-2`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </span>
        </div>

        {activeTab === 'profile' ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-gray-800 dark:text-gray-200 font-semibold">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="w-1/2">
                  <label className="block text-gray-800 dark:text-gray-200 font-semibold">User Name</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your username"
                    className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                    disabled
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-gray-800 dark:text-gray-200 font-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="w-1/2">
                  <label className="block text-gray-800 dark:text-gray-200 font-semibold">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-gray-800 dark:text-gray-200 font-semibold">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="w-1/2">
                  <label className="block text-gray-800 dark:text-gray-200 font-semibold">Phone no.</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="px-6 py-2 bg-red text-white rounded-md font-bold hover:bg-red focus:ring-2 focus:ring-offset-2 focus:ring-red">
              Save
            </button>
          </form>
        ) : (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Two-factor Authentication</h2>
            <div className="flex items-center mb-6">
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${enabled ? 'bg-red' : 'bg-textgrey'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200`}
              >
                <span className="sr-only">Enable two-factor authentication</span>
                <span
                  className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform bg-white rounded-full transition-transform duration-200`}
                />
              </Switch>
              <span className="ml-2 text-gray-800 dark:text-gray-200">Enable or disable two-factor authentication</span>
            </div>

            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Change Password</h2>
            <form onSubmit={handlePasswordChange} className="space-y-6">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-gray-800 dark:text-gray-200 font-semibold">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="w-1/2">
                  <label className="block text-gray-800 dark:text-gray-200 font-semibold">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <button type="submit" className="px-6 py-2 bg-red text-white rounded-md font-bold hover:bg-red focus:ring-2 focus:ring-offset-2 focus:ring-red">
                Save
              </button>
            </form>
          </div>
        )}
      </div>
    </Base>
  );
};

export default Settings;
