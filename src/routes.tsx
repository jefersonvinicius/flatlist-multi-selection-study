import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './pages/Main';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: '#212121'},
          headerTintColor: '#fff',
          cardStyle: {
            backgroundColor: '#424242',
          },
        }}>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: 'Fotos',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
