'use strict';

import Base from './base.js';
import {type} from 'os';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
    let mysqlv = await this.model('mysql').query("select version()");
    let node = process.versions;
    this.meta_title = '首页';

    this.assign({
      'version' : think.CMSWING_VERSION,
      'OS': type(),
      'nodejs_v': node.node,
      'thinkjs': think.version,
      'mysqlv': mysqlv[0]['version()']
    });

    return this.display();
  }
  
  
}