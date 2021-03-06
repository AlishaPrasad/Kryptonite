    
import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { auth } from '../firebase'
import styles from './styles'

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(function (user) {
            if (user) {
                navigation.replace('Chat');
            } else {
                // No user is signed in.
            }
        });
        return unsubscribe;
    }, [])

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("signed in")
            user.updateProfile({
                displayName: name,
                photoURL: imageUrl ? imageUrl : "https://www.trackergps.com/canvas/images/icons/avatar.jpg"
            }).catch(function (error) {
                setErrorMessage(error.message)
            });
            navigation.replace('Chat')
        })
        .catch((error) => {
            setErrorMessage(error.message)
        });   
    }
    return (
        <View style={styles.container}>
            <Input
                placeholder='Enter your name'
                label='Name'
                leftIcon={{ type: 'material', name: 'badge' }}
                value={name}
                onChangeText={text => setName(text)}
                />
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
            <Input
                placeholder='Enter your image url'
                label='Profile Picture'
                leftIcon={{ type: 'material', name: 'face' }}
                onChangeText={text => setImageUrl(text)}
                />
            <Button title="register" style={styles.button} onPress={register} />
            <Text style={styles.error}>{errorMessage}</Text>
        </View>
    )
}

export default RegisterScreen