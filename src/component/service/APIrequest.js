

import axios from "../customize/Customize_axios";

const APIservice = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.post('api/v1/participant', data)

}
const GetallUser = () => {
    return axios.get('api/v1/participant/all')
}
const putUpdateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.put('api/v1/participant', data)

}

const DeleteUser = (userId) => {
    return axios.delete('api/v1/participant', { data: { id: userId } })
}
const getUserWithPaginatte = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}

const postLogin = (email, password) => {
    return axios.post(`api/v1/login`, { email, password })
}


const postSignin = (email, username, password) => {
    return axios.post(`api/v1/register`, { email, username, password })
}

const getListQuiz = () => {
    return axios.get('api/v1/quiz-by-participant')
}

const getQuizById = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`)
}

const postSubmitAnswer = (data) => {
    return axios.post(`api/v1/quiz-submit`, { ...data })
}

const postAddQuiz = (description, name, difficulty, image) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);

    return axios.post('api/v1/quiz', data)
}

const getQuizToManage = () => {
    return axios.get('api/v1/quiz/all')
}


const putUpdateQuiz = (dataQuiz) => {
    // console.log(dataQuiz)
    const data = new FormData();
    data.append('id', dataQuiz.id)
    data.append('description', dataQuiz.description);
    data.append('name', dataQuiz.name);
    data.append('difficulty', dataQuiz.difficulty);
    data.append('quizImage', dataQuiz.quizImage);

    return axios.put('api/v1/quiz', data)
}

const delQuiz = (id) => {
    return axios.delete(`api/v1/quiz/${id}`)
}

const postQuesForQuiz = (quiz_id, description, questionImage) => {
    const data = new FormData();
    data.append('quiz_id', quiz_id)
    data.append('description', description);
    data.append('questionImage', questionImage);
    return axios.post(`api/v1/question`, data)
}

const postAnsWithIdQuesForQuiz = (description, correct_answer, question_id) => {
    return axios.post(`api/v1/answer`, {
        description, correct_answer, question_id
    })
}

const getQAbyIdQuizManage = (id) => {
    return axios.get(`api/v1/quiz-with-qa/${id}`)
}

const postUpsertQAWithQuiz = (quizId, questions) => {
    return axios.post(`api/v1/quiz-upsert-qa`, {
        quizId, questions
    })
}

//gan quiz cho 1 user
const postAssignQuizToUser = (quizId, userId) => {
    return axios.post(`api/v1/quiz-assign-to-user`, {
        quizId, userId
    })
}

export {
    APIservice, GetallUser, putUpdateUser, DeleteUser,
    getUserWithPaginatte, postLogin, postSignin,
    getListQuiz, getQuizById, postSubmitAnswer, postAddQuiz,
    getQuizToManage, putUpdateQuiz, delQuiz, postQuesForQuiz,
    postAnsWithIdQuesForQuiz, getQAbyIdQuizManage, postUpsertQAWithQuiz,
    postAssignQuizToUser

};

