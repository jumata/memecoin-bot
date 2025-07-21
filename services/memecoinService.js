const axios = require('axios');  // Cambiar import a require
require('dotenv').config(); // Asegurarnos de que dotenv cargue las variables de entorno
const db = require('../config/db'); // Conexión a la base de datos



// Función de retraso
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

// Crear una instancia de Axios con los headers necesarios
const api = axios.create({
  baseURL: 'https://public-api.birdeye.so/defi',
  params: {
    sort_by: 'v24hUSD',
    sort_type: 'desc',
    offset: '0',  // Empezamos desde el inicio
    limit: '50',  // Maximo 50 por consulta
    min_liquidity: '100000', // Otros filtros si es necesario
    meme_platform_enabled: 'true'//
  },
  headers: {
    'accept': 'application/json',
    'x-chain': 'solana',
    'X-API-KEY': process.env.BIRDEYE_API_KEY
  }
});

class MemecoinService {
  // Función para obtener todos los tokens de Solana con paginación
  async fetchSolanaTokens(offset = 0) {
    try {
      const { data } = await api.get('/tokenlist', {
        params: {
          offset: offset,  // Pasamos el offset actual
          limit: 50        // Limite de 50 por consulta
        }
      });

      console.log(`Tokens obtenidos desde offset ${offset}:`, data.data.tokens.length);

      const tokens = data.data.tokens;
      const totalTokens = data.data.total;

      console.log(`TOTAL DE TOKENS`, totalTokens);


      // Procesamos los tokens obtenidos
      for (let token of tokens) {
        const { address, name, symbol, price, liquidity, mc, logoURI, lastTradeUnixTime, v24hChangePercent, v24hUSD } = token;

        let tokenId;

        // 1. Insertar o actualizar el token en la base de datos
        const checkQuery = 'SELECT * FROM solana_tokens WHERE address = $1';
        const checkResult = await db.query(checkQuery, [address]);

        if (checkResult.rows.length === 0) {
          // Insertamos el nuevo token
          console.log(`Insertando nuevo token: ${symbol}`);
          const insertQuery = `
            INSERT INTO solana_tokens (address, name, symbol, price, liquidity, market_cap, logo, last_trade_unix_time, v24h_change_percent, v24h_usd)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id
          `;
          const values = [address, name, symbol, price, liquidity, mc, logoURI, lastTradeUnixTime, v24hChangePercent, v24hUSD];
          const result = await db.query(insertQuery, values);
          tokenId = result.rows[0].id;
          console.log(`Token ${symbol} insertado correctamente`);
        } else {
          tokenId = checkResult.rows[0].id;
          const updateQuery = `
            UPDATE solana_tokens SET
            name = $1,
            symbol = $2,
            price = $3,
            liquidity = $4,
            market_cap = $5,
            logo = $6,
            last_trade_unix_time = $7,
            v24h_change_percent = $8,
            v24h_usd = $9
            WHERE address = $10
          `;
          const updateValues = [name, symbol, price, liquidity, mc, logoURI, lastTradeUnixTime, v24hChangePercent, v24hUSD, address];
          await db.query(updateQuery, updateValues);
          console.log(`Token ${symbol} actualizado correctamente`);
        }

        // 2. Insertar los valores históricos en solana_token_history usando token_id
        const historyQuery = `
          INSERT INTO solana_token_history (token_id, price, last_trade_unix_time, liquidity, market_cap, v24h_change_percent, v24h_usd)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        const historyValues = [tokenId, price, lastTradeUnixTime, liquidity, mc, v24hChangePercent, v24hUSD];
        await db.query(historyQuery, historyValues);
        console.log(`Historial de token ${symbol} registrado correctamente`);

        console.log(`===================================================================================================================`);
      }

      // Verificamos si hemos recuperado todos los tokens
      if (offset + 50 < totalTokens) {
        // Si no hemos alcanzado el total de tokens, llamamos recursivamente con el siguiente offset
        console.log('Recuperando siguiente página de tokens...');
        
        // Aquí agregamos una pausa de 2 segundos entre consultas para no saturar el servicio
        await sleep(2000);  // Esperar 2 segundos

        await this.fetchSolanaTokens(offset + 50);
      } else {
        console.log('Todos los tokens han sido procesados.');
      }

    } catch (error) {
      console.error('Error al obtener o guardar tokens Solana:', error.message);
    }
  }
  async fetchNewMemes(){
    console.log('Obteniendo nuevos memecoins...');
    try {
      const {  data } = await api.get('/v2/tokens/new_listing', {
        //params: { meme_platform_enabled: 'true' }
        params: {
          sort_by: 'v24hUSD',
          sort_type: 'desc',
          offset: '0',  // Empezamos desde el inicio
          limit: '10',  // Maximo 50 por consulta
          min_liquidity: '100000', // Otros filtros si es necesario
          meme_platform_enabled: 'true'
        }
      });

      const tokens = data.data.items;

      console.log('Nuevos memecoins:', tokens);
      return tokens;
    } catch (error) {
      console.error('Error al obtener nuevos memecoins:', error.message);
      throw error;
    }
  }
}

module.exports = new MemecoinService();  // Cambiar export default a module.exports