const cron = require('node-cron');
const botController = require('../controllers/botController');  // Cambiar import a require

// Ejecutar el bot cada 5 minutos
cron.schedule('*/5 * * * *', async () => {
  console.log('Ejecutando el bot cada 5 minutos...');
  
  try {
    await botController.runBot();  // Ejecuta la lógica para obtener y mostrar los memecoins
  } catch (error) {
    console.error('Error al ejecutar el cron del bot:', error.message);
  }
});