import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { interpretarCodigoClima } from '../services/climaService';

export default function CardClima({ dadosClima }) {
  if (!dadosClima) return null;

  const atual = dadosClima.current_weather;
  const diario = dadosClima.daily;

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>🌤️ Previsão do Tempo</Text>
      <Text style={styles.temperatura}>{atual.temperature}°C</Text>
      <Text style={styles.texto}><Text style={styles.bold}>Condição:</Text> {interpretarCodigoClima(atual.weathercode)}</Text>
      <Text style={styles.texto}><Text style={styles.bold}>Mínima:</Text> {diario.temperature_2m_min[0]}°C / <Text style={styles.bold}>Máxima:</Text> {diario.temperature_2m_max[0]}°C</Text>

      <Text style={styles.subtitulo}>Próximos Dias:</Text>
      {diario.time.slice(1, 4).map((data, index) => (
        <Text key={data} style={styles.textoDia}>
          📅 {data.split('-').reverse().join('/')}: Min {diario.temperature_2m_min[index + 1]}°C / Max {diario.temperature_2m_max[index + 1]}°C ({interpretarCodigoClima(diario.weathercode[index + 1])})
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#e3f2fd', padding: 15, borderRadius: 8, marginTop: 15, borderWidth: 1, borderColor: '#bbdefb' },
  titulo: { fontSize: 16, fontWeight: 'bold', color: '#0d47a1' },
  temperatura: { fontSize: 32, fontWeight: 'bold', color: '#0d47a1', marginVertical: 5 },
  subtitulo: { fontSize: 14, fontWeight: 'bold', marginTop: 10, color: '#1565c0' },
  texto: { fontSize: 15, marginBottom: 4, color: '#1565c0' },
  textoDia: { fontSize: 13, marginTop: 2, color: '#1e88e5' },
  bold: { fontWeight: 'bold' }
});