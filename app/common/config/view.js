'use strict';
/**
 * template config
 */

exports.__esModule = true;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  type: 'nunjucks',
  content_type: 'text/html',
  file_ext: '.html',
  file_depr: '_',
  root_path: think.ROOT_PATH + '/view',
  adapter: {
    nunjucks: {
      prerender: function prerender(nunjucks, env) {
        /**
         * 格式化字节大小
         * @param  number size      字节数
         * @param  string delimiter 数字和单位分隔符
         * @return string            格式化后的带单位的大小
         */
        env.addFilter("format_bytes", function (size) {
          var delimiter = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

          var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
          for (var i = 0; size >= 1024 && i < 5; i++) {
            size /= 1024;
          }return Math.round(size * 100) / 100 + delimiter + units[i];
        });

        /**
         * 格式化时间
         */
        env.addFilter("format_time", function (d, sec) {
          var time;
          var date = new Date(d);
          var y = date.getFullYear();
          var M = date.getMonth() + 1;
          M = M < 10 ? "0" + M : M;
          var d = date.getDate();
          d = d < 10 ? "0" + d : d;
          var h = date.getHours();
          h = h < 10 ? "0" + h : h;
          var m = date.getMinutes();
          m = m < 10 ? "0" + m : m;
          var s = date.getSeconds();
          s = s < 10 ? "0" + s : s;
          if (sec) {
            time = y + "-" + M + "-" + d + " " + h + ":" + m + ":" + s;
          } else {
            time = y + "-" + M + "-" + d + " " + h + ":" + m;
          }
          return time;
        });

        /**
         *分析枚举类型配置值 格式 a:名称1,b:名称2
         */
        env.addFilter("parse_config_attr", function (str) {
          return parse_config_attr(str);
        });
        env.addFilter("show_status_op", function (status) {
          // 获取数据的状态操作
          switch (status) {
            case 0:
              return '启用';
              break;
            case 1:
              return '禁用';
              break;
            case 2:
              return '审核';
              break;
            default:
              return false;
              break;

          }
        });
        env.addFilter("strToJson", function (str) {
          if (!think.isEmpty(str) && str != 0) {
            return JSON.parse(str);
          }
        });
        env.addFilter("jsonToStr", function (json) {
          if (!think.isEmpty(json)) {
            return (0, _stringify2.default)(json);
          }
        });
        env.addFilter("strToArray", function (str) {
          if (!think.isEmpty(str)) {
            var ss = str.split(","); // 在每个逗号(,)处进行分解。
            return ss;
          }
        });

        env.addFilter("in_Array", function (str, arr) {
          arr = arr || 0;
          if (!think.isArray(arr)) {
            if (think.isNumber(arr)) {
              arr = "'" + arr + "'";
            }
            arr = arr.split(",");
          }
          //console.log(arr);
          return in_array(str, arr);
        });

        env.addFilter("isempty", function (any) {
          return think.isEmpty(any);
        });

        //获取字段类型信息
        env.addFilter("get_attribute_type", function (str) {
          return get_attribute_type(str);
        });
        //格式化字段列表
        env.addFilter("get_list_field", function (data, grid, controller, module) {
          return get_list_field(data, grid, controller, module);
        });
        //表情图标正则替换
        env.addFilter("get_bq", function (wx_bq, emoji) {
          for (var key in emoji) {
            var img = '<img src="https:\/\/res.wx.qq.com/mpres/htmledition/images/icon/emotion/' + key + '.gif" />';
            var reg = new RegExp('\\[' + emoji[key] + '\\]', 'g');
            wx_bq = wx_bq.replace(reg, img);
          }
          return wx_bq;
        });
        //解析分类信息url
        env.addFilter("sort_url", function (id, val, arr, http) {

          return sort_url(id, val, arr, http);
        });
        //解析分类信息当前状态
        env.addFilter("sort_act", function (id, getid) {
          //console.log(in_array(id, sanjiao(getid.split("."))));
          if (!think.isEmpty(getid)) {
            return in_array(id, sanjiao(getid.split(".")));
          }
        });
        /**
         * 时间戳格式化 dateformat('Y-m-d H:i:s')
         * @param extra 'Y-m-d H:i:s'
         * @param date  时间戳
         * @return  '2015-12-17 15:39:44'
         */
        env.addFilter("dateformat", function (extra, date) {
          return dateformat(date, extra);
        });

        /**
         * 获取行为类型
         * @param intger type 类型
         * @param bool all 是否返回全部类型
         * @author arterli <arterli@qq.com>
         */
        env.addFilter("get_action_type", function (type) {
          var all = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

          return get_action_type(type, all);
        });
        /**
         * 获取模型字段信息
         * @param model_id 模型id 或 模型名称
         * @param id 数据id
         * @param field 字段
         * @param return 整条数据或字段数据
         * @author arterli <arterli@qq.com>
         */
        env.addFilter("getmodelfield", function () {
          var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(id, model_id, field, callback) {
            var data;
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return getmodelfield(model_id, id, field);

                  case 2:
                    data = _context.sent;

                    callback(null, data);

                  case 4:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, undefined);
          }));

          return function (_x3, _x4, _x5, _x6) {
            return _ref.apply(this, arguments);
          };
        }(), true);
        /**
         * 获取模型信息
         * @param model_id 模型id 或 模型名称
         * @param field 字段
         * @param return 整条数据或字段数据
         * @author arterli <arterli@qq.com>
         */
        env.addFilter("getmode", function () {
          var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(model_id, field, callback) {
            var data;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return get_model(model_id, field);

                  case 2:
                    data = _context2.sent;

                    callback(null, data);

                  case 4:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2, undefined);
          }));

          return function (_x7, _x8, _x9) {
            return _ref2.apply(this, arguments);
          };
        }(), true);
        /**
         * 获取用户名称
         */
        env.addFilter("get_nickname", function () {
          var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(uid, callback) {
            var data;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return get_nickname(uid);

                  case 2:
                    data = _context3.sent;

                    callback(null, data);

                  case 4:
                  case 'end':
                    return _context3.stop();
                }
              }
            }, _callee3, undefined);
          }));

          return function (_x10, _x11) {
            return _ref3.apply(this, arguments);
          };
        }(), true);
        /**
         * 获取文档url
         */
        env.addFilter('get_url', function (name, id) {
          return get_url(name, id);
        });
        /**
         * 获取文档封面图
         */
        env.addFilter('get_cover', function () {
          var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(cover_id, field, callback) {
            var data;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return get_cover(cover_id, field);

                  case 2:
                    data = _context4.sent;

                    callback(null, data);

                  case 4:
                  case 'end':
                    return _context4.stop();
                }
              }
            }, _callee4, undefined);
          }));

          return function (_x12, _x13, _x14) {
            return _ref4.apply(this, arguments);
          };
        }(), true);
        /**
         * {{id|get_pic("m=1,w=200,h=200")}}
         */
        env.addFilter('get_pic', function () {
          var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(id, type, callback) {
            var m, w, h, obj, _iterator, _isArray, _i, _ref6, v, data;

            return _regenerator2.default.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    m = void 0, w = void 0, h = void 0;
                    //console.log(type);

                    obj = {};
                    _iterator = type.split(","), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

                  case 3:
                    if (!_isArray) {
                      _context5.next = 9;
                      break;
                    }

                    if (!(_i >= _iterator.length)) {
                      _context5.next = 6;
                      break;
                    }

                    return _context5.abrupt('break', 18);

                  case 6:
                    _ref6 = _iterator[_i++];
                    _context5.next = 13;
                    break;

                  case 9:
                    _i = _iterator.next();

                    if (!_i.done) {
                      _context5.next = 12;
                      break;
                    }

                    return _context5.abrupt('break', 18);

                  case 12:
                    _ref6 = _i.value;

                  case 13:
                    v = _ref6;

                    v = v.split("=");
                    obj[v[0]] = v[1];

                  case 16:
                    _context5.next = 3;
                    break;

                  case 18:
                    m = obj.m;
                    w = obj.w;
                    h = obj.h;
                    _context5.next = 23;
                    return get_pic(id, m, w, h);

                  case 23:
                    data = _context5.sent;

                    callback(null, data);

                  case 25:
                  case 'end':
                    return _context5.stop();
                }
              }
            }, _callee5, undefined);
          }));

          return function (_x15, _x16, _x17) {
            return _ref5.apply(this, arguments);
          };
        }(), true);
        /**
         * 根据栏目id获取栏目信息
         *
         */
        env.addFilter('get_cate', function () {
          var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(id, callback) {
            var data;
            return _regenerator2.default.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.next = 2;
                    return get_cate(id);

                  case 2:
                    data = _context6.sent;

                    callback(null, data);

                  case 4:
                  case 'end':
                    return _context6.stop();
                }
              }
            }, _callee6, undefined);
          }));

          return function (_x18, _x19) {
            return _ref7.apply(this, arguments);
          };
        }(), true);
        //价格格式化
        env.addFilter("get_price_format", function (price, type) {
          return get_price_format(price, type);
        });
        /**
         * is_weixin
         * 判断是否是微信访问
         */
        env.addFilter("is_weixin", function (agent) {
          return is_weixin(agent);
        });
        /**
         * 将数值四舍五入(保留1位小数)后格式化成金额形式
         *
         * @param num 数值(Number或者String)
         * @return 金额格式的字符串,如'1,234,567.4'
         * @type String
         */
        env.addFilter("formatCurrency", function (num) {
          if (!think.isEmpty(num)) {
            return formatCurrency(num);
          }
        });
        /**
         * 获取商品价格不格式
         */
        env.addFilter('get_price', function (price, type) {
          return get_price(price, type);
        });
        /**
         * 字符串在指定位置插入内容
         * str表示原字符串变量，flg表示要插入的字符串，sn表示要插入的位置
         */
        env.addFilter('insert_flg', function (str, flg, sn) {
          var newstr = "";
          for (var i = 0; i < str.length; i += sn) {
            var tmp = str.substring(i, i + sn);
            newstr += tmp + flg;
          }
          return newstr;
        });
        /**
         * 字符串在指定位截断
         * str表示原字符串变量，flg表示要插入的字符串，sn表示要截断位置
         */
        env.addFilter('block', function (str, sn, flg) {
          var newstr = "";
          var tmp = str.substring(0, sn);
          if (think.isEmpty(flg)) {
            flg = "...";
          }
          newstr = tmp + flg;
          return newstr;
        });
        /**
         * 过滤html标签
         *
         */
        env.addFilter('delhtmltags', function (str) {
          if (!think.isEmpty(str)) {
            return str.replace(/<[^>]+>/g, ""); //去掉所有的html标记
          } else {
            return '';
          }
        });
        /**
         * 获取文件信息
         * @param file_id 文件id
         * @param field 字段名,如果为空则返回整个记录集
         * @returns {*}
         */
        env.addFilter('get_file', function () {
          var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(file_id, field, key, callback) {
            var data;
            return _regenerator2.default.wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.next = 2;
                    return get_file(file_id, field, key);

                  case 2:
                    data = _context7.sent;

                    callback(null, data);

                  case 4:
                  case 'end':
                    return _context7.stop();
                }
              }
            }, _callee7, undefined);
          }));

          return function (_x20, _x21, _x22, _x23) {
            return _ref8.apply(this, arguments);
          };
        }(), true);

        // env.addExtension('tagtest', new mytags(), true);
        // /**
        //  * 获取分类标签
        //  */
        // env.addExtension('column', new column(), true);
        // /**
        //  * 获取导航标签
        //  */
        // env.addExtension('channel', new channel(), true);
        // /**
        //  * 获取数据标签
        //  */
        // env.addExtension('topic', new topic(), true);
        // /**
        //  * 获取分类分组
        //  */
        // env.addExtension('groups', new groups(), true);
      }
    }
  }
};
//# sourceMappingURL=view.js.map