'use strict';

import Base from './base.js';
import url from 'url';
import fs from 'fs';

export default class extends Base {

    init(http) {
        super.init(http);

        this.meta_title = '监控列表';
        this.model_name = 'monitor';
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
        return this.display('monitor/index.html');
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

            data['mcode'] = 0;
            data['createTime'] = new Date().valueOf();

            let res = await this.db.add(data);
            let maxRecord = await this.db.order("id DESC").find();

            if(!res){
                return this.fail('添加失败');
            }else{
                await this.db.where({id: maxRecord['id']}).update({mcode: maxRecord['id']+100});
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
            return this.display('default/form.html');
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

    async trackAction(){
        if(!this.isPost()){
            return this.fail('添加失败');
        }

        let data = this.post();
        for(let it in data){
            if(think.isEmpty(data[it])){
                return false;
            }
        }

        if(data['poi']){
            data['poi'] = JSON.stringify(data['poi']);
        }

        data['createtime'] = new Date().valueOf();
        console.log(data);
        let res = await this.model('pois').add(data);

        if(!res){
            return this.fail('添加失败');
        }else{
            return this.success({name: "添加成功"});
        }
    }

    async queryAction(){
        let data = this.get();
        let params = {};
        console.log(data);
        if(think.isEmpty(data)){
            return this.fail('参数不能为空');
        }

        if(data['imei']){
            params['imei'] = data['imei'];
        }
        if(data['tel']){
            params['tel'] = data['tel'];
        }
        if(data['idcard']){
            params['idcard'] = data['idcard'];
        }
        if(data['mcode']){
            params['mcode'] = data['mcode'];
        }

        let res = await this.db.where(params).select();
        if(!res){
            return this.fail('设备未找到');
        }else{
            return this.success(res);
        }
    }

    async authAction(){
        let id = this.get('id');

        if(think.isEmpty(id)){
            return false;
        }

        let res = await this.db.where({id: id}).find();
        if(think.isEmpty(res)){
            return this.alert('该用户不存在');
        }

        let authcode = res['authcode']==0?'':res['authcode'];
        let codeRecord = await this.model('authcode').where({code: authcode}).find();
        if (!think.isEmpty(authcode) && codeRecord['etime'] <= new Date().valueOf()) {
            await this.model('authcode').where({code: authcode}).update({status: 2});
            await this.db.where({id: id}).update({authcode: ''});
            authcode = '';
        }

        let content = await this.fetch(think.APP_PATH+'/../view/admin/inc/dialog.html',{
            data : {
                name : 'dialog-bind-code',
                type : 'form',
                header : '请输入授权码',
                action : '/admin/monitor/bind',
                html : this.authFormHtml(res['id'], authcode),
                buttons : [{type: 'submit', title: '提交'},{type: 'cancel', title: '取消'}]
            }
        });
        this.end(content);
    }

    authFormHtml(id, code){
        let readOnly = think.isEmpty(code)?'':'readonly';
        let html = ['<div class="form-group">\
                     <div class="col-sm-12">\
                     <input type="text" class="form-control" '+ readOnly +' name="mcode" value="'+ code +'" placeholder="请输入授权码">\
                     <input type="hidden" class="form-control" name="mid" value="'+ id +'">\
                     <span class="help-block text-info">必须绑定授权码才能查看该用户位置信息,授权码请联系官方客服索取.</span>\
                     </div>\
                     </div>'];
        return html.join('')
    }

    async bindAction(){
        let mid = this.post('mid');
        let mcode = this.post('mcode');

        if(think.isEmpty(mid) || think.isEmpty(mcode)){
            return this.fail('参数错误');
        }

        let model_monitor = await this.db.where({id : mid}).find();
        let model_code = await this.model('authcode').where({code: mcode, status: 0}).find();

        if(think.isEmpty(model_monitor)){
            return this.fail('该用户不存在');
        }
        if(think.isEmpty(model_code)){
            return this.fail('该授权码不可用');
        }
        if(model_code['etime'] <= new Date().valueOf()){
            await this.model('authcode').where({code: mcode}).update({status: 2});
            return this.fail('该授权码已失效');
        }

        let res = await this.db.where({id : mid}).update({authcode : mcode});
        if(!res){
            return this.fail('绑定失败请重试');
        }else{
            await this.model('authcode').where({code: mcode}).update({status: 1});
            return this.success('绑定成功');
        }
    }

    async locationAction(){
        let id = this.get('id');

        if(think.isEmpty(id)){
            return this.fail('参数错误');
        }

        let res = await this.db.where({id: id}).find();
        if(think.isEmpty(res)){
            return this.alert('该用户不存在');
        }

        let codeRecord = await this.model('authcode').where({code: res['authcode']}).find();
        if(think.isEmpty(codeRecord) || codeRecord['etime'] <= new Date().valueOf()){
            return this.alert('操作被禁止:该用户未授权或授权已失效,请重新绑定授权码');
        }

        let content = await this.fetch(think.APP_PATH+'/../view/admin/inc/dialog.html',{
            data : {
                name : 'dialog-monitor-location',
                type : 'html',
                header : '查看定位',
                action : '#',
                html : await this.locationHtml(res),
                buttons : [{type: 'cancel', title: '关闭'}]
            }
        });
        this.end(content);
    }

    async locationHtml(monitor){
        let content = await this.fetch(think.APP_PATH+'/../view/admin/monitor_location.html',{
            data : monitor
        });
        return content;
    }

    async findpoisAction(){
        let imei = this.get('imei');
        let time = this.get('time');
        let rs = [];

        if(think.isEmpty(imei) || think.isEmpty(time)){
            return this.fail('参数错误');
        }

        if(time != 'lasttime'){
            // if(type == 'path'){
            //         let t = time.split(',');
            //         params = think.extend(params, {createtime: {'>=': t[0],'<=': t[1]}});
            // }
            let st = new Date(time).valueOf();
            let et = new Date(time).valueOf() + 24*3600*1000;

            rs = await this.model('pois').where({
                            imei: imei,
                            createtime: {'>=': st,'<=': et}
                         }).order('createtime DESC').select();
        }else{
            rs = await this.model('pois').where({
                            imei: imei
                         }).order('createtime DESC').find();
        }

        if(!rs){
            return this.fail('定位数据不存在');
        }
        return this.success(rs);
    }
}