export enum AggregateValue {
  first= 'first',
  last= 'last',
  min= 'min',
  max= 'max',
  count= 'count',
  sum= 'sum',
  avg= 'avg',
}

export enum HistoricalValue {
  first= 'first',
  last= 'last',
  min= 'min',
  max= 'max',
  count= 'count',
  sum= 'sum',
  avg= 'avg',
  time = 'time'
}

export enum LatestQuoteValue {
  price= 'price',
  change24h= 'change_24h',
  circulatingSupply= 'circulating_supply',
  marketCap= 'market_cap',
  volume24h= 'volume_24h',
  time = 'timestamp'
}

export enum MostUsedValue {
  rank = 'rank',
  key = 'key',
  value = 'value',
}

export enum TradingPairsValue {
  address = 'address',
  state = 'state',
  firstToken = 'first_token { identifier, name, decimals }',
  secondToken = 'second_token { identifier, name, decimals }',
}
