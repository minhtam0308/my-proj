
import ModalCreateUser from "./ModalCreateUser";
import TableUser from "./tableUser";
import { useEffect, useState } from "react";
import { getUserWithPaginatte, GetallUser } from "../service/APIrequest";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserWithPaginate from "./TableUserWithPaginate";

const CreatUser = () => {
    const LIMIT = 6

    const [listuser, setListuser] = useState([])

    const [showModal, setShowModal] = useState(false);

    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateUser, setUpdateUser] = useState({})

    const [viewUser, setViewUser] = useState({})
    const [showViewModal, setShowViewModal] = useState(false);

    const [dataDeleteUser, setDataDeleteUser] = useState({})
    const [showDeleteModal, VsetShowDeleteModal] = useState(false);


    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)

    const resetUpdateUser = () => {
        setUpdateUser({})
    }

    const clickBtnDelete = (user) => {
        VsetShowDeleteModal(true)
        setDataDeleteUser(user)
    }

    const clickBtnViewUser = (user) => {
        setShowViewModal(true)
        setViewUser(user)
    }
    const clickBtnUpdateUser = (user) => {
        setShowUpdateModal(true)
        setUpdateUser(user)
    }

    useEffect(() => {
        // fetchgetall();
        fetchGetUserWithPageinatte(page)
        // console.log("get")

    }, [page])
    // let fetchgetall = async () => {
    //     const res = await GetallUser();
    //     if (res.EC === 0) {
    //         setListuser(res.DT);
    //     }

    // }
    let fetchGetUserWithPageinatte = async (page) => {
        const res = await getUserWithPaginatte(page, LIMIT);
        if (res.EC === 0) {
            setListuser(res.DT.users);
            setPageCount(res.DT.totalPages)

        }

    }
    return (
        <div className="Create-container">
            <div className="title">
                Create User
            </div>
            <div className="Submit-create">
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>Add a new user</button>

            </div>
            <div className="Model">
                <TableUserWithPaginate
                    listuser={listuser}

                    setShowUpdateModal={setShowUpdateModal}
                    setUpdateUser={setUpdateUser}
                    clickBtnUpdateUser={clickBtnUpdateUser}

                    clickBtnViewUser={clickBtnViewUser}

                    clickBtnDelete={clickBtnDelete}

                    setPage={setPage}
                    pageCount={pageCount}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
            <ModalCreateUser
                show={showModal}
                setShow={setShowModal}
                // fetchgetall={fetchgetall}
                fetchGetUserWithPageinatte={fetchGetUserWithPageinatte}
                setCurrentPage={setCurrentPage}
            />
            <ModalUpdateUser
                show={showUpdateModal}
                setShow={setShowUpdateModal}
                updateUser={updateUser}
                // fetchgetall={fetchgetall}
                resetUpdateUser={resetUpdateUser}
                fetchGetUserWithPageinatte={fetchGetUserWithPageinatte}
                currentPage={currentPage}
            />
            <ModalViewUser
                show={showViewModal}
                setShow={setShowViewModal}
                viewUser={viewUser}
            />
            <ModalDeleteUser
                show={showDeleteModal}
                setShow={VsetShowDeleteModal}
                dataDeleteUser={dataDeleteUser}
                // fetchgetall={fetchgetall}
                fetchGetUserWithPageinatte={fetchGetUserWithPageinatte}
                currentPage={currentPage}

            />
        </div>

    )
}
export default CreatUser;
