



const TableUser = (props) => {

    const { listuser } = props;


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
        </>
    )
}

export default TableUser;
