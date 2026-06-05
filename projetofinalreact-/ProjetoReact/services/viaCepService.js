export async function buscarCep(cep) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Erro de conexão ao buscar o CEP.');
  }
}

export async function buscarEndereco(uf, cidade, logradouro) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${uf}/${cidade}/${logradouro}/json/`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Erro de conexão ao buscar o endereço.');
  }
}