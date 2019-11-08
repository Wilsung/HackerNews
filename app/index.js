import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Posts from './components/Posts'
import Nav from './components/Nav'
import User from './components/User'

class App extends React.Component{
    render(){
        return (
            <Router>
                <div className='container'>
                    <Nav />
                    <Switch>
                        <Route exact path='/' render={()=> <Posts type='top'/>}/>
                        <Route path='/new' render={()=> <Posts type='new'/>}/>
                        <Route path='/user' component={User} />
                        <Route render={() => (<h1>404</h1>)}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)