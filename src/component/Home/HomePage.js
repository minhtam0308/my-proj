import videoHome from "../../asset/videoHomePage.mp4"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Fade } from "react-bootstrap";

const HomePage = () => {
    const navigate = useNavigate()
    const isAuthued = useSelector(state => state.user.isAuthued)

    return (
        <div>
            <video autoPlay muted loop>
                <source
                    src={videoHome}
                    type="video/mp4"
                />
            </video>
            {isAuthued === false ?
                <button onClick={() => {
                    navigate("/login")
                }} className="btn-getstart">Get start free</button>
                :
                <button onClick={() => {
                    navigate("/user")
                }} className="btn-getstart">doing quiz now</button>
            }

        </div>
    )
}
export default HomePage;