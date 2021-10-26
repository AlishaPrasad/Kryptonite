import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './styles'

export default function AddRoomScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Create a new chat room</Text>
      <Button title="Close Modal" style={styles.button} onPress={() => navigation.goBack()} />
    </View>
  );
}