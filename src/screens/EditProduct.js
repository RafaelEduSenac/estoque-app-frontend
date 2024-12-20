import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import api from '../services/api';

export default function EditProduct({ route, navigation }) {
  const { product } = route.params;

  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [quantity, setQuantity] = useState(product.quantity.toString());
  const [photo, setPhoto] = useState(product.photo);

  const handleSubmit = async () => {
    await api.put(`/products/${product.id}`, {
      name,
      description,
      quantity: parseInt(quantity),
      photo,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Produto</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />
      <TextInput
        style={styles.input}
        placeholder="Foto (URL)"
        value={photo}
        onChangeText={setPhoto}
      />
      <Button title="Salvar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
});
