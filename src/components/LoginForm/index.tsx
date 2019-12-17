import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { login } from '../../utils/auth';

const _LoginForm = styled.form``;
const Error = styled.div``;
const Password = styled.input``;
const Username = styled.input``;
const LoginButton = styled.button``;

const LoginForm = () => {
  const [userData, setUserData] = useState({ username: '', password: '', error: '' });
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogOut = () => {
    axios.get('/logout').then(res => {
      console.log('res logout: ', res);
      setLoggedIn(false);
    });
  };

  const handleLogin = event => {
    event.preventDefault();
    setUserData(Object.assign({}, userData, { error: '' }));

    const api = '/login';

    const payload = {
      username: userData.username,
      password: userData.password,
    };

    console.log('payload: ', payload);

    axios
      .post(api, payload)
      .then(function(response) {
        console.log('success: ', response);
        setLoggedIn(true);
        // await login({ token });
      })
      .catch(function(error) {
        console.log('there was an error: ', error);
        setUserData(Object.assign({}, userData, error));
      });
  };

  return (
    <>
      {loggedIn && <button onClick={handleLogOut} />}
      <_LoginForm onSubmit={handleLogin}>
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
      </_LoginForm>
    </>
  );
};

export default LoginForm;
