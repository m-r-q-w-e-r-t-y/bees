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

function LoginForm() {

    return (
        <div>
            <form action="http://localhost:5000/login" method="POST">
                <div className='signin'>
                    <label>Sign In</label>
                </div>
                <div className="txtfields">
                    <label className="email">
                        <input name="email" type="text" placeholder='Username or Email Address' id='email' className='emailfield'/>
                    </label><br></br>
                    <label className="password">
                        <input name="password" type="password" placeholder='Password' id='password' />
                    </label>
                    <div className='user'>
                        <img src={User} />
                    </div>
                    <div className='lock'>
                        <img src={Lock} />
                    </div>
                </div>
                <div className='loginbutton'>
                    <button >
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