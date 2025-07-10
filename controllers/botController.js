const TokenService = require('../services/tokenService');
const TradeService = require('../services/tradeService');
const TransactionService = require('../services/transactionService');

class BotController {
  constructor() {
    this.tradeService = new TradeService(TokenService, TransactionService);
  }

  async runBot() {
    const tokenSymbol = 'dogecoin';
    await this.tradeService.decideTrade(tokenSymbol);
  }
}

module.exports = new BotController();