import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import timeConverter from '../utils/helpers'
import { ThemeConsumer } from '../contexts/theme'

export default function PostGrid ( {posts} ) {
    return (
        <ul>
        {posts.map((post) => {
            const { id, by , title, text, url, descendants: comments, time } = post

            return (
                
                <li key={id}>
                    <ThemeConsumer>
                    { ({ theme }) => (
                    <div className={`post_${theme}`}>
                        <ul>
                            <li>
                                <a href={url} target="_blank" className={`link_${theme}`}>{title}</a>
                            </li>
                            <li className={`description_text_${theme}`}>
                                by <Link to={`/user?id=${by}`}>{by}</Link> on {timeConverter(time)} with <Link to={`/post?id=${id}`}>{comments}</Link> comments
                            </li>
                        </ul>
                    </div>
                    )}
                    </ThemeConsumer>
                </li>
            )
        })}
        </ul>
    )
}
  
PostGrid.propTypes = {
    posts:  PropTypes.array.isRequired
}
  