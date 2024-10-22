import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { GoPlusSmall } from "react-icons/go";
import _ from "lodash"


const ModalViewUser = (props) => {
    const { show, setShow, viewUser } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [preview, serPreview] = useState("");

    // const [test, setTest] = useState("")

    useEffect(() => {

        if (!_.isEmpty(viewUser)) {
            setEmail(viewUser.email)
            setPassword("")
            setUsername(viewUser.username)
            setRole(viewUser.role)
            setImage(viewUser.image)
            if (!_.isEmpty(viewUser.image)) {
                serPreview(`data:image/png;base64,${viewUser.image}`)
            }
            else {
                serPreview("")
            }

        }

        // console.log("click")
    }, [viewUser])



    const handleClose = () => {
        setShow(false);
        // serPreview("")
        // setUsername("")
        // setRole("USER")

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
                className='modalViewUser'
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
                                disabled
                                value={username}

                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Role</label>
                            <select
                                className="form-select"

                                disabled
                                value={role}
                            >
                                <option>{role}</option>
                            </select>
                        </div>


                        {/* <div className="col-md-14 up">

                            <label className="form-label label-upload" htmlFor='uploadimage' disabled> <GoPlusSmall color="blue" />upload file image</label>
                            <input type="file" id={'uploadimage'} hidden />
                        </div> */}
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
                        OK
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalViewUser;