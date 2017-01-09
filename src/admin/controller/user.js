'use strict';

import Base from './base.js';
import url from 'url';
import fs from 'fs';

export default class extends Base {

  init(http) {
    super.init(http);

    this.meta_title = '用户列表';
    this.model_name = 'user';
    this.db = this.model(this.model_name);
  }

  async indexAction() {
    let fields = [];
    let map = {};
    let _model = await this.model('model').get_model_desc(this.http.controller);
    let ngrids = await this.model('model').get_model_list_fields(this.http.controller);
    let data = await this.db.where(map)
        /* 默认通过id逆序排列 */
        // .order(model.need_pk?'id DESC':'')
        // .join('sg_hosts ON sg_limitconf.bindHostIds = sg_hosts.id')
        /* 数据分页 */
        .page(this.get("page"))
        /* 执行查询 */
        .countSelect();

    //let list_data = await this.parseDocumentList(data.data, _model.id);

    let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
    let pages = new Pages(); //实例化 Adapter
    let page = pages.pages(data);
    data.data = await this.parseDocumentList(data.data, _model.id);
    // if(data.data['bindHostIds']){
    //     data.data['bindHostIds'] = {
    //         name : data.data['name'],
    //         count : data.data['count'],
    //         id : data.data['bindHostIds']
    //     };
    // }

    this.action_name = 'index';
    this.active = "/admin/"+ this.http.controller +"/"+ this.http.action;
    this.assign('list_grids', ngrids);
    this.assign('list_data',data.data);
    this.assign('pagerData', page); //分页展示使用
    return this.display('default/index.html');
  }

  async addAction(){
    let inputs = await this.model('model').get_model_from(this.model_name);
    let _model = await this.model('model').get_model_desc(this.model_name);
    let ngrids = await this.model('model').get_model_all_fields(this.model_name);
    let allBranches = await this.model('branch').all();
    let list_grids = [];
    let url = "/admin/"+ this.http.controller +"/index";

    if(this.isPost()){
      let data = this.post();

      for(let it in data){
        if(think.isEmpty(data[it])){
          return false;
        }
      }

      data['mcode'] = await this.db.max('id')+100;
      data['createTime'] = new Date().valueOf();


      let res = await this.db.add(data);

      if(!res){
        return this.fail('添加失败');
      }else{
        return this.success({name: "添加成功", url: url});
      }
    }else {

      for (let i = 0, j = inputs.length; i < j; i++) {
        if (ngrids[inputs[i]]) {
          list_grids.push(ngrids[inputs[i]]);
        }
      }
      
      this.action_name = 'add';
      this.assign('list_grids', list_grids);
      this.assign('formdata',{});
      this.assign('allBranches', allBranches);
      return this.display('user/form.html');
    }
  }

  async editAction(){
    let inputs = await this.model('model').get_model_from(this.model_name);
    let ngrids = await this.model('model').get_model_all_fields(this.model_name);
    let allBranches = await this.model('branch').all();
    let list_grids = [];
    let url = "/admin/"+ this.http.controller +"/index";

    if(this.isPost()) {
      let post = this.post();

      if(think.isEmpty(post['id'])){
        return this.fail("参数错误");
      }
      post.applyTime = new Date().valueOf();
      post.password = think.md5(post.password);

      let res = await this.db.where({id : post['id']}).update(post);

      if (!res) {
        this.fail("更新失败");
      } else {
        this.success({name: "更新成功！", url: url});
      }
    }else{
      let id = this.get('id');
      let data = await this.db.where({id: id}).find();

      if(think.isEmpty(id)){
        return this.redirect(url);
      }

      for (let i = 0, j = inputs.length; i < j; i++) {
        if (ngrids[inputs[i]]) {
          list_grids.push(ngrids[inputs[i]]);
        }
      }

      this.action_name = 'edit';
      this.assign('list_grids', list_grids);
      this.assign('formdata', data);
      this.assign('allBranches', allBranches);

      return this.display('user/form.html');
    }
  }

  async delAction(){
    if(this.isPost()){
      let data = this.post();

      think.isEmpty(data['ids']) && this.fail("参数不能为空")
      let res = await this.db.del(data['ids']);
      if (!res) {
        this.fail("删除失败");
      } else {
        this.success({name: "删除成功！"});
      }
    }
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