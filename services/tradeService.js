class TradeService {
  constructor(tokenService, transactionService) {
    this.tokenService = tokenService;
    this.transactionService = transactionService;
  }

  async decideTrade(tokenSymbol) {
    const tokenData = await this.tokenService.getTokenData(tokenSymbol);
    if (this.shouldBuy(tokenData)) {
      this.transactionService.buy(tokenSymbol);
    } else if (this.shouldSell(tokenData)) {
      this.transactionService.sell(tokenSymbol);
    }
  }

  shouldBuy(tokenData) {
    // Definir tu lógica de compra aquí
    return tokenData.price < 0.1;  // Ejemplo: comprar si el precio es bajo
  }

  shouldSell(tokenData) {
    // Definir tu lógica de venta aquí
    return tokenData.price > 1;  // Ejemplo: vender si el precio es alto
  }
}

module.exports = TradeService;