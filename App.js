import React from 'react';
import HomePage from './HomePage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './LoginPage';


const Stack = createStackNavigator();
//uuidv4 random keys
const App = () =>  {
  return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName = "Login">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Login" component={LoginPage} options={{
          title:'Sign in or Sign up'
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

export default App;
