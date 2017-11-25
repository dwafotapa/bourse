import { schema } from 'normalizr';

export const stock = new schema.Entity('stocks', { stocks: {} }, { idAttribute: 'index' });
export const stocks = [ stock ];