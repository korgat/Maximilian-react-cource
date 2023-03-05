import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../store/authContext';

const Login = () => {
  const authCtx = useContext(AuthContext);
  let navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKoYjgYT8dvKy1JPhFqJJjz6hQXUkxmoU';
    if (!isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBKoYjgYT8dvKy1JPhFqJJjz6hQXUkxmoU';
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: refEmail.current?.value,
        password: refPassword.current?.value,
        returnSecureToken: 'true',
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            authCtx.login(data.idToken, data.expiresIn);
            navigate('/', { replace: true });
          });
        } else {
          return res.json().then((data) => {
            let errorMessage = data.error.message;
            if (data.error.message === 'INVALID_PASSWORD') {
              errorMessage = "Email doesn't match with password";
            }
            throw new Error(errorMessage || 'some error');
          });
        }
      })
      .catch((err) => alert(err.message))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="container mx-auto flex justify-center">
      <div className="ng-purple-900 py-10 pb-5 px-4 bg-purple-900 text-white max-w-md w-full rounded-md">
        <h3 className="text-2xl font-medium text-center mb-6">{isLogin ? 'Login' : 'Sign Up'}</h3>
        <form className="flex flex-col mb-5" onSubmit={submitHandler}>
          <div className="w-full text-center flex flex-col mb-2">
            <label className="text-xl font-semibold mb-2" htmlFor="email">
              Your Email
            </label>
            <input
              className="rounded-md py-1 px-2 text-black"
              ref={refEmail}
              type="text"
              id="email"
            />
          </div>
          <div className="w-full text-center flex flex-col mb-6">
            <label className="text-xl font-semibold mb-2" htmlFor="email">
              Your Password
            </label>
            <input
              className="rounded-md py-1 px-2 text-black"
              ref={refPassword}
              type="text"
              id="email"
            />
          </div>
          {isLoading ? (
            <div className="text-2xl font-bold text-center">Loading...</div>
          ) : (
            <button
              className="bg-purple-500 self-center text-lg font-semibold rounded-md px-10 py-2"
              type="submit">
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          )}
        </form>

        <button
          onClick={() => setIsLogin((prev) => !prev)}
          className="mx-auto block text-purple-500">
          {isLogin ? 'Create new account' : 'Login with existing account'}
        </button>
      </div>
    </div>
  );
};

export default Login;
