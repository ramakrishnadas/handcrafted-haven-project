import React, { useState } from 'react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="w-72 mx-auto mt-12 mb-12 p-5 bg-white border border-gray-300 rounded shadow-md">
      <form id="loginForm" action="/account/login" method="post" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="account_email" className="block mb-1">Email:</label>
          <input
            type="email"
            id="account_email"
            name="account_email"
            required
            placeholder="johndoe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="account_password" className="block mb-1">Password:</label>
          <input
            type="password"
            id="account_password"
            name="account_password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer">
          Login
        </button>
      </form>
      <p className="text-center mt-4">Don't have an account? <a href="/account/register" className="text-blue-500 hover:underline">Register here</a></p>
    </div>
  );
};

export default LoginForm;
