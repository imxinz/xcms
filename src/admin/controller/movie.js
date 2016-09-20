'use strict';

import Base from './base.js';

export default class extends Base{
    init(http){
        super.init(http);
        this.db = this.model('movie');
    }

    indexAction(){
        return this.display();
    }

    async publishAction(){
        if (this.isPost()) {
            let data = this.post();
            // let dom = cheerio.load(data['files']);
            let files = [];
            let movie = {
                title : data['title'] || '',
                thumb : data['thumb'] || '',
                pdate : data['pdate'].replace('年','') || '2016',
                type : data['type'] || '',
                actor : data['actor'] || '',
                region : data['region'].trim() || '未知',
                update : new Date(data['update']).valueOf() || new Date().valueOf(),
                score : data['score'] || 3,
                desc : data['desc'] || '',
                category : 'dianying',
                downloadIds : ''
            };

            let  res = await this.db.thenAdd(movie, {title : movie['title']});
            
            if (res) {
                
                let downloadModel = this.model('download');
                let resDownload = await downloadModel.parseFile(res['id'], data['files']);

                // console.log(resDownload);
                if(resDownload){
                    this.db.where({id : res['id']}).update({downloadIds : resDownload.join(',')});
                }

                this.cache("get_document_model", null);//清除模型缓存
                return this.success({name: "添加成功", url: "/admin/movie/index"});
            }

        }else{
            console.log('not post');
        }
    }
    
    

}