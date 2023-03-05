import React, { useContext, useRef } from 'react';
import { AuthContext } from '../../store/authContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const authCtx = useContext(AuthContext);
  let navigate = useNavigate();
  const refPassword = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBKoYjgYT8dvKy1JPhFqJJjz6hQXUkxmoU',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          idToken: authCtx.tokenId,
          password: refPassword.current?.value,
          returnSecureToken: false,
        }),
      },
    )
      .then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            console.log('new token', data);

            authCtx.login(data.idToken, data.expiresIn);
            navigate('/', { replace: true });
          });
        } else {
          return res.json().then((data) => {
            throw new Error(data.error.message);
          });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <div className="container mx-auto">
      <div className="px-4 mx-auto  flex flex-col justify-center items-center py-10">
        <h2 className="text-7xl font-semibold mb-12">Your User Profile</h2>
        <form className="flex flex-col max-w-md w-full mb-5" onSubmit={handleSubmit}>
          <div className="w-full text-center flex flex-col mb-8">
            <label className="text-xl font-semibold mb-2" htmlFor="email">
              New Password
            </label>
            <input
              ref={refPassword}
              className="bg-purple-100 border border-black rounded-md py-1 px-2 text-black"
              type="text"
              id="email"
            />
          </div>
          <button
            className="bg-purple-900 text-white self-center text-lg font-semibold rounded-md px-10 py-2"
            type="submit">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
