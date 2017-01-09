// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';
/**
 * model
 */
export default class extends think.model.base {
    /**
     * 缓存网站配置
     * @returns {*}
     */
    async getset(){
        let value = await think.cache("setup", () => {
            return this.lists();
        }, {timeout: 365 * 24 * 3600});

        return value;
    }

    /**
     * 获取网站配置
     * @returns {{}}
     */
    async lists (){
        let map = {}
        map.status = 1;
        let list = await this.where(map).order("sort ASC").field(["name","value","type"]).select();
        let obj = {}
        list.forEach(v =>{
            if(v.value.search(/\r\n/ig)>-1 && v.type !=2){
                v.value=v.value.split("\r\n");
                let obj ={}
                v.value.forEach(n =>{
                    n=n.split(":");
                    obj[n[0]]=n[1];
                })

                v.value = obj;
            }
            obj[v.name]=v.value;


        })
        return obj;
    }

    async query (name){
        let list = await this.where({'status':1, 'name':name}).field('id,name,title,extra,value,remark,type').order('sort').find();
        let extra = list['extra'].split('\r\n');
        let arr = [];
        extra.forEach(v => {
            let obj = {}
            let item = v.split(':');
            obj['value'] = item[0];
            obj['name'] = item[1];

            arr.push(obj);
        });
        list['extra'] = arr;
        return list;
    }
}
