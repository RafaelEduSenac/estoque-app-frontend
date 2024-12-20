import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../services/api';

export default function ProductList({ navigation }) {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchProducts();
    }, [])
  );

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            {item.photo ? (
              <Image source={{ uri: item.photo }} style={styles.productImage} />
            ) : (
              <Text>Sem imagem</Text>
            )}
            <Text style={styles.productName}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>Quantidade: {item.quantity}</Text>
            <View style={styles.buttons}>
              <Button
                title="Editar"
                onPress={() => navigation.navigate('EditProduct', { product: item })}
              />
              <Button title="Excluir" color="red" onPress={() => handleDelete(item.id)} />
            </View>
          </View>
        )}
      />
      <Button title="Adicionar Produto" onPress={() => navigation.navigate('AddProduct')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  productItem: { marginBottom: 15, padding: 10, backgroundColor: '#fff', borderRadius: 5 },
  productName: { fontSize: 18, fontWeight: 'bold' },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  productImage: { width: 100, height: 100, resizeMode: 'cover', marginBottom: 10 },
});
