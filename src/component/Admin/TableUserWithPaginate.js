import ReactPaginate from "react-paginate";
import React from "react";



const TableUserWithPaginate = (props) => {


    const { listuser } = props;


    // We start with an empty list of items.




    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        props.setCurrentPage(+event.selected + 1)
        props.setPage(+event.selected + 1)
        // console.log(`User requested page number ${event.selected}`);
    };

    return (
        <>

            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Email</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Role</th>
                        <th scope="col">Active</th>
                    </tr>
                </thead>
                <tbody>
                    {listuser && listuser.length > 0 && listuser.map((value, index) => {
                        return (
                            <tr key={`table__inndex ${index}`}>
                                {/* {console.log(`"table__inndex" + ${index}`)} */}
                                <td>{value.id}</td>
                                <td>{value.email}</td>
                                <td>{value.username}</td>
                                <td>{value.role}</td>
                                <td>
                                    <button className="btn btn-success" onClick={() => {
                                        props.clickBtnViewUser(value)
                                    }}
                                    >View</button>
                                    <button className="btn btn-warning mx-3" onClick={() => {

                                        props.clickBtnUpdateUser(value)
                                    }}>Upđate</button>
                                    <button className="btn btn-danger" onClick={() => {
                                        props.clickBtnDelete(value)
                                    }}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                    )
                    }
                    {
                        listuser && listuser.length === 0 &&
                        <tr>
                            <td scope="row" colSpan={5}>Not found</td>

                        </tr>
                    }

                </tbody>
            </table>

            <div className="movePage">

                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={props.pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={+props.currentPage - 1}
                />
            </div>

        </>
    );
}

// Add a <div id="container"> to your HTML to see the componend rendered.

export default TableUserWithPaginate