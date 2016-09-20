'use strict';

import Base from './base.js';

export default class extends Base {
  init(http){
    super.init(http);
    this.db = this.model('movie');
  }

  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){

    this.keywords = 'keyword';
    this.description = 'description';
    this.sitename = 'btdaye.com';

    let list_new = await this.db.queryAll('new');

    this.assign('list_new', list_new);

    //auto render template file index_index.html
    return this.display();
  }
}