
import { useState } from "react"
import "./Login.scss"
import { useNavigate } from "react-router-dom"
import { postLogin } from "../service/APIrequest"

import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleClickLogin = async () => {
        const res = await postLogin(email, password)
        if (res && res.EC === 0) {
            toast.success(res.EM, {
                toastId: 'success2',
            })
            navigate("/")
        }
        if (res && res.EC !== 0) {
            toast.info(res.EM, {
                toastId: 'fail2',
            })

        }
    }
    return (
        <div className="Login-Container" >
            <div className="Login-header">
                <span>Don't have account? Click</span>
                <button onClick={() => {
                    navigate("/signin")
                }}>sign in</button>

            </div>
            <div className="Login-Content  mx-auto col-4">
                <div className="tittle">
                    <b>TamHacker</b>
                </div>
                <div className="welcom">
                    Welcom to my Website
                </div>
                <div className="infor-form">
                    <label>Email</label>
                    <input type="email" className="form-control"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value)
                        }}></input>
                    <label>Password</label>
                    <input type="password" className="form-control"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}></input>
                    <span>Forget your password ?</span>
                    <div >
                        <button className="btn-submit" onClick={() => {
                            handleClickLogin()
                        }}>Log in</button>
                    </div>
                    <span className="text-center" onClick={() => {
                        navigate("/")
                    }}>Go to homepage</span>

                </div>
            </div>

        </div>
    )
}

export default Login