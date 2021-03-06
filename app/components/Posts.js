import React from 'react'
import PropTypes from 'prop-types'
import { fetchMainPosts } from '../utils/api'
import PostList from './PostList'
import Loading from './Loading'

export default class Posts extends React.Component{
    state = {
        posts: null,
        error: null,
    }

    componentDidMount(){
      this.updatePost()
    }

    componentDidUpdate(prevProps){
      if (prevProps.type !== this.props.type){
        this.updatePost()
      }
    }

    updatePost () {
      this.setState({
        posts: null,
        error: null,
      })
      fetchMainPosts(this.props.type)
          .then((posts) => {
            this.setState({posts})
          }) 
          .catch(() => {
              console.warn('Error fetching posts: ', error)

              this.setState({
                error: `There was an error fetching the posts.`
              })
          }) 
    }

    render(){
        const { posts,  error } = this.state
        return(
            <React.Fragment>

              {!posts && <Loading />}
              {posts && <PostList posts={posts}/>}

            </React.Fragment>
        )
    }
}

Posts.propTypes = {
  type: PropTypes.oneOf(['top', 'new'])
}