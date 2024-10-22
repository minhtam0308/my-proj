import videoHome from "../../asset/videoHomePage.mp4"
const HomePage = () => {
    return (
        <div>
            <video autoPlay muted loop>
                <source
                    src={videoHome}
                    type="video/mp4"
                />
            </video>
            <div><button className="btn-getstart">Get start free</button></div>
        </div>
    )
}
export default HomePage;