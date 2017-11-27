import { schema } from 'normalizr';

export const stockEntity = new schema.Entity(
  'stocks',
  { stocks: {} },
  {
    idAttribute: 'index',
    processStrategy: (entity) => ({
      timestamp: entity.timestamp,
      id: entity.index,
      byMarket: {
        NASDAQ: Number(entity.stocks.NASDAQ.toFixed(2)),
        CAC40: Number(entity.stocks.CAC40.toFixed(2))
      }
    })
  }
);
export const arrayOfStocks = [ stockEntity ];