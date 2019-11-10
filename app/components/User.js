import React from 'react'
import { fetchUser, fetchPosts } from '../utils/api'
import queryString from 'query-string'
import Loading from './Loading'
import timeConverter from '../utils/helpers'
import PostList from './PostList'

export default class User extends React.Component{
    state = {
        user: null,
        loadingUser: true,
        posts: null,
        loadingPosts: true,
        error: null,
    }
    componentDidMount(){
        const { id } = queryString.parse(this.props.location.search)

        fetchUser(id)
          .then((user) => {
              this.setState({
                  user,
                  loadingUser: false,
              })
              return fetchPosts(user.submitted.slice(0,30))
          }).then((posts) => {
                this.setState({
                    posts,
                    loadingPosts: false
                })
          })
          .catch(() => {
            this.setState({
              error: `There was an error fetching the user.`
            })
            console.warn('Error fetching user: ', error)
        }) 
    }
    render(){
        const { user, loadingUser, posts, loadingPosts } = this.state
        return(
            <React.Fragment>
                {loadingUser === true 
                  ? <Loading text="Loading User" /> 
                  : <React.Fragment>
                      <h1 className="user_header_light">{user.id}</h1>
                        <div className="user_data_light">
                            joined <b>{timeConverter(user.created)}</b> has <b>{user.karma}</b> karma
                        </div>

                        {user.about && <p dangerouslySetInnerHTML={{__html: user.about}} />}
                        {loadingPosts === true 
                        ? <Loading text="Loading Posts" /> 
                        : <React.Fragment>
                            <h2>Posts</h2>
                            <PostList posts={posts} />
                            {posts.length === 0 && <p className='flex-center'>This user hasn't posted yet.</p>}
                          </React.Fragment>
                        }
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}