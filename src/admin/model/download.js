'use strict';

import cheerio from 'cheerio';

export default class extends think.model.base{

    async parseFile(movieId, content){
        let dom = cheerio.load(content);
        let list = dom('li');
        let rs  = [];
        let datas = [];
        // let that = this;

        list.each(function(index, ele){
            let element = cheerio(this);

            if(element.hasClass('ckbox')){ return false; }

            let sourceName = element.find('input[name=CopyAddr1]').val();
            let scode = think.md5(sourceName);
            let data = {
                sname: sourceName,
                movieId: movieId,
                scode: scode,
                durls: []
            };

            let qqUrl = element.find('a.d2').attr('onclick') || '';
            if (qqUrl) {
                qqUrl = qqUrl.match(/start\(\'(.*)\'\)/)[1];
            }

            data['durls'].push({dname: '迅雷下载', durl: element.find('a[thunderhref]').attr('thunderhref')});
            data['durls'].push({dname: '迅雷离线', durl: element.find('a.d1').attr('href')});
            data['durls'].push({dname: '迅雷看看', durl: qqUrl});
            data['durls'].push({dname: 'QQ旋风', durl: element.find('a.d3').attr('qhref')});
            data['durls'].push({dname: '小米', durl: element.find('a.d4').attr('href')});

            //rs.push(rs);
            data['durls'] = JSON.stringify(data['durls']);

            // let res = await this.thenAdd(data, {scode: scode});
            console.log(data);
            datas.push(data);
        });

        console.log(datas);
        for(var i=0,j=datas.length;i<j;i++){
            let res = await this.thenAdd(datas[i], {scode: datas[i]['scode']});
            rs.push(res.id);
        }

        return rs;
    }
}