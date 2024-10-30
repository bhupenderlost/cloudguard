/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import Base from '../Components/Base/Base'; // Importing Base component

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

  const [profilePicture, setProfilePicture] = useState('https://i.pravatar.cc/100'); // Placeholder image
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
    // You can add any additional validation or logic here
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
      <div style={styles.settingsContainer}>
        {/* Header Area */}
        <div style={styles.header}>
          <div style={styles.profilePictureContainer}>
            <img
              src={profilePicture}
              alt="profile"
              style={styles.profileImage}
            />
            <label htmlFor="profilePicUpload" style={styles.editIcon}>
              ✏️
            </label>
            <input
              type="file"
              id="profilePicUpload"
              style={styles.fileInput}
              accept="image/*"
              onChange={handleProfilePictureChange}
            />
          </div>
          <h2 style={styles.userName}>{formData.name}</h2>
        </div>

        {/* Tab Navigation */}
        <div style={styles.tabs}>
          <span
            style={activeTab === 'profile' ? { ...styles.tab, ...styles.activeTab } : styles.tab}
            onClick={() => setActiveTab('profile')}
          >
            Edit Profile
          </span>
          <span
            style={activeTab === 'security' ? { ...styles.tab, ...styles.activeTab } : styles.tab}
            onClick={() => setActiveTab('security')}
          >
            Security
          </span>
        </div>

        {activeTab === 'profile' ? (
          <form onSubmit={handleSubmit} style={styles.profileForm}>
            <div style={styles.formContent}>
              <div style={styles.inputRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your name"
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>User Name</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your username"
                    style={styles.input}
                    disabled
                  />
                </div>
              </div>

              <div style={styles.inputRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your email"
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your password"
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.inputRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Phone no.</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your phone number"
                    style={styles.input}
                  />
                </div>
              </div>
            </div>

            <button type="submit" style={styles.saveButton}>Save</button>
          </form>
        ) : (
          <div>
            <h2 style={styles.subHeader}>Two-factor Authentication</h2>
            <div style={styles.twoFactor}>
            <Switch
  checked={enabled}
  onChange={setEnabled}
  className="relative inline-flex h-6 w-11 items-center rounded-full"
  style={{
    backgroundColor: enabled ? '#22c55e' : '#d1d5db', // Green when enabled, Gray when disabled
    transition: 'background-color 0.2s ease',
  }}
>
  <span className="sr-only">Enable two-factor authentication</span>
  <span
    className={`${
      enabled ? 'translate-x-6' : 'translate-x-1'
    } inline-block h-4 w-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out`}
  />
</Switch>

              <span style={{ marginLeft: '10px' }}>
                Enable or disable two-factor authentication
              </span>
            </div>

            <h2 style={styles.subHeader}>Change Password</h2>
            <form onSubmit={handlePasswordChange} style={styles.profileForm}>
              <div style={styles.inputRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    style={styles.input}
                  />
                </div>
              </div>

              <button type="submit" style={styles.saveButton}>Save</button>
            </form>
          </div>
        )}
      </div>
    </Base>
  );
};

const styles = {
  settingsContainer: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '30px',
  },
  profilePictureContainer: {
    position: 'relative',
  },
  profileImage: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #ff4b5c',
  },
  editIcon: {
    position: 'absolute',
    bottom: '-10px',
    right: '-5px',
    backgroundColor: '#ff4b5c',
    color: '#fff',
    borderRadius: '50%',
    padding: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  fileInput: {
    display: 'none',
  },
  userName: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '10px',
    color: '#333',
  },
  tabs: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  tab: {
    marginRight: '20px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#999',
  },
  activeTab: {
    borderBottom: '2px solid #ff4b5c',
    color: '#ff4b5c',
  },
  profileForm: {
    marginTop: '20px',
  },
  formContent: {
    marginBottom: '20px',
  },
  inputRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  formGroup: {
    width: '48%',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  saveButton: {
    padding: '10px 20px',
    backgroundColor: '#ff4b5c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  twoFactor: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px',
  },
};

export default Settings;
