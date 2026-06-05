export function interpretarCodigoClima(code) {
  const codigos = {
    0: 'Céu Limpo',
    1: 'Principalmente Limpo',
    2: 'Parcialmente Nublado',
    3: 'Encoberto',
    45: 'Nevoeiro',
    51: 'Chuva Leve',
    61: 'Chuva Moderada',
    80: 'Pancadas de Chuva',
  };
  return codigos[code] || 'Instável';
}

export async function buscarClimaPorCidade(cidade) {
  try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt`;
    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error('Cidade não localizada para previsão climática.');
    }

    const { latitude, longitude } = geoData.results[0];

    const climaUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
    const climaResponse = await fetch(climaUrl);
    const climaData = await climaResponse.json();

    return climaData;
  } catch (error) {
    throw new Error('Não foi possível obter a previsão do tempo.');
  }
}