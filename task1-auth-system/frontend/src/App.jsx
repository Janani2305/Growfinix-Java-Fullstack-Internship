 import { useState } from 'react';
import axios from 'axios';
import Register from './Register';
import Login from './login';

function App() {
  const [profileMessage, setProfileMessage] = useState('');

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:8080/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfileMessage(response.data);
    } catch (error) {
      setProfileMessage('Failed to fetch profile. Are you logged in?');
    }
  };

  return (
    <div>
      <h1>Growfinix Auth System</h1>
      <Register />
      <hr />
      <Login onLoginSuccess={() => console.log('Logged in!')} />
      <hr />
      <button onClick={fetchProfile}>Test Protected Route</button>
      {profileMessage && <p>{profileMessage}</p>}
    </div>
  );
}

export default App;