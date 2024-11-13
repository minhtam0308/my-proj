import 'react-bootstrap';
import { getListQuiz } from '../service/APIrequest';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListQuiz.scss'
const ListQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([])

    const navigate = useNavigate()


    useEffect(() => {
        ListQuiz()
    }, [])
    const ListQuiz = async () => {
        const res = await getListQuiz()
        if (res && res.DT) {
            setListQuiz(res.DT)

        }
    }


    return (
        <>
            <div className='listQuiz_container'>
                {
                    listQuiz && listQuiz.length > 0 ? listQuiz.map((values, index) => {
                        return (
                            <div className="card" key={`quiz ${index}`} style={{ width: "18rem" }}>
                                <img src={`data:image/png;base64,${values.image}`} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Quiz {index + 1}</h5>
                                    <p className="card-text">{values.description}</p>
                                    <button href="#" className="btn btn-primary" onClick={
                                        () => {
                                            navigate(`/quiz/${values.id}`, { state: { description: values.description } })
                                        }
                                    }>Start now</button>
                                </div>
                            </div>
                        )
                    })
                        :
                        <span className='noquiz'>no have any quiz</span>
                }
            </div>



        </>

    )
}

export default ListQuiz