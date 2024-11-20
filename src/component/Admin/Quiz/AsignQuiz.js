
import { useEffect, useState } from "react"
import _ from "lodash"
import Select from 'react-select';
import { GetallUser, postAssignQuizToUser } from "../../service/APIrequest";
import { toast } from 'react-toastify';


const AsignQuiz = (props) => {
    // console.log(props)

    const [listQuiz, setListQuiz] = useState()
    const [quizSelect, setQuizSelect] = useState()

    const [listUser, setListUser] = useState()
    const [userSelect, setUserSelect] = useState()

    useEffect(() => {
        setUpListQuiz()
    }, [props.dataQuizManage])

    useEffect(() => {
        setUpListUser()
    }, [])

    const setUpListQuiz = () => {
        if (!_.isEmpty(props.dataQuizManage)) {
            let temp = props.dataQuizManage.map((item) => {
                return ({
                    label: `${item.id} - ${item.name} - ${item.description}`,
                    value: item.id
                })
            })

            setListQuiz(temp)
        }

    }

    const setUpListUser = async () => {
        const res = await GetallUser()
        // console.log(res)s
        let temp = res.DT.map((item) => {
            return ({
                value: item.id,
                label: `${item.email} - ${item.username}`
            })
        })
        setListUser(temp)

    }
    const handleAssign = async () => {
        if (!userSelect || !quizSelect) {
            toast.error("Please choose user and quiz")
            return;
        }
        const res = await postAssignQuizToUser(quizSelect.value, userSelect.value)
        if (res && res.EC === 0) {
            toast.success(res.EM)
        } else {
            toast.error(res.EM)
        }
    }
    // console.log(userSelect, quizSelect)
    return (
        <div className="assign-quiz-container row" >
            <div className=" col-6">
                <label className="mb-3">Choose Quiz</label>
                <Select
                    options={listQuiz}
                    defaultValue={quizSelect}
                    onChange={setQuizSelect}
                    placeholder={"Choose Quiz"}
                />
            </div>

            <div className=" col-6">
                <label className="mb-3">Choose Quiz</label>
                <Select
                    options={listUser}
                    defaultValue={userSelect}
                    onChange={setUserSelect}
                    placeholder={"Choose User"}
                />
            </div>
            <div className="btn-enter d-flex justify-content-center">
                <button className="btn btn-warning mt-3 col-5 " onClick={() => handleAssign()}>Accept</button>
            </div>
        </div>
    )

}
export default AsignQuiz