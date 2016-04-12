require('short-dom')();
var Portfolio = require('../../models/portfolio.js');
var Holding = require('../../models/holding.js');
var PortfolioView = require('../portfolio_view.js');
var HoldingView = require('../holding_view.js');

module.exports = function (data, refreshCache) {
  var userPortfolio = new Portfolio(data, Holding);
  container.innerHTML = "";
  var portfolioView = new PortfolioView(userPortfolio, HoldingView);
  // must be a better way to do this
  var foo = ce('div');
  foo.classList.add('pure-u-1-5');
  container.appendChild(foo);
  var tableBox = ce('div');
  var totalValueText = document.createElement('p');
  totalValueText.innerHTML = 'Total Value: £' + userPortfolio.value().toLocaleString();
  tableBox.classList.add("pure-u-3-5");
  tableBox.appendChild(totalValueText);
  tableBox.appendChild(portfolioView.render());
  container.appendChild(tableBox);
  container.appendChild(foo.cloneNode());
}