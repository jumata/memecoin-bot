const axios = require('axios');
require('dotenv').config(); // Asegurarnos de que dotenv cargue las variables de entorno

// Crear instancia de axios para interactuar con la API de Birdeye
const api = axios.create({
  baseURL: 'https://public-api.birdeye.so/defi',
  headers: {
    accept: 'application/json',
    'x-chain': 'solana',
    'X-API-KEY': process.env.BIRDEYE_API_KEY, // Usamos la clave API desde el archivo .env
    //'Authorization': `Bearer ${process.env.BIRDEYE_API_KEY}`  // Usamos la clave API desde el archivo .env
  }
});

class MemecoinService {
  // Obtiene todos los tokens de Solana
  async fetchSolanaTokens() {
    try {
      const { data: all } = await api.get('/tokenlist');
      console.log('Total tokens DeFi:', all.length);
      return all;
    } catch (error) {
      console.error('Error al obtener tokens Solana2:', error.message);
      throw error;
    }
  }

  // Obtiene los tokens populares (trending)
  async fetchTrending() {
    try {
      const { data: trending } = await api.get('/token_trending');
      console.log('Trending tokens:', trending.length);
      return trending;
    } catch (error) {
      console.error('Error al obtener tokens trending:', error.message);
      throw error;
    }
  }

  // Obtiene los nuevos memecoins
  async fetchNewMemes() {
    try {
      const { data: newMemes } = await api.get('/v2/tokens/new_listing', {
        params: { meme_platform_enabled: 'true' }
      });
      console.log('Nuevos memecoins:', newMemes.length);
      return newMemes;
    } catch (error) {
      console.error('Error al obtener nuevos memecoins:', error.message);
      throw error;
    }
  }
}

module.exports = new MemecoinService();  // Exportamos el servicio para que pueda ser utilizado en otros archivos