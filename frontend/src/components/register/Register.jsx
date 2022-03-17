import React from 'react'
import { useState } from 'react'
import User from './User.png'
import Lock from './lock.png'
import LoginButton from './LoginButton.png'
import GoogleButton from './Google.png'
import AppleButton from './AppleID.png'
import FacebookButton from './Facebook.png'
import { Link } from 'react-router-dom'

function RegisterForm() {

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

    return (
        <div>
            <form action="http://localhost:5000/register" method="POST">
                <div className='signup'>
                    <label>Sign Up</label>
                </div>
                <div className="txtfields">
                    <label className="email">
                        <input type="text" placeholder='Username or Email Address' id='email' name='email' />
                    </label><br></br>
                    <label className="password">
                        <input type={passwordShown ? "text" : "password"} placeholder='Password' id='password' name='password' />
                    </label><br></br>
                    <label className="confirmpassword">
                        <input type={passwordShown ? "text" : "password"} placeholder='Confirm password' id='confirmpassword' name='confirmpassword' />
                    </label>
                    <div className='userregister'>
                        <img src={User} />
                    </div>
                    <div className='lockregister1'>
                        <img src={Lock} />
                    </div>
                    <div className='lockregister2'>
                        <img src={Lock} />
                    </div>
                </div>
                <div className='loginbutton'>
                    <Link to="/login">
                        <button>
                            <img src={LoginButton} />
                        </button>
                    </Link>
                </div>
                <div className='redirectback'>
                    <Link to="/login">
                        <label className='logintxt'>
                            Already have account?
                        </label>
                    </Link>
                </div>
                <div className='signupwith'>
                    <label className='signupwithtxt'>sign up with</label>
                </div>
            </form>
            <form action="http://localhost:5000/" method="POST">
                <div className='threebuttonsregister'>
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

export default RegisterForm