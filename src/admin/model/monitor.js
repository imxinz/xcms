'use strict';
/**
 * model
 */
export default class extends think.model.base {

    /**
     * 删除数据
     */
    async del(ids){
        let res = [];
        await this.clearPois(ids);
        if(think.isArray(ids)) {
            res = this.where('id in (' + ids.join(',') + ')').delete();
        }else{
            res = this.where({id : ids}).delete();
        }
        return res?true:false;
    }

    async clearPois(ids){
        let res = [], imeis = [];
        if(think.isArray(ids)) {
            res = await this.field('imei').where('id in (' + ids.join(',') + ')').select();
        }else{
            res = await this.field('imei').where({id : ids}).find();
        }
        if(!think.isArray(res)) {
            res = [res];
        }
        res.forEach(function(item, i){
            imeis.push(item['imei']);
        });
        think.log(imeis,'imeis');
        res = this.model('pois').where({imei : ['IN', imeis]}).delete();
        return res?true:false;
    }
}