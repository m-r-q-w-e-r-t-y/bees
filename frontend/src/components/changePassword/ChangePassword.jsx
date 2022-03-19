import React from 'react'
import { useState } from 'react'
import User from './User.png'
import Lock from './lock.png'
import LoginButton from './LoginButton.png'
import { Link } from 'react-router-dom'

function ChangePasswordForm() {

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

    return (
        <form action="http://localhost:5000/reset" method="POST">
            <div className='changepassword'>
                <label>Change Password</label>
            </div>
            <div className="txtfields">
                <label className="email">
                    <input type="text" placeholder='Code' id='email' name='email' className='emailfield'/>
                </label><br></br>
                <label className="password">
                    <input type={passwordShown ? "text" : "password"} placeholder='New password' id='password' name='password' />
                </label><br></br>
                <label className="confirmpassword">
                    <input type={passwordShown ? "text" : "password"} placeholder='Confirm new password' id='confirmpassword' name='confirmpassword' />
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

                <button>
                    <img src={LoginButton} />
                </button>

            </div>
            <div className='redirectback'>
                <Link to="/login">
                    <label className='logintxt'>
                        Remember password?
                    </label>
                </Link>
            </div>
        </form>
    )
}

export default ChangePasswordForm