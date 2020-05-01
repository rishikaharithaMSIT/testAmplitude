import React, {Component} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { AsyncStorage } from 'react-native';
import * as Amplitude from 'expo-analytics-amplitude';

class HomeScreen extends Component{
    state = {
    }

    componentDidMount(){
        AsyncStorage.getItem('userDetails').then((details) => {
            var obj = JSON.parse(details);
            this.setState({email: obj.email, token: obj.token});
        });
        Amplitude.logEvent("Entered Home Screen")
        Amplitude.setUserProperties("entered Home screen prop");
    }
    componentWillUnmount(){
        Amplitude.logEvent("Exited Home Screen")
        Amplitude.setUserProperties("exited Home screen prop");
    }
    deleteToken = () =>{
        AsyncStorage.clear()
        this.props.navigation.navigate('signIn');
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>
                    Welcome to Home page
                    {'\n'}
                </Text>
        
        <Text style = {{fontWeight:"bold"}}>{this.state.email}</Text>
        <Text>{'\n'}</Text>
                <Button title="log out" onPress={() => this.deleteToken()} />
            </View>
        )
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



export default HomeScreen;