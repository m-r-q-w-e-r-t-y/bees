import React from 'react'
import { useState } from 'react'
import { ReactComponent as User } from './User.svg'
import Lock from './lock.png'
import Eye from './eye.png'
import LoginButton from './LoginButton.svg'
import GoogleButton from './Google.svg'
import AppleButton from './AppleID.svg'
import FacebookButton from './Facebook.svg'

function RegisterForm() {

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

    return (
        <form action="http://localhost:5000/login" method="POST">
            <div className='signup'>
                <signup>Sign Up</signup>
            </div>
            <div className="txtfields">
                <label className="email">
                    <input type="text" placeholder='Username or Email Address' id='email' name='email'/>
                </label><br></br>
                <label className="password">
                    <input type={passwordShown ? "text" : "password"} placeholder='Password' id='password' name='password'/>
                </label><br></br>
                <label className="confirmpassword">
                    <input type={passwordShown ? "text" : "password"} placeholder='Confirm password' id='confirmpassword' name='confirmpassword'/>
                </label>
                <div className='userregister'>
                    <User></User>
                </div>
                <div className='lockregister1'>
                    <img src={Lock} />
                </div>
                <div className='lockregister2'>
                    <img src={Lock} />
                </div>
            </div>
            <div className='loginbutton'>
                <button>
                    <img src={LoginButton} />
                </button>
            </div>
            <form action="http://localhost:5000/login" method="POST" className='login'>
                    <button className='logintxt'>
                        Already have account
                    </button>
            </form>
            <div className='signupwith'>
                <label className='signupwithtxt'>sign up with</label>
            </div>
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
        </form>
    )
}

export default RegisterForm