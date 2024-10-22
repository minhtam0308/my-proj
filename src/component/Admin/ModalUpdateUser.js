import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GoPlusSmall } from "react-icons/go";
import _ from "lodash"

import { toast } from 'react-toastify';
import { putUpdateUser } from '../service/APIrequest';

const ModalUpdateUser = (props) => {
    const { show, setShow, updateUser, fetchGetUserWithPageinatte } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [preview, serPreview] = useState("");

    // const [test, setTest] = useState("")

    useEffect(() => {

        if (!_.isEmpty(updateUser)) {
            setEmail(updateUser.email)
            setPassword("")
            setUsername(updateUser.username)
            setRole(updateUser.role)
            setImage(updateUser.image)


            if (!_.isEmpty(updateUser.image)) {
                serPreview(`data:image/png;base64,${updateUser.image}`)
            }
            else {
                serPreview("")
            }

        }

        // console.log("click")
    }, [updateUser])



    const handleClose = () => {
        setShow(false);
        props.resetUpdateUser()
        // setUsername("")
        // setRole("USER")
    }

    const handlePriew = (Event) => {
        if (Event && Event.target && Event.target.files[0]) {
            serPreview(URL.createObjectURL(Event.target.files[0]));
            setImage(Event.target.files[0]);

        }
    }

    const handleSubmit = async () => {
        let res = await putUpdateUser(updateUser.id, username, role, image);

        if (res && res.EC === 0) {
            await props.fetchGetUserWithPageinatte(props.currentPage)
            await handleClose()
            toast.success(res.EM, {
                toastId: 'success1'
            })
        }
        if (res && res.EC !== 0) {
            toast.info(res.EM, {
                toastId: 'fail1',
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
                className='modalUpdateUser'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                disabled
                                value={email}

                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                disabled

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
                        yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser;