import './Questions.scss'
import Select from 'react-select';
import { FaRegMinusSquare, FaRegPlusSquare } from "react-icons/fa";
import { RiImageAddLine } from "react-icons/ri";
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import { getQuizToManage, postAnsWithIdQuesForQuiz, postQuesForQuiz } from '../../service/APIrequest';
import { toast } from 'react-toastify';

const Questions = () => {
    const initQues = [{
        id: uuidv4(),
        description: "",
        imageFile: '',
        imageName: '',
        answer: [
            {
                id: uuidv4(),
                description: '',
                isCheck: false
            }
        ]
    }
    ]


    const [dataAddQues, setDataAddQues] = useState(initQues)
    const [viewImage, setViewImage] = useState("")
    const [listQuiz, setListQuiz] = useState([])
    const [quizSelect, setQuizSelect] = useState()
    const [idEmpty, setIdEmpty] = useState("")

    useEffect(() => {
        getAllDataQuizManage()
    }, [])

    const getAllDataQuizManage = async () => {
        const res = await getQuizToManage()
        if (res && res.EC === 0) {
            let temp = res.DT.map((item) => {
                return ({
                    value: item.id,
                    label: `${item.id} - ${item.name} - ${item.description}`
                })

            })
            setListQuiz(temp)
        }
    }



    const handleAddRemoveQues = (key, id) => {
        // console.log('check ', key, id)
        if (key === 'ADD') {
            let newQues = {
                id: uuidv4(),
                description: "",
                imageFile: '',
                imageName: '',
                answer: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCheck: false
                    }
                ]
            }
            setDataAddQues([...dataAddQues, newQues])

        }
        if (key === 'REMOVE') {
            let temp = _.cloneDeep(dataAddQues)
            temp = temp.filter(item => item.id !== id)
            setDataAddQues(temp)
        }
    }

    const handleAddRemoveAns = (key, quesID, ansID) => {
        // console.log('check ', key, quesID, ansID)
        if (key === 'ADD') {
            let newans =
            {
                id: uuidv4(),
                description: '',
                isCheck: false
            }
            let temp = _.cloneDeep(dataAddQues)
            let index = temp.findIndex(iteam => iteam.id === quesID)
            temp[index].answer.push(newans)
            setDataAddQues(temp)

        }
        if (key === 'REMOVE') {
            let temp = _.cloneDeep(dataAddQues)
            let index = temp.findIndex(iteam => iteam.id === quesID)
            temp[index].answer = temp[index].answer.filter(item => item.id !== ansID)
            setDataAddQues(temp)
        }
    }

    const handlerChangeQues = (quesId, des) => {
        let temp = _.cloneDeep(dataAddQues)
        let index = temp.findIndex(iteam => iteam.id === quesId)
        if (index > -1) {
            temp[index].description = des
            setDataAddQues(temp)
        }

    }

    const handleChangeFile = (quesId, event) => {
        let temp = _.cloneDeep(dataAddQues)
        let index = temp.findIndex(iteam => iteam.id === quesId)
        if (index > -1 && event && event.target.files[0]) {
            // console.log(event.target.files[0])
            temp[index].imageName = event.target.files[0].name
            temp[index].imageFile = event.target.files[0]
            setDataAddQues(temp)
        }
    }

    const handeleChangeAnsCheck = (key, quesId, ansId, event) => {
        let temp = _.cloneDeep(dataAddQues)
        let index = temp.findIndex(iteam => iteam.id === quesId)
        if (index > -1 && event && event.target.value) {
            // console.log(event.target.files[0])
            temp[index].answer = temp[index].answer.map((item) => {
                if (item.id === ansId) {
                    if (key === 'ANS') {
                        item.description = event.target.value
                    }
                    else if (key === 'CHECKBOX') {
                        item.isCheck = event.target.checked
                    }
                }
                return item
            })

            setDataAddQues(temp)
        }
    }

    const saveChange = async () => {
        // postQuesForQuiz = (quiz_id, description, questionImage) 
        // postAnsWithIdQuesForQuiz = (description, correct_answer, question_id) 
        // khong the trinh tu
        //submit question
        // await Promise.all(dataAddQues.map(async (question) => {
        //     const resQues = await postQuesForQuiz(+quizSelect.value, question.description, question.imageFile)
        //     //submit ans
        //     await Promise.all(question.answer.map(async (answer) => {
        //         const resAns = await postAnsWithIdQuesForQuiz(answer.description, answer.isCheck, resQues.DT.id)
        //     }))
        // }))


        //validate quiz
        if (!quizSelect) {
            toast.error(`Please choose the quiz`)
            return;
        }

        //validate Ques ans


        for (let i = 0; i < dataAddQues.length; i++) {
            let countAns = 0
            if (!dataAddQues[i].description) {
                toast.error(`Empty question at Question ${i + 1}`)
                setIdEmpty(dataAddQues[i].id)
                return;
            }
            for (let j = 0; j < dataAddQues[i].answer.length; j++) {
                if (!dataAddQues[i].answer[j].description) {
                    toast.error(`Empty answer at Question ${i + 1} and answer ${j + 1}`)
                    setIdEmpty(dataAddQues[i].answer[j].id)
                    return;
                }
                if (dataAddQues[i].answer[j].isCheck) {
                    countAns++;
                }
            }
            if (countAns === 0) {
                toast.error(`Please choose answer correct in question ${i + 1}`)
                setIdEmpty(dataAddQues[i].id)
                return
            }
            setIdEmpty()
        }


        // theo trinh tu
        for (const question of dataAddQues) {
            const resQues = await postQuesForQuiz(+quizSelect.value, question.description, question.imageFile)
            for (const answer of question.answer) {
                const resAns = await postAnsWithIdQuesForQuiz(answer.description, answer.isCheck, resQues.DT.id)
            }
        }
        setDataAddQues(initQues)

    }



    return (
        <div className="questions-container">
            <div className="title">
                Manage Questions
            </div>
            <div className='select-quiz form-group col-6' >
                <Select
                    options={listQuiz}
                    defaultValue={quizSelect}
                    // value={listQuiz[0]}
                    onChange={setQuizSelect}


                />
            </div>
            <div className='add-question'>
                <div className='title1'>Add Questions: </div>

                {dataAddQues.map((question, indexques) => {
                    return (<div key={`conten ${question.id}`} className='q-a-content'>
                        <div className='question-content'>
                            <div className="form-floating des" >
                                <input

                                    type="text"
                                    className={idEmpty && question.id === idEmpty
                                        ?
                                        "form-control inp-des is-invalid"
                                        :
                                        "form-control inp-des"
                                    }
                                    placeholder="Password"
                                    value={question.description}
                                    onChange={(event) => {
                                        handlerChangeQues(question.id, event.target.value)
                                    }}
                                />
                                <label style={{ zIndex: 0 }}>Questions {indexques + 1}'s description</label>
                            </div>
                            <div className="col-md-14 px-1 up">

                                <label className="form-label label-upload" htmlFor={question.id} style={{ border: "none" }}> <RiImageAddLine color="purple" fontSize={20} width={30} /></label>
                                <input type="file" id={question.id} hidden onChange={(event) => {
                                    handleChangeFile(question.id, event)
                                }} />


                            </div>
                            <div style={{ width: "150px" }}>{question.imageName ?
                                <span onClick={() => {
                                    setViewImage(question.imageFile)
                                }}>{question.imageName}</span>
                                :
                                'have no image'}</div>
                            <div className='control'>
                                <span

                                    onClick={() => {
                                        handleAddRemoveQues('ADD', '')
                                    }}>
                                    <FaRegPlusSquare color='green' />
                                </span>
                                {dataAddQues.length > 1 &&
                                    <span

                                        onClick={() => {
                                            handleAddRemoveQues('REMOVE', question.id)
                                        }}>
                                        <FaRegMinusSquare color='red' />
                                    </span>
                                }
                            </div>

                        </div>
                        {question.answer && question.answer.map((answer, indexAns) => {
                            return (
                                <div key={`contenta ${answer.id}`} className='ans-content'>
                                    <input className="form-check-input check-ans" type="checkbox" checked={answer.isCheck} onChange={
                                        (event) => {
                                            handeleChangeAnsCheck('CHECKBOX', question.id, answer.id, event)
                                        }
                                    } />
                                    <div className="form-floating des" >

                                        <input

                                            type="text"
                                            className={idEmpty && answer.id === idEmpty
                                                ?
                                                "form-control inp-des is-invalid"
                                                :
                                                "form-control inp-des"}
                                            placeholder="Password"
                                            value={answer.description}
                                            onChange={(event) => {
                                                handeleChangeAnsCheck('ANS', question.id, answer.id, event)
                                            }}
                                        />
                                        <label style={{ zIndex: 0 }}>Answer {indexAns + 1}</label>
                                    </div>

                                    <div className='control'>
                                        <span

                                            onClick={() => {
                                                handleAddRemoveAns('ADD', question.id, '')
                                            }}>
                                            <FaRegPlusSquare color='green' />
                                        </span>
                                        {question.answer.length > 1 &&
                                            <span

                                                onClick={() => {
                                                    handleAddRemoveAns('REMOVE', question.id, answer.id)
                                                }}>
                                                <FaRegMinusSquare color='red' />
                                            </span>
                                        }
                                    </div>
                                </div>
                            )
                        })}

                    </div>)
                })}

            </div>

            <div className='saveChange'>
                <button className='btn btn-warning' onClick={saveChange}>Save Change</button>
            </div>
            {viewImage &&
                <Lightbox image={URL.createObjectURL(viewImage)} title={viewImage.name} onClose={() => setViewImage("")}></Lightbox>
            }
        </div>
    )
}
export default Questions