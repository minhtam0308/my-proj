
import { useEffect, useState } from "react";
import "./ManageQuiz.scss"
import Select from 'react-select';
import { getQuizToManage, postAddQuiz } from "../../service/APIrequest";
import { toast } from 'react-toastify';
import { Accordion } from "react-bootstrap";
import TableManageQuiz from "./TableManageQuiz";
import AsignQuiz from "./AsignQuiz";



const ManageQuiz = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [difficult, setDifficult] = useState("EASY")
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState("")

    const [dataQuizManage, setDataQuizManage] = useState({})



    useEffect(() => {
        getAllDataQuizManage()
    }, [])

    const getAllDataQuizManage = async () => {
        const res = await getQuizToManage()
        if (res && res.EC === 0) {
            setDataQuizManage(res.DT)
        } else {
            toast.error(res.EM)
        }
        // console.log("res", res)
    }

    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' }
    ];
    const handleChangImg = (event) => {
        setImage(event.target.files[0])
        setPreview(event.target.files)
    }

    const handleAddQuiz = async () => {
        if (name === "" || description === "") {
            toast.error("Name or Description is requied")
            return;
        }
        const res = await postAddQuiz(description, name, difficult?.value, image)
        if (res.EC === 0) {
            toast.success(res.EM)
            setDescription("")
            setDifficult("EASY")
            setName("")
            setImage(null)
            setPreview("")
            document.getElementById("input-img").value = ""
            await getAllDataQuizManage()

        } else {
            toast.error(res.EM)
        }

    }

    return (
        <>
            <div className="container-manage mx-5 mb-0">
                <div className="title">Manage quizzes</div>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Add new Quiz</Accordion.Header>
                        <Accordion.Body>
                            <div className="add-new-quiz my-1 mx-3">

                                <fieldset className=" rounded-3">
                                    <legend className="float-none w-auto px-2" style={{ float: "right", fontSize: "15px" }}>Add New Quiz:</legend>
                                    <div className="form-floating mb-2">
                                        <input type="text"
                                            className="form-control"
                                            value={name}
                                            onChange={
                                                (event) => {
                                                    setName(event.target.value)
                                                }
                                            } />
                                        <label>Name</label>
                                    </div>
                                    <div className="form-floating">
                                        <input type="text"
                                            className="form-control"
                                            placeholder="Password"
                                            value={description}
                                            onChange={
                                                (event) => {
                                                    setDescription(event.target.value)
                                                }
                                            } />
                                        <label>Description</label>
                                    </div>
                                    <div className="quesDifficult mt-3">
                                        <Select
                                            options={options}
                                            defaultValue={difficult}
                                            onChange={setDifficult}
                                            placeholder={"EASY"}
                                        />
                                    </div>
                                    <div className="choose-img mt-2">
                                        <label>Choose image</label>
                                        <input className="form-control"
                                            type="file"
                                            id="input-img"
                                            // value={image}
                                            onChange={
                                                (event) => {
                                                    handleChangImg(event)
                                                }
                                            }></input>
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => {
                                                handleAddQuiz()
                                            }}
                                        >Save</button>

                                    </div>
                                    <div className="preview">
                                        {
                                            preview ?

                                                <span>
                                                    <img src={URL.createObjectURL(preview[0])} alt="" />
                                                </span>
                                                :
                                                <div className="none"></div>
                                        }
                                    </div>
                                </fieldset>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Table Quiz</Accordion.Header>
                        <Accordion.Body>

                            <TableManageQuiz
                                dataQuizManage={dataQuizManage}
                                getAllDataQuizManage={getAllDataQuizManage}

                            />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Asign Quiz</Accordion.Header>
                        <Accordion.Body>
                            <AsignQuiz
                                dataQuizManage={dataQuizManage}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>



            </div>

        </>
    )
}

export default ManageQuiz