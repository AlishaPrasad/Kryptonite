import React from 'react';
import { View, Text } from 'react-native';
//import { Title } from 'react-native-paper';
import styles from './styles';
import { Button } from 'react-native-elements';
import { auth } from '../firebase'

export default function HomeScreen({ navigation }) {
    const signOut = () => {
        auth.signOut().then(() => {
          // Sign-out successful.
          navigation.replace("Login");
        }).catch((error) => {
          // An error happened.
        });
    } 

    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Text>All chat rooms will be listed here</Text>
            <Text>{auth?.currentUser?.displayName}</Text>
            <Button title='Logout' style={styles.button} onPress={signOut} />
            <Button title='Add Room' style={styles.button} onPress={() => navigation.navigate('AddRoom')} />
        </View>
    );
}
