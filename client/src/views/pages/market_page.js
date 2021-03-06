var Stock = require('../../models/stock.js');
var Market = require('../../models/market.js');
var TableView = require('../tables/table_view.js');
var TableRowView = require('../tables/row.js');
var marketTableFields = require('../tables/market_fields.js');
var List = require('list.js');

var renderMarketPage = function(data, refreshCache, router) {
  var theMarket = new Market(data, Stock);
  container.innerHTML = "";

  var marketView = new TableView(theMarket.stocks, TableRowView, 'market-table', marketTableFields, 1);
  var paddingBox = ce('div');
  paddingBox.classList.add('pure-u-1-5');
  container.appendChild(paddingBox);

  var tableBox = ce('div');
  tableBox.classList.add("pure-u-3-5");
  tableBox.appendChild(marketView.render());
  marketView.addRowClick(function (epic) {
    router.loadNewPage("/market/" + epic);
  });
  container.appendChild(tableBox);
  var listOptions = {
    valueNames: [ 'epic', 'name' ]
  };
  var marketList = new List('market-table', listOptions);

  container.appendChild(paddingBox.cloneNode());

};

module.exports = renderMarketPage;