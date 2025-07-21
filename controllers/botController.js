const MemecoinService = require('../services/memecoinService');  // Cambiar import a require

class BotController {
  constructor() {
    this.memecoinService = MemecoinService;
  }

  // Ejecuta el bot para obtener y mostrar los memecoins
  async runBot() {
    try {
      console.log('Iniciando el bot...'); 
      const [allTokens,newMemes, trending] = await Promise.all([
        this.memecoinService.fetchSolanaTokens() // ok  
        //this.memecoinService.fetchNewMemes()// ok 
        // this.memecoinService.fetchTrending(),// opcion de paga
      ]); 

    } catch (error) {
      console.error('Error al ejecutar el bot:', error.message);
    }
  }
}

module.exports = new BotController();  // Cambiar export default a module.exports