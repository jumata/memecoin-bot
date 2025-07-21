const botController = require('./controllers/botController');

// Inicia el bot manualmente (puedes eliminar esto si solo deseas usar el cron)
botController.runBot();

console.log('Bot iniciado');