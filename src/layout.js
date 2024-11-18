import { Route, Routes } from 'react-router-dom';
import User from './component/User/User';
import Admin from './component/Admin/Admin';
import HomePage from './component/Home/HomePage';
import DashBoard from './component/Admin/DashBoard';
import CreatUser from './component/Admin/CreatUser';
import Login from './component/Auth/Login';
import App from './App';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Signin from './component/Auth/Signin';
import DetailQuiz from './component/User/DetailQuiz';
import ManageQuiz from './component/Admin/Quiz/ManageQuiz';
import Questions from './component/Admin/Question/Questions';

const Layout = () => {
    const NotFound = () => {
        return (
            <div className='alert alert-danger'>
                Not Found your URL
            </div>
        )

    }
    return (
        <>
            <Routes>
                <Route path='/' element={<App />} >
                    <Route index element={<HomePage />} />
                    <Route path='/user' element={<User />} />
                </Route>
                <Route path='/quiz/:id' element={<DetailQuiz />} />
                <Route path='/admin' element={<Admin />}>
                    <Route index element={<DashBoard />} />
                    <Route path='manage-users' element={<CreatUser />} />
                    <Route path='manage-quizzes' element={<ManageQuiz />} />
                    <Route path='manage-questions' element={<Questions />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/signin' element={<Signin />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover

            />
        </>
    )
}
export default Layout