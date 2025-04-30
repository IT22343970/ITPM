import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const UserSettings = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // Handle saving settings
  const handleSaveSettings = () => {
    console.log('Settings saved:', { username, email });
    alert('Settings saved successfully!');
  };

  // Handle sending OTP
  const handleSendOtp = () => {
    setIsOtpSent(true);
    console.log('OTP sent to:', email);
  };

  // Handle password change
  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      console.log('Password changed');
      alert('Password successfully updated!');
    } else {
      alert('Passwords do not match');
    }
  };

  // Handle email verification
  const handleVerifyEmail = () => {
    if (otp === '123456') { // Example OTP validation
      setIsEmailVerified(true);
      alert('Email verified successfully!');
    } else {
      alert('Incorrect OTP');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-8 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Settings</h2>

        {/* Username Settings */}
        <div className="mb-6">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            placeholder="Enter your username"
          />
        </div>

        {/* Email Settings */}
        <div className="mb-6">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Email Verification */}
        <div className="mb-6">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Verify Email</label>
          <div className="flex items-center">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-2/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter OTP"
            />
            <button
              onClick={handleVerifyEmail}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg ml-4"
            >
              Verify
            </button>
          </div>
          {!isEmailVerified && (
            <button
              onClick={handleSendOtp}
              className="bg-indigo-600 text-white px-4 py-2 mt-2 rounded-lg"
            >
              Send OTP
            </button>
          )}
          {isEmailVerified && <p className="text-green-600 mt-2">Email Verified!</p>}
        </div>

        {/* Change Password */}
        <div className="border-t pt-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
          <label className="block text-gray-600 text-sm font-semibold mb-2">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            placeholder="Enter your new password"
          />

          <label className="block text-gray-600 text-sm font-semibold mb-2 mt-4">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            placeholder="Confirm your new password"
          />

          <button
            onClick={handleChangePassword}
            className="bg-green-600 text-white px-4 py-3 mt-4 rounded-lg"
          >
            Change Password
          </button>
        </div>

        {/* Save Settings */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSaveSettings}
            className="bg-green-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-green-700 transition duration-300"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

// Default Export: UserSettingsPage
const UserSettingsPage = () => {
  return (
    <div>
      <UserSettings />
    </div>
  );
};

export default UserSettingsPage; 
export { UserSettings };
