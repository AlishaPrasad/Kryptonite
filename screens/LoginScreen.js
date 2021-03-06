    
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { auth } from '../firebase'
import styles from './styles'

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
            <Text style={styles.error}>{errorMessage}</Text>
        </View>
    )
}

export default LoginScreen
