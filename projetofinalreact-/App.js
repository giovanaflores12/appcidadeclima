import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import HomeScreen from './ProjetoReact/screens/HomeScreen';

export default function App() {
  // Estado que controla qual funcionalidade está ativa
  const [telaAtiva, setTelaAtiva] = useState('cep');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#007bff" />
      
      <View style={styles.header}>
        <Text style={styles.appTitle}>📍 Cidade & Clima</Text>
        
        <View style={styles.containerBotoes}>
          <TouchableOpacity 
            style={[styles.botao, telaAtiva === 'cep' && styles.botaoAtivo]} 
            onPress={() => setTelaAtiva('cep')}
          >
            <Text style={[styles.textoBotao, telaAtiva === 'cep' && styles.textoBotaoAtivo]}>
              Ver por CEP
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.botao, telaAtiva === 'clima_atual' && styles.botaoAtivo]} 
            onPress={() => setTelaAtiva('clima_atual')}
          >
            <Text style={[styles.textoBotao, telaAtiva === 'clima_atual' && styles.textoBotaoAtivo]}>
              Meu Clima
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <HomeScreen telaAtiva={telaAtiva} />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#007bff', padding: 20, paddingTop: 40, borderBottomLeftRadius: 15, borderBottomRightRadius: 15 },
  appTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 15 },
  containerBotoes: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 8, padding: 4 },
  botao: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 6 },
  botaoAtivo: { backgroundColor: '#fff', elevation: 2 },
  textoBotao: { fontSize: 15, fontWeight: 'bold', color: '#fff' },
  textoBotaoAtivo: { color: '#007bff' }
});