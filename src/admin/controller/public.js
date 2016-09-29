'use strict';

import Base from './base.js';

export default class extends Base {
  async  __before(){

    // this.setup = await this.model("setup").getset();
  }
  /**
   * public action
   * @return {Promise} []
   */
  async signinAction(){

    //用户登录
    let is_login = await this.islogin();
    if(this.isPost()){

      let username = this.post('username');
      let password = this.post('password');

      if(username == 'xinz' && password == 'xinz1234' ){
        await this.session('userInfo', {name : 'xinz', uid : 1});
        //TODO 用户密钥
        this.redirect('/admin/index');
      }else { //登录失败
        let fail = '用户不存在或被禁用';
        this.http.error = new Error(fail);
        return think.statusAction(702, this.http);
      }

    }else{
      if(is_login){
        this.redirect('/admin/index');
      }else{
        return this.display();
      }
    }
  }

  async islogin(){
    let user = await this.session('userInfo');
    let res = think.isEmpty(user) ? false : true;
    return res;
  }
}