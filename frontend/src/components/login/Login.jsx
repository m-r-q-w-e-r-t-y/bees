import React from 'react'
import { ReactComponent as User } from './User.svg'
import Lock from './lock.png'
import Eye from './eye.png'
import LoginButton from './LoginButton.svg'

function LoginForm() {
    return (
        <form action="http://localhost:5000/login" method="POST">
            <button className='loginbutton'>
                <img src={LoginButton} />
            </button>
            <div className='eye'>
                <img src={Eye} />
            </div>
            <div className='lock'>
                <img src={Lock} />
            </div>
            <div className='user'>
                <User></User>
            </div>
            <div className="form-inner">
                <signin>Sign In</signin>
                <div className="email">
                    <input type="text" placeholder='Username or Email Address' />
                </div>
                <div className="password">
                    <input type="password" placeholder='Password' />
                </div>
            </div>
            <button onclick="location.href='';">
                <register>Register here</register>
            </button>
            <button onclick="location.href='';">
                <forgot>Forgot Password?</forgot>
            </button>
        </form>
    )
}

export default LoginForm