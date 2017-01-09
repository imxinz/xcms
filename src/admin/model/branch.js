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
        if(think.isArray(ids)) {
            res = this.where('id in (' + ids.join(',') + ')').delete();
        }else{
            res = this.where({id : ids}).delete();
        }
        return res?true:false;
    }

    async all(){
        let res = await this.where({status : 1}).select();
        res.push({
            id : 0,
            bcode : 0,
            bname : '总部'
        });
        return res;
    }
}