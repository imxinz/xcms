/**
 * this file will be loaded before server started
 * you can define global functions used in controllers, models, templates
 */

/**
 * use global.xxx to define global functions
 * 
 * global.fn1 = function(){
 *     
 * }
 */

/**
 * in_array
 * @param stringToSearch
 * @param arrayToSearch
 * @returns {boolean}
 */
/* global in_array */
global.in_array = function(stringToSearch, arrayToSearch) {
    for (let s = 0; s < arrayToSearch.length; s++) {
        let thisEntry = arrayToSearch[s].toString();
        if (thisEntry == stringToSearch) {
            return true;
        }
    }
    return false;
}


/**
 * 分析枚举类型配置值 格式 a:名称1,b:名称2
 * @param str
 * @returns {*}
 */
/* global parse_config_attr */
global.parse_config_attr = function(str) {
    let strs;
    if(str == undefined){ return null; }
    if (str.search(/\r\n/ig) > -1) {
        strs = str.split("\r\n");
    } else if (str.search(/,/ig) > -1) {
        strs = str.split(",");
    } else if(str.search(/\n/ig) > -1){
        strs = str.split("\n");
    }else {
        strs = [str];
    }
    if (think.isArray(strs)) {
        let obj = {}
        strs.forEach(n => {
            n = n.split(":");
            obj[n[0]] = n[1];
        })
        return obj;
    }

}

// 获取属性类型信息
/* global get_attribute_type */
global.get_attribute_type = function(type) {
    // TODO 可以加入系统配置
    let _type = {
        'num': ['数字', 'int(10) unsigned NOT NULL'],
        'string': ['字符串', 'varchar(255) NOT NULL'],
        'textarea': ['文本框', 'text NOT NULL'],
        'date': ['日期', 'bigint(13) NOT NULL'],
        'datetime': ['时间', 'bigint(13) NOT NULL'],
        'bool': ['布尔', 'tinyint(2) NOT NULL'],
        'select': ['枚举', 'char(50) NOT NULL'],
        'radio': ['单选', 'char(10) NOT NULL'],
        'checkbox': ['多选', 'varchar(100) NOT NULL'],
        'editor': ['编辑器', 'text NOT NULL'],
        'picture': ['上传图片', 'int(10) unsigned NOT NULL'],
        'file': ['上传附件', 'int(10) unsigned NOT NULL']
    }
    return type ? _type[type][0] : _type;
}