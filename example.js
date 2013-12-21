var BTCChina = require('./btcchina.js');

var publicBtcchina = new BTCChina();

publicBtcchina.ticker(console.log);
// btcchina.trades(console.log);
// btcchina.historydata(5000, console.log);
// btcchina.orderbook(console.log);

var key = 'your-api-key';
var secret = 'your-api-secret';

var privateBtcchina = new BTCChina(key, secret);

//    commented out for your protection

// privateBtcchina.buyOrder(9000, 1, console.log);
// privateBtcchina.cancelOrder(1, console.log);
// privateBtcchina.getAccountInfo(console.log);
// privateBtcchina.getDeposits('BTC', null, console.log);
// privateBtcchina.getMarketDepth2(null, console.log);
// privateBtcchina.getOrder(1, console.log);
// privateBtcchina.getOrders(true, console.log);
// privateBtcchina.getAccountInfo(true, console.log);
// privateBtcchina.getTransactions('all', 10, console.log);
// privateBtcchina.getWithdrawal(1, console.log);
// privateBtcchina.getWithdrawals('BTC', true, console.log); // `pendingonly` only works at true as of Sun Nov 24 15:56:07 CET 2013.
// privateBtcchina.requestWithdrawal('BTC', 1, console.log);
// privateBtcchina.sellOrder(9000, 1, console.log);
