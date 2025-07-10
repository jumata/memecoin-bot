const axios = require('axios');
const config = require('../config');

class ApiClient {
  async get(url, params) {
    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${config.BIRDEYE_API_KEY}`,
        },
        params,
      });
      return response.data;
    } catch (error) {
      console.error('Error en la solicitud API:', error.message);
      throw error;
    }
  }
}

module.exports = new ApiClient();