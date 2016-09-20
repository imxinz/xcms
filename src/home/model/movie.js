'use strict';
/**
 * model
 */
export default class extends think.model.base {
    async queryAll(type, num = 10){
        let rs = [];

        if(type == 'new'){
            rs =  this.page(1, 10).order("'update' DESC").select();
        }

        return rs;
    }
}