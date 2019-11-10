import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import timeConverter from '../utils/helpers'

export default function PostGrid ( {posts} ) {
    return (
        <ul>
        {posts.map((post) => {
            const { id, by , title, text, url, descendants: comments, time } = post

            return (
                <li key={id} className='post_light'>
                    <ul>
                        <li>
                            <a href={url} target="_blank" className='link_light'>{title}</a>
                        </li>
                        <li className="description_text_light">
                            by <Link to={`/user?id=${by}`}>{by}</Link> on {timeConverter(time)} with <Link to={`/post?id=${id}`}>{comments}</Link> comments
                        </li>
                    </ul>
                </li>
            )
        })}
        </ul>
    )
}
  
PostGrid.propTypes = {
    posts:  PropTypes.array.isRequired
}
  