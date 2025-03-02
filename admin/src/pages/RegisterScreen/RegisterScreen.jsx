// RegisterPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation, useGetProfileQuery } from '../../redux/featurtes/userApiSlice';

import { Link } from 'react-router-dom';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture,setProfilePicture] = useState(null)
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const [register, { isLoading }] = useRegisterMutation();
  const { data: user, isSuccess, isLoading: isProfileLoading } = useGetProfileQuery();

  useEffect(() => {
    if (isSuccess) {
      navigate('/profile');
    }
  }, [isSuccess, navigate]);

  console.log(user)

  const handleImageChange = (e) =>{
      const file = e.target.files[0]
      if (file){
        setProfilePicture(file)
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const formData = new FormData()
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      if (profilePicture) formData.append('profilePicture',profilePicture)

    try {
      await register(formData).unwrap();
      navigate('/login');
    } catch (err) {
      setError(err.data?.message || 'Registration failed');
    }
  };

  if (isProfileLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Admin Register</h1>
      {error && <div className="p-3 mb-4 text-red-700 bg-red-100 rounded">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
            autoComplete="new-password"
          />
        </div>

        <div>
          <label className="block mb-2">Confirm Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>

        <div>
          <label className="block mb-2">Profile Image</label>
          <input
            type="file"
            className="w-full p-2 border rounded"
            onChange={handleImageChange}
            accept='image/*'
         
          />
        </div>


        <Link to ='/login' className='mb-2 mt-2'><p className='w-full text-center text-blue-500'>Already have an Account?</p></Link>


        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterScreen;