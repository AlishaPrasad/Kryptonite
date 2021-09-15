import React, { useState, useLayoutEffect, useEffect, useCallback } from 'react'
import { View, TouchableOpacity  } from 'react-native'
import { Avatar } from 'react-native-elements';
import { AntDesign } from 'react-native-vector-icons'
import { GiftedChat } from 'react-native-gifted-chat';
import { db, auth } from '../firebase'

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

    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      const {
          _id,
          createdAt,
          text,
          user,
      } = messages[0]
      db.collection('chats').add({
        _id,
        createdAt,
        text,
        user
      })
    }, [])
    
      
    useLayoutEffect(() => {
      const unsubscribe = db.collection('chats')
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => setMessages(
          snapshot.docs.map(doc => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        ));
        return unsubscribe;
     }, [])

      return (
        <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={true}
          onSend={messages => onSend(messages)}
          user={{
            _id: auth?.currentUser?.email,
            name: auth?.currentUser?.displayName,
            avatar: auth?.currentUser?.photoURL
          }}
        />
      )
}
export default ChatScreen