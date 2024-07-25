import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import GoogleAuth from '../auth/GoogleAuth';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');  optional

    const navigate = useNavigate();
    const logIn = async () => {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate('/profile');
        } catch (e) {
            setError(e.message);
        }
    }
    return (
        <>
        <div className='auth'>
        <h1>Log In</h1>
        {error && <p className="error">{error}</p>}
        <input
            placeholder="Your email address"
            value={email}
            onChange={e => setEmail(e.target.value)} />
        <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={e => setPassword(e.target.value)} />
        <button onClick={logIn}>Log In</button>
        <p>No account yet? <Link to="/sign-up">Register</Link></p>
        <p>Or login with</p>
        <GoogleAuth setError={setError}/>
        </div>
        </>
    );
}

export default LoginPage;