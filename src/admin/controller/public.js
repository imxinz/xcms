'use strict';

import Base from './base.js';

export default class extends Base {
  async  __before(){
    this.setup = await this.model("setup").getset();
  }
  /**
   * public action
   * @return {Promise} []
   */
  async signinAction(){

    //用户登录
    let is_login = await this.islogin();
    if(this.isPost()){
      if(1==this.setup.GEETEST_IS_ADMLOGIN){
        let Geetest = think.service("geetest"); //加载 commoon 模块下的 geetset service
        let geetest = new Geetest();
        let res = await geetest.validate(this.post());
        if("success" != res.status){
          return this.fail('验证码不正确');
        }
      }

      let username = this.post('username');
      let password = this.post('password');

      if(think.isEmpty(username) || think.isEmpty(password)){
        return this.fail('用户名和密码不能为空');
      }

      let userInfo = await this.model('user').where({uname: username, password: think.md5(password)}).find();

      if(think.isEmpty(userInfo)){
        return this.fail('用户不存在或密码错误');
      }

      await this.session('userInfo', userInfo);
      return this.success({name: "登录成功", url: '/admin/index'});

    }else{
      if(is_login){
        this.redirect('/admin/index');
      }else{
        return this.display();
      }
    }
  }

  async logoutAction(){
    await this.session('userInfo', null);
    //TODO 用户密钥
    this.redirect('/admin/public/signin');
  }

  async islogin(){
    let user = await this.session('userInfo');
    console.log(user);
    let res = think.isEmpty(user) ? false : true;
    return res;
  }

  async geetestAction(){
    let Geetest = think.service("geetest"); //加载 commoon 模块下的 geetset service
    let geetest = new Geetest();
    if(this.isPost()){
      let post =this.post();
      console.log(post);
      let res = await geetest.validate(post);
      console.log(res);
      return this.json(res);
    }else {
      let res = await geetest.register();
      console.log(res);
      return this.json(res);
    }


  }
  async validate(data){
    let deferred = think.defer();
    geetest.validate({

      challenge: data.geetest_challenge,
      validate: data.geetest_validate,
      seccode: data.geetest_seccode

    }, function (err, result) {
      console.log(result);
      var data = {status: "success"};

      if (err || !result) {
        console.log(err);
        data.status = "fail";
      }

      deferred.resolve(data);
    });
    return deferred.promise;
  }
}