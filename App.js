import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import {Header, Button, Spinner} from './src/components/common';
import LoginForm from './src/components/LoginForm';


class App extends Component {
  state = { loggedIn: null};

  componentWillMount () {
    firebase.initializeApp({
      apiKey: "AIzaSyBqYbh3kS8CZY2ou_afDFlsj7QDTyiEO58",
      authDomain: "authentication-a2562.firebaseapp.com",
      databaseURL: "https://authentication-a2562.firebaseio.com",
      projectId: "authentication-a2562",
      storageBucket: "authentication-a2562.appspot.com",
      messagingSenderId: "850865285539"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState ({ loggedIn: true});
      } else {
        this.setState ({ loggedIn: false});
      }
    });
  }

  renderContent () {
    switch (this.state.loggedIn) {
      case true:
        return (
        <Button onPress={() => firebase.auth().signOut()}> Log Out</Button> 
      );
      case false: 
        return <LoginForm />;
      default: 
      return <Spinner size='large' />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText='Auth' />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
