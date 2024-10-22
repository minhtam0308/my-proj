import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GoPlusSmall } from "react-icons/go";

import { toast } from 'react-toastify';
import { APIservice } from '../service/APIrequest';

const ModalCreateUser = (props) => {
    const { show, setShow, fetchGetUserWithPageinatte } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [preview, serPreview] = useState("");

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleClose = () => {
        setShow(false);
        setEmail("")
        serPreview("")
        setPassword("")
        setUsername("")
        setRole("USER")
    }

    const handlePriew = (Event) => {
        if (Event && Event.target && Event.target.files[0]) {
            serPreview(URL.createObjectURL(Event.target.files[0]));
            setImage(Event.target.files[0]);

        }
    }

    const handleSubmit = async () => {
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


        let res = await APIservice(email, password, username, role, image);
        // console.log(res)

        if (res && res.EC === 0) {
            toast.success(res.EM, {
                toastId: 'success2',
            })
            handleClose()
            props.setCurrentPage(1)
            await fetchGetUserWithPageinatte(1)
        }
        if (res && res.EC !== 0) {
            toast.info(res.EM, {
                toastId: 'fail2',
            })

        }


    }
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Create a new user
            </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                size='xl'
                className='modalCreateUser'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add a new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(Event) => setEmail(Event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(Event) => setPassword(Event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">User Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(Event) => setUsername(Event.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Role</label>
                            <select
                                className="form-select"

                                onChange={(Event) => setRole(Event.target.value)}
                                value={role}
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>


                        <div className="col-md-14 up">

                            <label className="form-label label-upload" htmlFor='uploadimage'> <GoPlusSmall color="blue" />upload file image</label>
                            <input type="file" id={'uploadimage'} hidden onChange={(Event) => {
                                handlePriew(Event)
                            }} />
                        </div>
                        <div className="col-md-12 img-priview">
                            {
                                preview ?
                                    <span className='pos-img'><img src={preview}></img></span>
                                    : <span className='pos-img'>preview</span>
                            }
                        </div>
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateUser;