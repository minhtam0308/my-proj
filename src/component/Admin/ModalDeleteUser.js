import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { DeleteUser } from '../service/APIrequest';
import { toast } from 'react-toastify';

const ModalDeleteUser = (props) => {
    const { show, setShow, dataDeleteUser, fetchGetUserWithPageinatte } = props;

    const handleClose = () => setShow(false);

    const deleteUser = async () => {

        let res = await DeleteUser(dataDeleteUser.id);

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


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"

            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure delete user has email is <b>{dataDeleteUser.email}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={() => {
                        deleteUser()
                    }}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;