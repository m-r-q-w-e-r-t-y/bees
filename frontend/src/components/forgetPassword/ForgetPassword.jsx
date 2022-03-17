import React from 'react'
import { useState } from 'react'
import Mail from './Mail.png'
import LoginButton from './LoginButton.png'
import { Link } from 'react-router-dom'

function ForgetPasswordForm() {

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

    return (
        <form action="http://localhost:5000/forgot" method="POST">
            <div className='resetpassword'>
                <label>Forgot Password?</label>
            </div>
            <div className="txtfields">
                <label className="email">
                    <input type="text" placeholder='Enter your email address' id='email' name='email'/>
                </label><br></br>
            </div>
            <div className='resetinstructions'>
                <label className='asterisk'>*</label>
                <label className='SendMessagetxt'>
                We will send you a message to set or reset
                </label>
                <br></br>
                <label className='sendMessagetxtcontinued'>
                    your new password
                </label>
                <div className='mail'>
                    <img src={Mail} />
                </div>
            </div>
            <div className='loginbutton'>
                <label className='SendCodetxt'>
                    Send Code
                </label>
                <Link to="/reset">
                    <button className='login2'>
                        <img src={LoginButton} />
                    </button>
                </Link>

            </div>
        </form>
    )
}

export default ForgetPasswordForm