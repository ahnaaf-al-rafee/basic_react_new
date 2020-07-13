import React, { Component } from 'react';

import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit'
import withClass from '../hoc/withClass';
import Aux from '../hoc/Auxilary';
import AuthContext from '../context/auth-context';  


class App extends Component {
  constructor(props){
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      {id: 'asdf1', name: 'Max', age: 28},
      {id: 'asdf2', name: 'Manu', age: 29},
      {id: 'asdf3', name: 'Stephanie', age: 26}
    ],
    otherState: 'some other value!',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  };

  static getDerivedStateFromProps(props, state){
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  // componentWillMount(){
  //   console.log('[App.js] componentWillMount');
  // }

  shouldComponentUpdate(nextProps, nextState){
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate(){
    console.log('[App.js] componentDidUpdate');
  }

  componentDidMount(){
    console.log('[App.js] componentDidMount');
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      };
    });
  };

  deletePersonsHandler = (personIndex) => {
    const persons = this.state.persons.slice(); //Remember slice() whitout an argument copies the full array!!!
    // const persons = [...this.state.persons] //same as above
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons : !doesShow});
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  };

  render() {
    console.log('[App.js] render');

    // const style = {
    //   backgroundColor: 'green',
    //   color: 'white',
    //   font: 'inherit',
    //   border: '1px solid blue',
    //   padding: '8px',
    //   cursor: 'pointer',
    //   ':hover': {
    //     backgroundColor: 'grey',
    //     color: 'black'
    //   }
    // }

    let persons = null;

    if (this.state.showPersons){
      persons = 
        <Persons 
        persons={this.state.persons}
        clicked={this.deletePersonsHandler}
        changed = {this.nameChangeHandler}
        isAuthenticated = {this.state.authenticated}
        />

      // style.backgroundColor = 'red';
      // style[':hover'] = {
      //   backgroundColor: 'salmon',
      //   color: 'white'
      // }
    }

    return (
      <Aux classes={classes.App}>
        <button onClick={() => {
          this.setState({showCockpit: false});
        }}>Remove Cockpit</button>
        <AuthContext.Provider value={{authenticated: this.state.authenticated, login: this.loginHandler}}>
        {this.state.showCockpit ? (
          <Cockpit
            title = {this.props.appTitle}
            showPersons = {this.state.showPersons}
            personsLength = {this.state.persons.length}
            clicked = {this.togglePersonsHandler} 
          /> 
        ) : null }
        {persons}
        </AuthContext.Provider>        
      </Aux>
    );
  } 
}

export default withClass(App, classes.App);
