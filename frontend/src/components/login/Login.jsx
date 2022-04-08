import React from 'react'
import { useState } from 'react'
import User from './User.png'
import Lock from './lock.png'
import Eye from './eye.png'
import LoginButton from './LoginButton.png'
import GoogleButton from './Google.png'
import AppleButton from './AppleID.png'
import FacebookButton from './Facebook.png'
import { Link, use } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        // Prevents automatically refreshing page
        event.preventDefault()

        // Sending form data to MongoDB 
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        };

        fetch(process.env.REACT_APP_API + "/login", requestOptions)
        .then( (response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        })
        .then( (data) => {
            // Go to another page in React
            if (data.success) {
                console.log(JSON.stringify(email));
                navigate('/folder')
            }
            else {
                alert('you are not a user :/')
            }
        })
        .catch( (error) => console.log(error))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='signin'>
                    <label>Sign In</label>
                </div>
                <div className="txtfields">
                    <label className="email">
                        <input name="email" type="text" placeholder='Username or Email Address' id='email' className='emailfield' value={email} onChange={ (event) => setEmail(event.target.value) }/>
                    </label><br></br>
                    <label className="password">
                        <input name="password" type="password" placeholder='Password' id='password' value={password} onChange={ (event) => setPassword(event.target.value) } />
                    </label>
                    <div className='user'>
                        <img src={User} />
                    </div>
                    <div className='lock'>
                        <img src={Lock} />
                    </div>
                </div>
                <div className='loginbutton'>
                <button>
                        <img src={LoginButton} />
                    </button>
                </div>
                <div className='redirect'>
                    <Link to="/register">
                        <label className='registertxt'>
                            Register here
                        </label>
                    </Link>
                    <Link to="/forgot">
                        <label className='forgottxt'>
                            Forgot Password?
                        </label>
                    </Link>
                </div>
                <div className='signinwith'>
                    <label className='signinwithtxt'>sign in with</label>
                </div>
            </form>
            <form action="http://localhost:5000/" method="POST">
                <div className='threebuttons'>
                    <button className='googlebutton'>
                        <img src={GoogleButton} />
                    </button>
                    <button className='applebutton'>
                        <img src={AppleButton} />
                    </button>
                    <button className='facebookbutton'>
                        <img src={FacebookButton} />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm