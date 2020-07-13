import React, {PureComponent} from 'react';

import Person from './Person/Person';
// import AuthContext from '../../context/auth-context';

class Persons extends PureComponent {
    // static getDerivedStateFromState(props, state){
    //     console.log('[Person.js] getDerivedStateFromState');
    //     return state;
    // }

    // shouldComponentUpdate(nextProps, nextState){
    //     console.log('[Persons.js] shouldComponentUpdate');
    //     if(nextProps.persons !== this.props.person || nextProps.changed !== this.props.changed || nextProps.clicked !== this.props.clicked){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }

    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log('[Persons.js] getSnapshotBeforeUpdate');
        return { message: 'Shanshot!' }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        console.log('[Persons.js] componentDidUpdate');
        console.log(snapshot);
    }

    componentWillUnmount(){
        console.log('[Persons.js] componentWillUnmount');
    }

    render(){
        console.log('[Persons.js] rendering...');
        return this.props.persons.map((person, index) => {
            return <Person
                click = {() => this.props.clicked(index)}
                name = {person.name} 
                age = {person.age}
                key = {person.id}
                changed = {(event) => this.props.changed(event, person.id)}
                isAuth={this.props.isAuthenticated}
                />
        })
        
    }
    
}

export default Persons;