import _ from 'lodash'

const Question = (props) => {
    const { data, index } = props
    // console.log(data)
    if (_.isEmpty(data)) {
        return;
    }
    return (
        <>
            {data && data.image &&
                <div className='q-img'>
                    <img src={`data:image/png;base64,${data.image}`} alt="..." />
                </div>
            }
            <div className="q-content">
                Câu {index + 1}: {data.description} ?
            </div>
            {data.answers.map((val) => {
                return (
                    <div className='a-content'>
                        <input class="form-check-input" type="checkbox" value="" />
                        <label class="form-check-label">
                            {val.description}
                        </label>
                    </div>

                )
            })}

        </>
    )
}

export default Question