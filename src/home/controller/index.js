'use strict';

import Base from './base.js';

export default class extends Base {
  init(http){
    super.init(http);
    this.db = this.model('movie');

    this.tags = ['王宝强','安吉丽娜·朱莉','布拉德·皮特','战狼','我不是潘金莲','中国式关系']
  }

  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    this.action_name = 'index';
    this.meta_title = 'bt大爷为bt爱好者提供优质,最新720P,1080P高清,电影BT种子迅雷下载';
    this.keywords = 'bt的天堂，bt种子,bt电影下载,最新电影,1080p高清电影下载,720p高清电影下载,迅雷下载,BT的天堂,bt大爷,BT大爷';
    this.description = 'bt大爷为bt爱好者提供2016最新:1080p高清电影BT种子下载,720p高清电影BT种子下载,迅雷电影下载！';

    let pn = this.get('page') || 1;
    let list_new = await this.db.queryAll('new', pn);
    let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
    let pages = new Pages(); //实例化 Adapter
    let page = pages.pages(list_new);

    this.assign('pagerData', page);
    this.assign('list_new', list_new.data);

    //auto render template file index_index.html
    return this.display();
  }

  async detailAction(){
    let cat = this.http.get('cat');
    let id = this.http.get('id');
    let rs = await this.db.queryDetai(id);

    this.action_name = 'detail';
    this.meta_title = rs['title'];
    this.keywords = rs['title']+',BT的天堂,bt大爷,BT大爷';
    this.description = 'bt大爷为bt爱好者,网友及电影迷提供《'+ rs['title'] +'》！';

    this.assign('data', rs);
    return this.display();
  }

  async categoryAction(){
    let category = this.get('cat');
    let pn = this.get('page') || 1;
    let cat = this.setup.CATEGORIES[category] || '电影';

    this.action_name = 'category';
    this.meta_title = '最新$CAT$bt种子,迅雷下载'.replace('$CAT$', cat);
    this.keywords = '最新$CAT$下载,老$CAT$下载,$CAT$迅雷下载,高清$CAT$迅雷下载,BT的天堂,bt大爷,BT大爷'.replace(/\$CAT\$/g,cat);
    this.description = 'bt大爷为bt爱好者网友提供'+ this.meta_title +'！';


    let list_new = await this.db.where({category : category}).page(pn, 20).countSelect();

    let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
    let pages = new Pages(); //实例化 Adapter
    let page = pages.pages(list_new);

    this.assign('pagerData', page);
    this.assign('list_new', list_new.data);
    return this.display('index.html');
  }

  async searchAction(){
    let pn = this.get('page') || 1;
    let keyword = this.get('kw') || '';
    let list_new = await this.db.where({"title|actor": ["like", "%"+ keyword +"%"]}).page(pn, 10).countSelect();

    let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
    let pages = new Pages(); //实例化 Adapter
    let page = pages.pages(list_new);

    this.action_name = 'search';
    this.meta_title = '最新$KW$电影,$KW$电视剧'.replace(/\$KW\$/g, keyword)+',迅雷下载BT资源搜索';
    this.keywords = '最新$KW$电影下载,老$KW$电视剧下载,$KW$电影迅雷下载,高清$KW$电影迅雷下载,BT的天堂,bt大爷,BT大爷'.replace(/\$KW\$/g,keyword);
    this.description = 'bt大爷为bt爱好者网友提供'+ this.meta_title +'！';

    this.assign('keywords', keyword);
    this.assign('total', list_new.count);
    this.assign('pagerData', page);
    this.assign('list_new', list_new.data);
    return this.display('index.html');
  }
}