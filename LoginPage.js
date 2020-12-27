import React, { useState} from 'react'
import { Button, View, Text, StyleSheet,TextInput } from 'react-native'


const styles = StyleSheet.create({
      input: {
        marginTop: 20,
        height: 40,
        borderCorder: 'black',
        borderWidth: 1
    },
});


const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const login = () => {
    if (username === 'Fred' && password === 'admin') {
      navigation.navigate('Home');
    }
  }
  return (
      <View>
          <TextInput
          style={styles.input}
          value={username}
          placeholder="Enter your username"
          onChangeText={text => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            value={password}
            secureTextEntry={true}
            placeholder="Enter your password"
            onChangeText={text => setPassword(text)}
            />
          <Button title="Login" onPress={login} />
        </View>
    )
  }

export default LoginPage
