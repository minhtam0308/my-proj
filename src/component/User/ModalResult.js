import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const ModalResult = (props) => {
    const { show, setShow, resQuiz } = props;

    const handleClose = () => setShow(false);

    // console.log(resQuiz)

    return (
        <>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"

            >
                <Modal.Header closeButton>
                    <Modal.Title>Your Result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Count correct answers: <b>{resQuiz.countCorrect}</b></div>
                    <div>Count total questions: <b>{resQuiz.countTotal}</b></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { handleClose() }}>
                        Show answers
                    </Button>
                    <Button variant="primary" onClick={handleClose}>close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResult;