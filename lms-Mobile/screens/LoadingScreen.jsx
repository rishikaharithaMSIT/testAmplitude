import React, {Component} from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { AsyncStorage } from 'react-native';

class LoadingScreen extends Component {
    state = {
        isLoggedIn: false
    }

    componentDidMount(){
        AsyncStorage.getItem('userDetails')
                  .then((data) => {
                      if(data){
                        this.props.navigation.navigate('Home');
                      }else{
                        this.props.navigation.navigate('signIn');
                      }
        });
    }

    render() { 
        return (<View style={styles.container}>
            <ActivityIndicator size="large"/>
            </View>
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
 
export default LoadingScreen;