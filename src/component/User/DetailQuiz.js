import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import { getQuizById, postSubmitAnswer } from "../service/APIrequest"
import './DetailQuiz.scss'
import _ from "lodash"
import Question from "./Question"
import ModalResult from "./ModalResult"

const DetailQuiz = () => {
    const params = useParams()
    const location = useLocation()
    const quizId = params.id

    const [dataQues, setDataQues] = useState([])
    const [index, setIndex] = useState(0)

    const [showModalResult, setShowModalResult] = useState(false)
    const [resQuiz, setResQuiz] = useState({})

    useEffect(() => {
        // console.log("check location: ", location)
        fetchDetailQuiz()
    }
        , [quizId])

    const handlerNext = () => {
        if (index + 1 < dataQues.length) {
            setIndex(index + 1)
        }
        else {
            alert("qua r")
        }
    }
    const handlerPrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1)
    }

    const fetchDetailQuiz = async () => {
        const res = await getQuizById(quizId)
        // console.log('check question: ', res)
        if (res.EC === 0) {
            let temp = _.chain(res.DT)
                // Group the elements of Array based on `id` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answer = []
                    let description, image = null
                    value.forEach((val, index) => {
                        if (index === 0) {
                            description = val.description
                            image = val.image
                        }
                        val.answers.isChecked = false
                        answer.push(val.answers)
                    })

                    // return {}
                    return { QuestionId: key, answers: answer, description: description, image: image }
                }
                )
                .value()
            setDataQues(temp)
            // console.log("data ques", dataQues)
        }
    }

    const fixCheckbox = (event, ansId, qesId) => {
        let item = _.cloneDeep(dataQues)
        let question = item.find(res => +res.QuestionId === +qesId)
        // console.log('ques', question, ansId, qesId)
        if (question && question.answers) {
            question.answers = question.answers.map((val) => {
                if (+val.id === +ansId) {
                    val.isChecked = event.target.checked
                }
                return val
            })
        }
        setDataQues(item)
        // console.log('iteam', item)
    }

    const handleFinish = async () => {
        // console.log("dataQuis ", dataQues)
        // {
        //     "quizId": 1,
        //     "answers": [
        //         { 
        //             "questionId": 1,
        //             "userAnswerId": [3]
        //         },
        //         { 
        //             "questionId": 2,
        //             "userAnswerId": [6]
        //         }
        //     ]
        // }
        let payload = {
            quizId: quizId,
            answers: []
        }
        if (dataQues && dataQues.length > 0) {
            dataQues.forEach((question) => {
                let answer = {}
                let userAnswerId = []

                answer.questionId = +question.QuestionId
                // console.log(answer.questionId)
                question.answers.forEach((item) => {
                    if (item.isChecked) {
                        userAnswerId.push(item.id)

                    }
                }
                )
                answer.userAnswerId = userAnswerId

                if (answer.userAnswerId.length > 0) {
                    payload.answers.push(answer)

                }
            })


        }

        // console.log("payload", payload)
        const res = await postSubmitAnswer(payload)
        if (res.EC === 0) {
            setResQuiz({
                countCorrect: res.DT.countCorrect,
                countTotal: res.DT.countTotal,
                quizData: res.DT.quizData

            })
            setShowModalResult(true)
            // console.log(res)

        } else {
            alert("something wrong")
        }
    }

    return (
        <>
            <div className="contain-Detail">
                <div className="title">
                    Quiz {quizId}: {location.state.description}
                </div>
                <div className="contain-content">
                    <div className="left-content">
                        <Question
                            data={dataQues[index]}
                            index={index}
                            fixCheckbox={fixCheckbox}
                        />
                        <div className="quiz-btn">
                            <button className="btn btn-primary" onClick={() => {
                                handlerPrev()
                            }}>prev</button>
                            <button className="btn btn-secondary" onClick={() => {
                                handlerNext()
                            }}>next</button>
                            <button className="btn btn-warning" onClick={() => {
                                handleFinish()
                            }}>Finish</button>
                        </div>

                    </div>
                    <div className="right-content">
                        adsadsasd
                    </div>
                </div>

                <div className="footer">

                </div>
                <ModalResult
                    show={showModalResult}
                    setShow={setShowModalResult}
                    resQuiz={resQuiz}
                />
            </div>

        </>
    )
}
export default DetailQuiz