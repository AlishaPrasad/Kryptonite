    
import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { auth } from '../firebase'

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password).then(() => 
            navigation.replace('Chat')
        ).catch((error) => {
            setErrorMessage(error.message)
        });
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder='Enter your email'
                label='Email'
                leftIcon={{ type: 'material', name: 'email' }}
                value={email}
                onChangeText={text => setEmail(text)}
                />
            <Input
                placeholder='Enter your password'
                label='Password'
                leftIcon={{ type: 'material', name: 'lock' }}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
                />
            <Button title="login" style={styles.button} onPress={signIn} />
            <Button title="register" style={styles.button} onPress={() => navigation.navigate('Register')} />
            <Text>{errorMessage}</Text>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },
    button: {
        width: 200,
        marginTop: 10
    }
})