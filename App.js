import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProductList from './src/screens/ProductList';
import AddProduct from './src/screens/AddProduct';
import EditProduct from './src/screens/EditProduct';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen name="ProductList" component={ProductList} options={{ title: 'Produtos' }} />
        <Stack.Screen name="AddProduct" component={AddProduct} options={{ title: 'Adicionar Produto' }} />
        <Stack.Screen name="EditProduct" component={EditProduct} options={{ title: 'Editar Produto' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
