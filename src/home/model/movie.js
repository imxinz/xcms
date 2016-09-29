'use strict';
/**
 * model
 */
export default class extends think.model.base {
    async queryAll(type, page = 1, num = 20){
        let rs = [];

        if(type == 'new'){
            rs =  this.page(page, num).order("'update' ASC").countSelect();
        }

        return rs;
    }

    async queryDetai(id){
        let rs = await this.where({id : id}).select();
        if(rs.length > 0){
            rs[0]['downloads'] = await this.model('download').where({movieId : rs[0]['id']}).select();
        }
        return rs[0];
    }
}