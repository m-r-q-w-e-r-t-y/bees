import React from 'react'
import { useState } from 'react'
import { ReactComponent as User } from './User.svg'
import Lock from './lock.png'
import Eye from './eye.png'
import LoginButton from './LoginButton.svg'
import GoogleButton from './Google.svg'
import AppleButton from './AppleID.svg'
import FacebookButton from './Facebook.svg'

function LoginForm() {

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

    return (
        <form action="http://localhost:5000/login" method="POST">
            <div className='signin'>
                <signin>Sign In</signin>
            </div>
            <div className="txtfields">
                <label className="email">
                    <input name ="email" type="text" placeholder='Username or Email Address' />
                </label>
                <label className="password">
                    <input name="password" type={passwordShown ? "text" : "password"} placeholder='Password' />
                </label>
                <div className='user'>
                    <User></User>
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
            <form action="http://localhost:5000/register" method="POST" className='register'>
                    <button className='registertxt'>
                        Register here
                    </button>
            </form>
            <form action="http://localhost:5000/forgot" method="POST" className='forgot'>
                <button className='forgottxt'>
                    Forgot Password?
                </button>
            </form>
            <div className='signinwith'>
                <label className='signinwithtxt'>sign in with</label>
            </div>
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
            <div className='eye'>
                    <img src={Eye} />
                </div>
        </form>
    )
}

export default LoginForm