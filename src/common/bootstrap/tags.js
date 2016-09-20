
/**
 * 获取频道信息
 */
global.channel = function(){
    this.tags = ['channel'];
    this.parse = function (parser,nodes,lexer) {
        var tok = parser.nextToken();
        var args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);
        return new nodes.CallExtensionAsync(this, 'run', args)
    };
    this.run = async function (context, args, callback) {
        let data = think.isEmpty(args.data) ?"data":args.data;
        // let channel = await think.model('channel', think.config("db"),'admin').get_channel_cache();
        // channel = arr_to_tree(channel,0);
        //console.log(channel);

        let channel = [
            {key : 'dianying', name : '电影', children : ['爱情','动作','喜剧','情色','科幻','恐怖']},
            {key : 'dianshi', name : '电视', children : ['欧美','国产','港台','日韩']},
            {key : 'dongman', name : '动漫'},
            {key : 'zongyi', name : '综艺'}
        ];

        context.ctx[data] = channel;
        return callback(null,'');
    }
}

global.column = function(){
    this.tags = ['column'];
    this.parse = function (parser,nodes,lexer) {
        var tok = parser.nextToken();
        var args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);
        return new nodes.CallExtensionAsync(this, 'run', args)
    };
    this.run = async function (context, args, callback) {
        let data = think.isEmpty(args.data) ?"data":args.data;
        context.ctx[data] = [];
        return callback(null,'');
    }
}

global.groups = function(){
    this.tags = ['groups'];
    this.parse = function (parser,nodes,lexer) {
        var tok = parser.nextToken();
        var args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);
        return new nodes.CallExtensionAsync(this, 'run', args)
    };
    this.run = async function (context, args, callback) {
        let data = think.isEmpty(args.data) ?"data":args.data;
        context.ctx[data] = [];
        return callback(null,'');
    }
}

global.topic = function(){
    this.tags = ['topic'];
    this.parse = function (parser,nodes,lexer) {
        var tok = parser.nextToken();
        var args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);
        return new nodes.CallExtensionAsync(this, 'run', args)
    };
    this.run = async function (context, args, callback) {
        let data = think.isEmpty(args.data) ?"data":args.data;
        context.ctx[data] = [];
        return callback(null,'');
    }
}