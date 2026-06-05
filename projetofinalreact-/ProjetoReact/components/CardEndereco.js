import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CardEndereco({ dados }) {
  if (!dados) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>📍 Endereço Encontrado</Text>
      <Text style={styles.texto}><Text style={styles.bold}>Logradouro:</Text> {dados.logradouro}</Text>
      <Text style={styles.texto}><Text style={styles.bold}>Bairro:</Text> {dados.bairro}</Text>
      <Text style={styles.texto}><Text style={styles.bold}>Cidade:</Text> {dados.localidade}</Text>
      <Text style={styles.texto}><Text style={styles.bold}>Estado:</Text> {dados.uf}</Text>
      <Text style={styles.texto}><Text style={styles.bold}>CEP:</Text> {dados.cep}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginTop: 15, borderWidth: 1, borderColor: '#ddd' },
  titulo: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  texto: { fontSize: 15, marginBottom: 4 },
  bold: { fontWeight: 'bold' }
});