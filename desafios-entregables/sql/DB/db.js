import config from './config.js';
import _knex from 'knex';

const knex = _knex(config);

export default knex;
