'use strict';

import Base from './base.js';
import url from 'url';
import fs from 'fs';

export default class extends Base {

    init(http) {
        super.init(http);

        this.meta_title = '授权码列表';
        this.model_name = this.http.controller;
        this.db = this.model(this.model_name);
    }

    async indexAction() {
        let fields = [];
        let map = {};
        let _model = await this.model('model').get_model_desc(this.model_name);
        let ngrids = await this.model('model').get_model_list_fields(this.model_name);
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
        return this.display('authcode/index.html');
    }

    async addAction(){
        let inputs = await this.model('model').get_model_from(this.model_name);
        let _model = await this.model('model').get_model_desc(this.model_name);
        let ngrids = await this.model('model').get_model_all_fields(this.model_name);
        let list_grids = [];
        let url = "/admin/"+ this.http.controller +"/index";

        if(this.isPost()){
            let data = this.post();

            for(let it in data){
                if(think.isEmpty(data[it])){
                    return false;
                }
            }

            data['createtime'] = new Date().valueOf();
            data['stime'] = new Date(data['stime']).valueOf();
            data['etime'] = new Date(data['etime']).valueOf();
            console.log(data['stime']);
            console.log(data['etime']);
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
            let code = think.md5( new Date().valueOf() + Math.random()*1000 );

            this.action_name = 'add';
            this.assign('list_grids', list_grids);
            this.assign('formdata',{code : code.toUpperCase()});
            return this.display('authcode/form.html');
        }
    }

    async editAction(){
        let inputs = await this.model('model').get_model_from(this.model_name);
        let ngrids = await this.model('model').get_model_all_fields(this.model_name);
        let list_grids = [];
        let url = "/admin/"+ this.http.controller +"/index";

        if(this.isPost()) {
            let post = this.post();

            if(think.isEmpty(post['id'])){
                return this.fail("参数错误");
            }
            post.applyTime = new Date().valueOf();

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

            return this.display('default/form.html');
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
}