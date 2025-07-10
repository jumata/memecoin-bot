const apiClient = require('../utils/apiClient');

class TokenService {
  async getTokenData(tokenSymbol) {
    try {
      const response = await apiClient.get(`${config.BASE_URL}/tokens/${tokenSymbol}`);
      return response;
    } catch (error) {
      console.error('Error al obtener datos del token:', error.message);
    }
  }

  // Otros métodos relacionados con tokens (ej. obtener precios históricos)
}

module.exports = new TokenService();