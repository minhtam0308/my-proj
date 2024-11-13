import { useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"
import { getQuizById } from "../service/APIrequest"
import './DetailQuiz.scss'
import _ from "lodash"

const DetailQuiz = () => {
    const params = useParams()
    const location = useLocation()
    const quizId = params.id
    useEffect(() => {
        console.log("check location: ", location)
        fetchDetailQuiz()
    }
        , [quizId])

    const fetchDetailQuiz = async () => {
        const res = await getQuizById(quizId)
        console.log('check question: ', res)
        if (res.EC == 0) {
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
            console.log("temp ", temp)
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
                        <div className="q-content">
                            cau 1
                        </div>
                        <div className="a-content">
                            cau 1
                        </div>
                        <div className="quiz-btn">
                            <button className="btn btn-primary">prev</button>
                            <button className="btn btn-secondary ml-3">next</button>
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