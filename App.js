import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ChatScreen from './screens/ChatScreen';
import HomeScreen from './screens/HomeScreen';
import AddRoomScreen from './screens/AddRoomScreen';

const Stack = createStackNavigator();
const ModalStack = createStackNavigator();

function ChatApp() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <ModalStack.Navigator mode='modal' headerMode='none'>
        <ModalStack.Screen name='ChatApp' component={ChatApp} />
        <ModalStack.Screen name='AddRoom' component={AddRoomScreen} />
      </ModalStack.Navigator>
    </NavigationContainer>
  );
}