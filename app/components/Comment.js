import React from 'react'
import PropTypes from 'prop-types'
import timeConverter from '../utils/helpers'
import { Link } from 'react-router-dom'
import { ThemeConsumer } from '../contexts/theme'

export default function Comment (props){

    const { comments } = props
    return (
        <ul>

            {comments.map((comment) => {
                const { id, by, time, text } = comment
               
                return (
                    <li key={id}>
                        <ThemeConsumer>
                            { ({ theme }) => (
                                <div className={`comment_text_${theme}`}>
                                    <ul className={`user_data_${theme}`}>
                                        by <Link to={`/user?id=${by}`}>{by}</Link> on {timeConverter(time)}
                                    </ul>
                                    <div>
                                        {text && <p dangerouslySetInnerHTML={{__html: text}} />}
                                    </div>
                                </div>
                            )}
                        </ThemeConsumer>
                    </li>
                        
                )   
            })}
        </ul>
    )
}

Comment.propTypes = {
    comments: PropTypes.array.isRequired
}