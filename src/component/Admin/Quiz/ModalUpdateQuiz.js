import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GoPlusSmall } from "react-icons/go";
import _ from "lodash"

import { toast } from 'react-toastify';
import Select from 'react-select';
import { putUpdateQuiz } from '../../service/APIrequest';


const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataUQuiz, getAllDataQuizManage } = props;
    const [descriptionUQuiz, setDescriptionUQuiz] = useState("")
    const [nameUQuiz, setNameUQuiz] = useState("")
    const [difficultyUQuiz, setDifficultyUQuiz] = useState("")
    const [imgUQuiz, setImgUQuiz] = useState(null)
    // const [dataUpdate, setDataUpdate] = useState({}) because slow



    // useEffect(() => {

    //     if (!_.isEmpty(updateUser)) {
    //         setEmail(updateUser.email)
    //         setPassword("")
    //         setUsername(updateUser.username)
    //         setRole(updateUser.role)
    //         setImage(updateUser.image)


    //         if (!_.isEmpty(updateUser.image)) {
    //             serPreview(`data:image/png;base64,${updateUser.image}`)
    //         }
    //         else {
    //             serPreview("")
    //         }

    //     }

    //     // console.log("click")
    // }, [dataUQuiz])

    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' }
    ];

    const handleClose = () => {
        setShow(false);
        setDescriptionUQuiz("")
        setDifficultyUQuiz("")
        setNameUQuiz("")
        setImgUQuiz(null)
        // setDataUQuiz(null)

    }

    const handlePriew = (Event) => {
        if (Event && Event.target && Event.target.files[0]) {

            setImgUQuiz(Event.target.files[0]);

        }
    }


    const handleSubmit = async () => {

        // need to process unsyncrous
        let temp = {}
        temp.id = dataUQuiz.id
        temp.description = descriptionUQuiz ? descriptionUQuiz : dataUQuiz.description
        temp.name = nameUQuiz ? nameUQuiz : dataUQuiz.name
        temp.difficulty = difficultyUQuiz ? difficultyUQuiz.value : dataUQuiz.difficulty
        temp.quizImage = imgUQuiz ? imgUQuiz : dataUQuiz.image



        let res = await putUpdateQuiz(temp)
        // console.log(res)

        if (res && res.EC === 0) {
            await getAllDataQuizManage()
            handleClose()
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
                size='xl'
                className='modalUpdateUser'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update a quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">ID Quiz</label>
                            <input
                                type="text"
                                className="form-control"
                                disabled
                                value={dataUQuiz?.id}

                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={
                                    (event) => {
                                        setNameUQuiz(event.target.value)
                                    }
                                }
                                defaultValue={dataUQuiz?.name}

                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={dataUQuiz?.description}
                                onChange={
                                    (event) => {
                                        setDescriptionUQuiz(event.target.value)
                                    }
                                }

                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Difficulty</label>

                            <Select
                                options={options}
                                defaultValue={dataUQuiz?.difficulty}
                                onChange={setDifficultyUQuiz}
                                placeholder={dataUQuiz?.difficulty}
                            />
                        </div>


                        <div className="col-md-14 up" style={{ width: "auto" }}>

                            <label className="form-label label-upload" htmlFor='uploadimage' > <GoPlusSmall color="blue" />upload file image</label>
                            <input type="file" id={'uploadimage'} hidden onChange={(Event) => {
                                handlePriew(Event)
                            }} />
                        </div>
                        <div className="col-md-12 img-priview">
                            {
                                imgUQuiz ?
                                    <span className='pos-img'><img src={URL.createObjectURL(imgUQuiz)} /></span>
                                    :
                                    // dataUQuiz && dataUQuiz.image ?
                                    <span className='pos-img'><img src={`data:image/png;base64,${dataUQuiz?.image}`}></img></span>
                                // :
                                // <span></span>

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

export default ModalUpdateQuiz;