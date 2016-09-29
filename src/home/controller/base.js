'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */
  init(http) {
    super.init(http);
    // http.action = http.method.toLowerCase();
    //console.log(http.method.toLowerCase())
    this.setup = {
      WEB_SITE_TITLE : 'bt就找bt大爷 - btdaye.com',
      WEB_SITE_NAME : 'www.btdaye.com',
      CATEGORIES : {
        dianying : '电影',
        dianshiju : '电视剧',
        dongman : '动漫',
        zongyi : '综艺'
      },
      WEB_SITE_DOMAIN : 'btdaye.com'
    };
  }
}