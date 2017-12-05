import { schema } from 'normalizr';

export const stockEntity = new schema.Entity(
  'stocks',
  { stocks: {} },
  {
    idAttribute: 'index',
    processStrategy: (entity) => ({
      id: entity.index,
      NASDAQ: entity.stocks.NASDAQ.toFixed(2),
      CAC40: entity.stocks.CAC40.toFixed(2),
      timestamp: entity.timestamp
    })
  }
);
export const arrayOfStocks = [ stockEntity ];