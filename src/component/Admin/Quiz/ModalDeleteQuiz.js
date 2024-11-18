
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { } from '../service/APIrequest';
import { toast } from 'react-toastify';
import { delQuiz } from '../../service/APIrequest';

const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataDeleteQuiz } = props;

    const handleClose = () => setShow(false);


    const handleDelQuiz = async (id) => {

        const res = await delQuiz(id)

        if (res && res.EC === 0) {
            await props.getAllDataQuizManage()
            handleClose()
            toast.success(res.EM)
        }
        if (res && res.EC !== 0) {
            toast.info(res.EM)
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

                    Are you sure delete quiz has
                    <b>
                        <br />
                        ID : {dataDeleteQuiz.id}
                        <br />
                        Name : {dataDeleteQuiz.name}
                        <br />
                        Description : {dataDeleteQuiz.description}
                        <br />
                        Difficulty : {dataDeleteQuiz.difficulty}
                    </b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleDelQuiz(dataDeleteQuiz.id)
                    }}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;