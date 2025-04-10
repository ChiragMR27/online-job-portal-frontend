import React, { useState } from 'react';
import { signup } from '../services/api';

const Signup = () => {
  const [data, setData] = useState({ username: '', password: '', role: '' });

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(data);
    alert('Signup successful!');
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <input
          type="text"
          placeholder="Role"
          value={data.role}
          onChange={(e) => setData({ ...data, role: e.target.value })}
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
