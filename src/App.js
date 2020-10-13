import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'react-bootstrap'
import Header from './component/Header'
import Login from './component/Login'
import SignUp from './component/SignUp'
import HomePage from './component/HomePage'
import Axios from 'axios';
import AddArticle from './component/AddArticle';
import Notification from './component/Notification';
import SingleArticle from './component/SingleArticle';


function App() {

  let [isLoggedIn, setIsLoggedIn] = useState(false)
  let [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    if (localStorage.token) {
      const url = 'https://mighty-oasis-08080.herokuapp.com/api/user'
      Axios.get(url, { headers: { "authorization": `Token ${localStorage.token}` } })
        .then(res => {
          const user = res.data
          setUserInfo(user)
          setIsLoggedIn(true)
        })
        .catch(err => isLoggedIn(false))
    } else {
      setIsLoggedIn(false)
    }
  }, [])


  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} />
      <Switch>
        <Route exact path='/' render={() => <HomePage isLoggedIn={isLoggedIn} />} />
        <Route path='/login' render={() => <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/register' component={SignUp} />
        <Route path='/addartilce' component={AddArticle} />
        <Route path='/article/:slug' component={SingleArticle} />
        <Route path='/notification' component={Notification} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
