import React from 'react';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import UserList from './components/UserList';

function App() {
  return (
    <div className="App">
      <h1>Resume Builder</h1>
      <RegisterForm />
      <LoginForm />
      <UserList />
    </div>
  );
}

export default App;
