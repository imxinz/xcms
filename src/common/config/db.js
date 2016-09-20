'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  adapter: {
    mysql: {
      host: '127.0.0.1',
      port: '3306',
      database: 'xcms',
      user: 'root',
      password: 'xinz1234',
      prefix: 'sg_',
      encoding: 'utf8'
    },
    mongo: {

    }
  }
};