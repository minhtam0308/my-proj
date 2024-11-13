import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import { getQuizById } from "../service/APIrequest"
import './DetailQuiz.scss'
import _ from "lodash"
import Question from "./Question"

const DetailQuiz = () => {
    const params = useParams()
    const location = useLocation()
    const quizId = params.id

    const [dataQues, setDataQues] = useState([])
    const [index, setIndex] = useState(0)

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
                        />
                        <div className="quiz-btn">
                            <button className="btn btn-primary" onClick={() => {
                                handlerPrev()
                            }}>prev</button>
                            <button className="btn btn-secondary ml-3" onClick={() => {
                                handlerNext()
                            }}>next</button>
                        </div>

                    </div>
                    <div className="right-content">
                        adsadsasd
                    </div>
                </div>

                <div className="footer">

                </div>
            </div>
        </>
    )
}
export default DetailQuiz