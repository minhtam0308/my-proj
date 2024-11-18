import { useState } from "react";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";

const TableManageQuiz = (props) => {
    const { dataQuizManage } = props

    const [showUpdate, setShowUpdate] = useState(false)
    const [dataUQuiz, setDataUQuiz] = useState({})

    const [showDelete, setShowDelete] = useState(false)


    const handleEditQuiz = (val) => {
        // console.log(val)
        setShowUpdate(true)

        setDataUQuiz(val)
    }
    const handleDeleteQuiz = (val) => {
        setDataUQuiz(val)
        setShowDelete(true)
    }

    // console.log(dataQuizManage)
    return (
        <div className="table-manage-quiz">
            <div ><b>Table quizzes</b></div>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Difficulty</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    {dataQuizManage && dataQuizManage.length > 0 && dataQuizManage.map((val, index) => {
                        return (<tr key={`table-quiz-${index}`}>
                            <td>{val.id}</td>
                            <td>{val.name}</td>
                            <td>{val.description}</td>
                            <td>{val.difficulty}</td>
                            <td style={{ display: "flex", gap: "2px" }}>
                                <button className="btn btn-warning"
                                    onClick={() => {

                                        handleEditQuiz(val)
                                    }}
                                >Edit</button>
                                <button className="btn btn-danger"
                                    onClick={() => {
                                        handleDeleteQuiz(val)
                                    }}
                                >Delete</button>
                            </td>
                        </tr>)

                    })


                    }
                    {dataQuizManage.length === 0 &&
                        <tr >

                            <td colSpan={5}>hane no data</td>
                        </tr>
                    }


                </tbody>
            </table>
            <ModalUpdateQuiz
                show={showUpdate}
                setShow={setShowUpdate}
                dataUQuiz={dataUQuiz}
                getAllDataQuizManage={props.getAllDataQuizManage}
            // setDataUQuiz={setDataUQuiz}
            />
            <ModalDeleteQuiz
                show={showDelete}
                setShow={setShowDelete}
                dataDeleteQuiz={dataUQuiz}
                getAllDataQuizManage={props.getAllDataQuizManage}
            />
        </div>
    )
}
export default TableManageQuiz