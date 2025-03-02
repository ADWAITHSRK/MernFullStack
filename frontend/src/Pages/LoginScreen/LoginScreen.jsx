import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spin } from 'antd';
import { useLoginMutation, useGetProfileQuery } from '../../redux/featurtes/userApiSlice';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const [login, { isLoading }] = useLoginMutation();
  const { data: user, isSuccess, isLoading: isProfileLoading } = useGetProfileQuery();

 



  console.log(user)
  console.log(isSuccess)


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password }).unwrap();
      toast.success("Login successful!", {
        position:'top-center'
      });
      navigate('/');
    } catch (err) {
      toast.error("Unable to Login!", {
        position:'top-center'
      });
      setError(err.data?.message || 'Invalid email or password');
    }
  };

  if (isProfileLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      {error && <div className="p-3 mb-4 text-red-700 bg-red-100 rounded">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Email Address</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        
        <div>
          <label className="block mb-2">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isLoading ? <Spin/> : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;