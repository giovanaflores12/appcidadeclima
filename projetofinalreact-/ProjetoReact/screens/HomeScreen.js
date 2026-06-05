import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert, ScrollView, ActivityIndicator } from 'react-native';

import CardEndereco from '../components/CardEndereco';
import CardClima from '../components/CardClima';
import HistoricoItem from '../components/HistoricoItem';

import { buscarCep } from '../services/viaCepService';
import { buscarClimaPorCidade, buscarClimaPorCoordenadas, obterLocalizacaoAtual } from '../services/climaService';
import { obterHistorico, salvarNoHistorico, deletarHistorico } from '../storage/historicoStorage';

export default function HomeScreen({ telaAtiva }) {
  const [carregando, setCarregando] = useState(false);

  const [inputCep, setInputCep] = useState('');
  const [enderecoResultado, setEnderecoResultado] = useState(null);
  const [climaCepResultado, setClimaCepResultado] = useState(null);
  const [historico, setHistorico] = useState([]);

  const [minhaCidade, setMinhaCidade] = useState('');
  const [climaLocalResultado, setClimaLocalResultado] = useState(null);

  useEffect(() => {
    carregarHistoricoLocal();
  }, []);

  useEffect(() => {
    if (telaAtiva === 'clima_atual' && !climaLocalResultado) {
      executarBuscaClimaAtual();
    }
  }, [telaAtiva]);

  const carregarHistoricoLocal = async () => {
    const dados = await obterHistorico();
    setHistorico(dados);
  };

  const executarBuscaPorCep = async (cepAlvo) => {
    const cepLimpo = cepAlvo.replace(/\D/g, '');
    if (cepLimpo.length !== 8) {
      Alert.alert('Dados Inválidos', 'O CEP deve conter exatamente 8 dígitos numéricos.');
      return;
    }

    setCarregando(true);
    try {
      const dadosEndereco = await buscarCep(cepLimpo);
      if (dadosEndereco.erro) {
        Alert.alert('Não Encontrado', 'CEP inexistente.');
        setCarregando(false);
        return;
      }
      setEnderecoResultado(dadosEndereco);
      
      const dadosClima = await buscarClimaPorCidade(dadosEndereco.localidade);
      setClimaCepResultado(dadosClima);

      await salvarNoHistorico(dadosEndereco);
      carregarHistoricoLocal();
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setCarregando(false);
    }
  };

  const executarBuscaClimaAtual = async () => {
    setCarregando(true);
    try {
      const localizacao = await obterLocalizacaoAtual();
      setMinhaCidade(`${localizacao.cidade} - ${localizacao.uf}`);
      const dadosClima = await buscarClimaPorCoordenadas(localizacao.latitude, localizacao.longitude);
      setClimaLocalResultado(dadosClima);
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setCarregando(false);
    }
  };

  const executarLimparHistorico = async () => {
    await deletarHistorico();
    setHistorico([]);
  };

  return (
    <ScrollView style={styles.container}>
      {carregando && <ActivityIndicator size="large" color="#007bff" style={{ marginVertical: 20 }} />}

      {/* RENDERIZA O CONTEÚDO BASEADO NO BOTÃO CLICADO NO APP.JS */}
      {telaAtiva === 'cep' ? (
        <View>
          <View style={styles.secaoBox}>
            <Text style={styles.labelSecao}>Digite o CEP para localizar o endereço:</Text>
            <View style={styles.row}>
              <TextInput
                style={styles.input}
                placeholder="Ex: 01001000"
                keyboardType="numeric"
                maxLength={8}
                value={inputCep}
                onChangeText={setInputCep}
              />
              <TouchableOpacity style={styles.buttonAction} onPress={() => executarBuscaPorCep(inputCep)}>
                <Text style={styles.buttonActionText}>Buscar</Text>
              </TouchableOpacity>
            </View>
          </View>

          <CardEndereco dados={enderecoResultado} />
          <CardClima dadosClima={climaCepResultado} />

          <Text style={styles.tituloHistorico}>Consultas Recentes (CEP)</Text>
          <FlatList
            data={historico}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false} 
            renderItem={({ item }) => (
              <HistoricoItem 
                item={item} 
                onPressItem={(itemClicado) => {
                  setInputCep(itemClicado.cep);
                  executarBuscaPorCep(itemClicado.cep);
                }}
              />
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>Nenhum histórico disponível.</Text>}
          />

          {historico.length > 0 && (
            <TouchableOpacity style={styles.buttonLimpar} onPress={executarLimparHistorico}>
              <Text style={styles.buttonLimparText}>Limpar Histórico</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View>
          <View style={styles.secaoBoxClima}>
            <Text style={styles.labelClimaAtual}>Sua Localização Identificada:</Text>
            <Text style={styles.textoCidadeAtual}>{minhaCidade || "Identificando..."}</Text>
            
            <TouchableOpacity style={styles.buttonRecarregar} onPress={executarBuscaClimaAtual}>
              <Text style={styles.buttonActionText}>Atualizar Clima ↺</Text>
            </TouchableOpacity>
          </View>
          <CardClima dadosClima={climaLocalResultado} />
        </View>
      )}

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  secaoBox: { backgroundColor: '#fff', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#e0e0e0', marginTop: 10 },
  secaoBoxClima: { backgroundColor: '#e3f2fd', padding: 20, borderRadius: 8, borderWidth: 1, borderColor: '#bbdefb', alignItems: 'center', marginTop: 10 },
  labelSecao: { fontSize: 14, fontWeight: 'bold', color: '#555', marginBottom: 10 },
  labelClimaAtual: { fontSize: 14, color: '#1565c0', fontWeight: 'bold' },
  textoCidadeAtual: { fontSize: 20, fontWeight: 'bold', color: '#0d47a1', marginVertical: 8, textAlign: 'center' },
  row: { flexDirection: 'row', gap: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 6, backgroundColor: '#fafafa' },
  buttonAction: { backgroundColor: '#007bff', paddingHorizontal: 20, justifyContent: 'center', borderRadius: 6 },
  buttonRecarregar: { backgroundColor: '#007bff', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 6, marginTop: 5 },
  buttonActionText: { color: '#fff', fontWeight: 'bold' },
  tituloHistorico: { fontSize: 16, fontWeight: 'bold', marginTop: 25, marginBottom: 10, color: '#444' },
  emptyText: { fontStyle: 'italic', color: '#999', textAlign: 'center', marginVertical: 10 },
  buttonLimpar: { backgroundColor: '#dc3545', padding: 12, borderRadius: 6, alignItems: 'center', marginTop: 15 },
  buttonLimparText: { color: '#fff', fontWeight: 'bold' }
});