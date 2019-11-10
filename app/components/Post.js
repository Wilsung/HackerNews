import React from 'react'
import queryString from 'query-string'
import { fetchItem, fetchComments } from '../utils/api'
import Loading from './Loading'
import { Link } from 'react-router-dom'
import timeConverter from '../utils/helpers'

export default class Post extends React.Component{
    state = {
        post: null,
        comments: null,
        loadingPost: true,
        error: null
    }

    componentDidMount(){
        const { id } = queryString.parse(this.props.location.search)
        fetchItem(id)
         .then((post)=> {
            this.setState({
                post,
                loadingPost: false
            })
            return fetchComments(post.kids.slice(0,30))
         }).then((comments) => {
            this.setState({comments})
         })
         .catch(() => {
            this.setState({
                error: `There was an error fetching the posts.`
              })
            console.warn('Error fetching post: ', error)
        })
    }
    
    render(){
        const { loadingPost, post } = this.state
        return(
            <React.Fragment>
                {loadingPost === true
                ? <Loading text='Loading Post'/>
                : <div>
                    <h1 className="user_header_light"><a href={post.url} target="_blank" className='link_light'>{post.title}</a></h1>
                    <div className="description_text_light">
                        by <Link to={`/user?id=${post.by}`}>{post.by}</Link> on {timeConverter(post.time)} with <Link to={`/post?id=${post.id}`}>{post.descendants}</Link> comments
                    </div>
                    
                  </div>
                }
            </React.Fragment>
        )
    }
}