import _ from 'lodash'

const Question = (props) => {
    const { data, index } = props
    // console.log('data', data)
    if (_.isEmpty(data)) {
        return;
    }
    return (
        <>
            {data && data.image ?
                <div className='q-img'>
                    <img src={`data:image/png;base64,${data.image}`} alt="..." />
                </div>
                :
                <div className='q-img'>

                </div>
            }
            <div className="q-content">
                Câu {index + 1}: {data.description} ?
            </div>
            {data.answers.map((val, i) => {
                return (
                    <div className='a-content' key={i}>
                        <input className="form-check-input" type="checkbox" checked={val.isChecked} value="" onChange={(event) => { props.fixCheckbox(event, val.id, data.QuestionId) }} />
                        <label className="form-check-label">
                            {val.description}
                        </label>
                    </div>

                )
            })}

        </>
    )
}

export default Question