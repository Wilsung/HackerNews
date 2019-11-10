import React from 'react'
import PropTypes from 'prop-types'
import timeConverter from '../utils/helpers'
import { Link } from 'react-router-dom'

export default function Comment (props){

    const { comments } = props
    return (
        <ul>

            {comments.map((comment) => {
                const { id, by, time, text } = comment
               
                return (
                    <li key={id} className="comment_text_light">
                        <ul className='user_data_light'>
                            by <Link to={`/user?id=${by}`}>{by}</Link> on {timeConverter(time)}
                        </ul>
                        <div>
                            {text && <p dangerouslySetInnerHTML={{__html: text}} />}
                        </div>
                    </li>
                )   
            })}
        </ul>
    )
}

Comment.propTypes = {
    comments: PropTypes.array.isRequired
}