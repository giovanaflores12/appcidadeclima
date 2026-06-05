import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export default function HistoricoItem({ item, onPressItem }) {
  return (
    <TouchableOpacity style={styles.item} onPress={() => onPressItem(item)}>
      <View>
        <Text style={styles.cep}>{item.cep}</Text>
        <Text style={styles.sub}>{item.logradouro} - {item.localidade}/{item.uf}</Text>
      </View>
      <Text style={styles.icone}>↺</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee', marginBottom: 5, borderRadius: 6 },
  cep: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  sub: { fontSize: 13, color: '#666' },
  icone: { fontSize: 18, color: '#007bff' }
});