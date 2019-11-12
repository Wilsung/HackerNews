import React from 'react'
import queryString from 'query-string'
import { fetchItem, fetchComments } from '../utils/api'
import Loading from './Loading'
import { Link } from 'react-router-dom'
import timeConverter from '../utils/helpers'
import Comment from './Comment'
import { ThemeConsumer } from '../contexts/theme'

export default class Post extends React.Component{
    state = {
        post: null,
        comments: null,
        loadingPost: true,
        loadingComments: true,
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
            return fetchComments(post.kids ? post.kids.slice(0,30) : [])
         }).then((comments) => {
            this.setState({ 
                comments,
                loadingComments: false
            })
         })
         .catch((e) => {
            this.setState({
                error: `There was an error fetching the comments.`
            })
            console.warn(e)
        })
    }
    
    render(){
        const { loadingPost, post, comments, loadingComments } = this.state
        return(
            <ThemeConsumer>
                { ({ theme }) => (
                    <React.Fragment>
                        {loadingPost === true
                        ? <Loading text='Loading Post'/>
                        : <div>
                            <h1 className='user_header'><a href={post.url} target="_blank" className={`link_${theme}`}>{post.title}</a></h1>
                            <div className={`description_text_${theme}`}>
                                by <Link to={`/user?id=${post.by}`}>{post.by}</Link> on {timeConverter(post.time)} with <Link to={`/post?id=${post.id}`}>{post.descendants}</Link> comments
                            </div>
                            <div>
                                {loadingComments === true 
                                ? <Loading text="Loading Comments" />
                                : <Comment comments={comments}/>}
                            </div>
                        </div>
                        }
                    </React.Fragment>
                )}
            </ThemeConsumer>
        )
    }
}