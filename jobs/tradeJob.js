const cron = require('node-cron');
const botController = require('../controllers/botController');

cron.schedule('*/5 * * * *', () => {
  console.log('Ejecutando el bot cada 5 minutos...');
  botController.runBot();  // Ejecuta el bot cada 5 minutos
});