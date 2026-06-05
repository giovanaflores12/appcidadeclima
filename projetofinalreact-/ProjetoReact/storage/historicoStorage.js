import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_STORAGE = '@historico_cep_app';

export async function obterHistorico() {
  try {
    const dados = await AsyncStorage.getItem(CHAVE_STORAGE);
    return dados ? JSON.parse(dados) : [];
  } catch (error) {
    console.error('Erro ao ler o histórico:', error);
    return [];
  }
}

export async function salvarNoHistorico(novoItem) {
  try {
    const historicoAtual = await obterHistorico();
    
    // Filtra para não salvar itens repetidos com o mesmo CEP
    const historicoFiltrado = historicoAtual.filter(item => item.cep !== novoItem.cep);
    
    const novoHistorico = [novoItem, ...historicoFiltrado];
    await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(novoHistorico));
  } catch (error) {
    console.error('Erro ao salvar no histórico:', error);
  }
}

export async function deletarHistorico() {
  try {
    await AsyncStorage.removeItem(CHAVE_STORAGE);
  } catch (error) {
    console.error('Erro ao limpar histórico:', error);
  }
}
