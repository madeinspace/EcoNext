import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

const LoginForm = styled.form``;
import { login } from '../../utils/auth';

const Login = () => {
  const [userData, setUserData] = useState({ username: '', password: '', error: '' });

  async function handleLogin(event) {
    event.preventDefault();
    setUserData(Object.assign({}, userData, { error: '' }));

    const UserName = userData.username;
    const Password = userData.password;
    const url = 'https://economy.id.com.au/monash/Account/Logon';

    const payload = {
      UserName,
      Password,
    };

    console.log('payload: ', payload);

    await axios
      .post(url, payload, { withCredentials: true })
      .then(function(response) {
        console.log('success: ', response);
        // await login({ token });
      })
      .catch(function(error) {
        console.log(error);
        setUserData(Object.assign({}, userData, error));
      });
  }

  return (
    <LoginForm onSubmit={handleLogin}>
      <label htmlFor="username">username</label>

      <input
        type="text"
        id="username"
        name="username"
        value={userData.username}
        onChange={event => setUserData(Object.assign({}, userData, { username: event.target.value }))}
      />
      <label htmlFor="password">password</label>

      <input
        type="password"
        id="password"
        name="password"
        value={userData.password}
        onChange={event => setUserData(Object.assign({}, userData, { password: event.target.value }))}
      />

      <button type="submit">Login</button>

      {userData.error && <p className="error">Error: {userData.error}</p>}
    </LoginForm>
  );
};

export default Login;
