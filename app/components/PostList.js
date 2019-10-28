import React from 'react'
import PropTypes from 'prop-types'

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var year = a.getFullYear();
    var month = a.getMonth();
    var date = a.getDate();
    var hour = a.getHours();
    var AMPM = 'AM';
    if (hour > 12){
        AMPM = 'PM';
        hour -= 12;
    }else if (hour == 12){
        AMPM = 'PM'
    }else if (hour == 0){
        hour = 12;
    }
    var min = (a.getMinutes() < 10) ? '0' + a.getMinutes() : a.getMinutes();
    var time = `${month}/${date}/${year}, ${hour}:${min} ${AMPM}`;
    return time;
}

export default function PostGrid ( {posts} ) {
    return (
        <ul>
        {posts.map((post) => {
            const { id, by , title, text, url, descendants: comments, time  } = post
        

            return (
                <li key={id} className='post'>
                    <ul>
                        <li>
                            <a href={url} target="_blank" className='link'>{title}</a>
                        </li>
                        <li className="description_text">
                        by <a href="" target="_blank">{by}</a> on {timeConverter(time)} with <a href="" target="_blank">{comments}</a> comments
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
  