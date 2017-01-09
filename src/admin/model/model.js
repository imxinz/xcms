'use strict';
/**
 * model
 */
export default class extends think.model.base {
    /**
     * 删除数据
     */
    async del(id){
        let table_name;
        let model =await this.field('name,extend').find(id);
        console.log(model);
        if(model.extend == 0){
            table_name = think.config('db').prefix+ model.name.toLowerCase();
        }else if(model.extend == 1){
            table_name = think.config('db').prefix+ 'document_'+model.name.toLowerCase();
        }else {
            //think.fail("只支持删除文档模型和独立模型");
            return false;
        }
        //console.log(table_name);
        //删除属性数据
        // this.model('attribute').where({model_id:id}).delete();
        //删除模型数据
        this.delete(id);
        let sql =`SHOW TABLES LIKE '${table_name}'`;
        let istable =  await think.model('mysql',think.config('db')).query(sql);
        if(!think.isEmpty(istable)){
            sql = `DROP TABLE ${table_name}`;
            let res = await think.model('mysql', think.config('db')).execute(sql);
        }

        return true;
    }
    /**
     * 检查是否有相同的表名
     * @param name 要验证的字段名称
     * @param model_id 要验证的字段的模型id
     * @author
     */
    async checkName(name,id){
        let map = {'name':name};
        if(!think.isEmpty(id)){
            map.id = ["!=", id];
        }
        let res = await this.where(map).find();
        return think.isEmpty(res);
    }
    /**
     * 获取表名（不含表前缀）
     * @param string $model_id
     * @return string 表名
     *
     */
    async get_table_name(model_id){
        model_id=model_id||null;
        if(think.isEmpty(model_id)){
            return false;
        }
        let name;
        let info = await this.where({id:model_id}).find();
        if(info.extend != 0){
            name = await this.where({id:info.extend}).find();
            name = name.name+'_'
        }
        name += info.name;
        return name.replace(/undefined/, "");
    }
    /**
     * 获取文档模型信息并缓存
     * @param  integer id    模型ID
     * @param  string  field 模型字段
     * @return array
     */

    async get_document_model(id, field){
        id=id||null,field=field||null;
        /* 非法分类ID */
        //if(!(think.isNumberString(id) || think.isNumber(id))){
        //    return '555';
        //}

        /* 读取缓存数据 */
        let list = await think.cache("get_document_model", () => {
            return this._get_document_model();
        }, {timeout: 365 * 24 * 3600});


        /* 根据条件返回数据 */
        if(think.isEmpty(id)){
            return list;
        } else if(think.isEmpty(field)){
            return list[id];
        } else {
            return list[id][field];
        }
    }
    /* 获取模型名称 */
    async _get_document_model(){
        let lists = {}
        let map   = {'status' : 1, 'extend': 1};
        let model = await this.where(map).select();
        for(let v of model){
            lists[v.id] = v
        }
        return lists;
    }

    getmodel(id){
        return id;
    }

    /* 根据模型名称获取模型详细描述 */
    async get_model_desc(name){
        let model = await this.where({name : name}).find();
        return model;
    }

    async get_model_all_fields(name){
        let _model = await this.get_model_desc(name);
        let model_attribute = await this.model('attribute').get_model_attribute(_model.id);
        let fields = {};

        for(var field in model_attribute){
            if(model_attribute[field]){
                fields[field] = {
                    key : field,
                    title : model_attribute[field]['title'],
                    type : model_attribute[field]['type'],
                    value : ''
                };
            }
        }

        return fields;
    }

    /* 获取模型表单展示字段*/
    async get_model_list_fields(name){
        let model = await this.where({name : name}).find();
        let fields = [];
        let grids  = trim(model.list_grid).split('\r\n');
        let ngrids = [];

        for (var value of grids){
            if(trim(value) === ''){
                continue;
            }
            // 字段:标题:链接
            let val      = value.split(':');
            // 支持多个字段显示
            let field   = val[0].split(',');
            let values    = {'field' : field, 'title': val[1]};
            if(!think.isEmpty(val[2])){
                values.href	=	val[2];
            }
            if(val[1].indexOf('|') > -1){
                // 显示格式定义
                [values.title,values.format]    =   val[1].split('|');
            }
            for( var v  of field){
                let array	=	v.split('|');
                fields.push(array[0]) ;
            }
            ngrids.push(values);
        }

        return ngrids;
    }

    /* 获取模型表单 */
    async get_model_from(name){
        let model = await this.where({name : name}).find();
        let attribute = await this.model('attribute');
        let forms = JSON.parse(model['field_sort']);
        let inputs = await this.model('attribute').where({id: ["IN", forms['1']]}).field('name,title').select();
        let rs = [];

        for(let it of inputs){
            rs.push(it['name']);
        }

        return rs;
    }
}