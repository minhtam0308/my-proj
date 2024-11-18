import './Questions.scss'
import Select from 'react-select';
import { FaRegMinusSquare, FaRegPlusSquare } from "react-icons/fa";
import { RiImageAddLine } from "react-icons/ri";
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import _, { every } from 'lodash'


const Questions = () => {


    const [dataAddQues, setDataAddQues] = useState([{
        id: uuidv4(),
        description: "question 1",
        imageFile: '',
        imageName: '',
        answer: [
            {
                id: uuidv4(),
                description: 'answer 1',
                isCheck: false
            }
        ]
    }
    ])




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

    const saveChange = () => {
        console.log(dataAddQues)
    }

    return (
        <div className="questions-container">
            <div className="title">
                Manage Questions
            </div>
            <div className='select-quiz'>
                <Select

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
                                    className="form-control inp-des"
                                    placeholder="Password"
                                    value={question.description}
                                    onChange={(event) => {
                                        handlerChangeQues(question.id, event.target.value)
                                    }}
                                />
                                <label>Questions {indexques + 1}'s description</label>
                            </div>
                            <div className="col-md-14 px-1 up">

                                <label className="form-label label-upload" htmlFor={question.id} style={{ border: "none" }}> <RiImageAddLine color="purple" fontSize={20} width={30} /></label>
                                <input type="file" id={question.id} hidden onChange={(event) => {
                                    handleChangeFile(question.id, event)
                                }} />


                            </div>
                            <span>{question.imageName ? question.imageName : 'have no image'}</span>
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
                                            className="form-control inp-des"
                                            placeholder="Password"
                                            value={answer.description}
                                            onChange={(event) => {
                                                handeleChangeAnsCheck('ANS', question.id, answer.id, event)
                                            }}
                                        />
                                        <label>Answer {indexAns + 1}</label>
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
        </div>
    )
}
export default Questions