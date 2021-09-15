import React, { useState, useLayoutEffect, useEffect, useCallback } from 'react'
import { View, TouchableOpacity  } from 'react-native'
import { Avatar } from 'react-native-elements';
import { AntDesign } from 'react-native-vector-icons'
import { GiftedChat } from 'react-native-gifted-chat';
import { auth } from '../firebase'

const ChatScreen = ({ navigation}) => {
    const [messages, setMessages] = useState([]);

    const signOut = () => {
        auth.signOut().then(() => {
          // Sign-out successful.
          navigation.replace("Login");
        }).catch((error) => {
          // An error happened.
        });
    }
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <Avatar
                        rounded
                        source={{
                            uri: auth?.currentUser?.photoURL,
                        }}
                    />
                </View>
            ),
            headerRight: () => (
            <TouchableOpacity style={{
                marginRight: 10
                }}
                onPress={signOut}
            >
                <AntDesign name="logout" size={24} color="black" />
            </TouchableOpacity>
            )
        })
        console.log(auth?.currentUser);
    }, [navigation])

    useEffect(() => {
        setMessages([
          {
            _id: 1,
            text: `Hello ${auth?.currentUser?.displayName}`,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ])
      }, [])

      const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      }, [])
    
      return (
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      )
}
export default ChatScreen