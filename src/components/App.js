import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'; 
import Footer from "./Footer"
import 'bootstrap/dist/css/bootstrap.min.css';
import UserView from "./UserView"
import "../App.css"
class App extends React.Component
{
  render()
  {
    return(<div style={{backgroundColor:" #f0f2f5"}}><Router><UserView /></Router></div>)
  }
}

export default App;
