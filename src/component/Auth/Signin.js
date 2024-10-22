
import { useState } from "react"
import "./Signin.scss"
import { useNavigate } from "react-router-dom"
import { postSignin } from "../service/APIrequest"

import { toast } from 'react-toastify';

const Signin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const navigate = useNavigate()

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleClickSignin = async () => {
        if (!validateEmail(email)) {
            toast.error("email wrong", {
                toastId: 'fail3',
            })
            return;
        }
        if (password === "") {
            toast.error("Password cannot be blank ", {
                toastId: 'fail',
            })
            return;
        }
        const res = await postSignin(email, username, password)
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
        <div className="Signin-Container" >
            <div className="Signin-header">
                <span>You have an account click</span>
                <button onClick={() => {
                    navigate("/login")
                }}>log in</button>

            </div>
            <div className="Signin-Content  mx-auto col-4">
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
                    <label>User name</label>
                    <input type="text" className="form-control"
                        value={username}
                        onChange={(event) => {
                            setUsername(event.target.value)
                        }}></input>
                    <label>Password</label>
                    <input type="password" className="form-control"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}></input>

                    <div >
                        <button className="btn-submit" onClick={() => {
                            handleClickSignin()
                        }}>Sign in</button>
                    </div>
                    <span className="text-center" onClick={() => {
                        navigate("/")
                    }}>Go to homepage</span>

                </div>
            </div>

        </div>
    )
}

export default Signin