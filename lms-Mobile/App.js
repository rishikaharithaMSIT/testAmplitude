import React, {Component} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import AppNavigator from './myNavigator.js';
import * as Amplitude from 'expo-analytics-amplitude';

class App extends Component {
  constructor() {
    super();
    Amplitude.initialize("3a763d86a0c6cd3bb795fd775d24d990");
    Amplitude.logEvent("app launced")
  }
  render() {
    return (
      <AppNavigator />
  );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;