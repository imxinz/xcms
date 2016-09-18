'use strict';

import Base from './base.js';
import fs from 'fs';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }

  /**
   * 获取用户头像
   */
  async avatarAction() {
    var uploadPath = think.RESOURCE_PATH + '/upload/avatar/'+2;// this.user.uid;
    let path = think.isFile(uploadPath + "/" + "/avatar.png");
    this.type("image/png");
    let pic;
    if (path) {
      // this.download(uploadPath + "/" + "/avatar.png");
      pic = fs.readFileSync(uploadPath + "/" + "/avatar.png")
    } else {
      //this.download(think.RESOURCE_PATH + '/upload/avatar/avatar.jpg')
      pic = fs.readFileSync(think.RESOURCE_PATH + '/upload/avatar/avatar.jpg')
    }
    this.end(pic)
  }
}