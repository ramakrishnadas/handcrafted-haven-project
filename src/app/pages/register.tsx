import React, { useState } from 'react';

const RegisterForm: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Registering:', { firstName, lastName, email, password });
    };

    return (
        <div className="w-72 mx-auto mt-12 mb-12 p-5 bg-white border border-gray-300 rounded shadow-md">
            <form action="/account/register" method="post" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="account_Firstname" className="block mb-1">First Name:</label>
                    <input
                        type="text"
                        id="account_Firstname"
                        name="account_firstname"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="account_Lastname" className="block mb-1">Last Name:</label>
                    <input
                        type="text"
                        id="account_Lastname"
                        name="account_lastname"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="account_Email" className="block mb-1">Email:</label>
                    <input
                        type="email"
                        id="account_Email"
                        name="account_email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="account_password" className="block mb-1">Password:</label>
                    <span className="block text-sm mb-1">Passwords must be at least 12 characters and contain at least 1 number, 1 capital letter and 1 special character</span>
                    <input
                        type="password"
                        id="account_password"
                        name="account_password"
                        required
                        pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{12,}$"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                </div>
                <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer">
                    Register
                </button>
            </form>

            <p className="text-center mt-4">Already have an account? <a href="/account/login" className="text-blue-500 hover:underline">Login here</a></p>
        </div>
    );
};

export default RegisterForm;
