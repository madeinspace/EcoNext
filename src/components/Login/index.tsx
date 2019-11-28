import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { login } from '../../utils/auth';

const LoginForm = styled.form``;
const Error = styled.div``;
const Password = styled.input``;
const Username = styled.input``;
const LoginButton = styled.button``;

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
      <Username
        type="text"
        id="username"
        name="username"
        value={userData.username}
        onChange={event => setUserData(Object.assign({}, userData, { username: event.target.value }))}
      />

      <label htmlFor="password">password</label>
      <Password
        type="password"
        id="password"
        name="password"
        value={userData.password}
        onChange={event => setUserData(Object.assign({}, userData, { password: event.target.value }))}
      />

      <LoginButton type="submit">Login</LoginButton>

      {userData.error && (
        <Error>
          <p>Error: {userData.error}</p>
        </Error>
      )}
    </LoginForm>
  );
};

export default Login;
