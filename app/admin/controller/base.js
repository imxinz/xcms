'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$controller$bas) {
  (0, _inherits3.default)(_class, _think$controller$bas);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$controller$bas.apply(this, arguments));
  }

  /**
   * some base method in here
   */
  _class.prototype.init = function init(http) {
    _think$controller$bas.prototype.init.call(this, http);
    this.setup = this.locale('APPCONFIG'); //.WEB_SITE_TITLE = this.config('WEB_SITE_TITLE');
  };

  _class.prototype.__before = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var is_login;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              //登陆验证
              is_login = true; //await this.islogin();

              if (is_login) {
                _context.next = 3;
                break;
              }

              return _context.abrupt('return', this.redirect('/admin/public/signin'));

            case 3:
              _context.next = 5;
              return this.session('userInfo');

            case 5:
              this.user = _context.sent;

              this.assign("userinfo", this.user);
              // this.adminmenu = await this.model('menu').adminmenu();

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function __before() {
      return _ref.apply(this, arguments);
    }

    return __before;
  }();

  /**
   * 判断是否登录
   * @returns {boolean}
   */


  _class.prototype.islogin = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var user, res;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.session('userInfo');

            case 2:
              user = _context2.sent;
              res = think.isEmpty(user) ? false : user.uid;
              return _context2.abrupt('return', res);

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function islogin() {
      return _ref2.apply(this, arguments);
    }

    return islogin;
  }();

  /**
   * 返回后台节点数据
   * @param {boolean} tree    是否返回多维数组结构(生成菜单时用到),为false返回一维数组(生成权限节点时用到)
   * @retrun {array}
   *
   * 注意,返回的主菜单节点数组中有'controller'元素,以供区分子节点和主节点
   */


  _class.prototype.returnnodes = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(tree) {
      var http, tree_nodes, nodes, list;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              tree = tree || true;
              http = this.http;
              //let modelname = http.module;

              tree_nodes = [];

              if (!(tree && !think.isEmpty(tree_nodes))) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt('return', tree_nodes);

            case 5:
              nodes = void 0;

              if (!tree) {
                _context3.next = 13;
                break;
              }

              _context3.next = 9;
              return this.model('menu').field('id,pid,title,url,tip,hide').order('sort asc').select();

            case 9:
              list = _context3.sent;

              nodes = get_children(list, 0);
              _context3.next = 16;
              break;

            case 13:
              _context3.next = 15;
              return this.model('menu').field('title,url,tip,pid').order('sort asc').select();

            case 15:
              nodes = _context3.sent;

            case 16:
              tree_nodes = nodes;
              return _context3.abrupt('return', nodes);

            case 18:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function returnnodes(_x) {
      return _ref3.apply(this, arguments);
    }

    return returnnodes;
  }();

  /**
   * 对数据表中的单行或多行记录执行修改 GET参数id为数字或逗号分隔的数字
   *
   * @param {String} model 模型名称,供M函数使用的参数
   * @param {Object}  data  修改的数据
   * @param {Object}  where 查询时的where()方法的参数
   * @param {Object}  msg   执行正确和错误的消息 {'success':'','error':'', 'url':'','ajax':false}
   *                      url为跳转页面,ajax是否ajax方式(数字则为倒数计时秒数)
   */


  _class.prototype.editRow = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(model, data, where, msg) {
      var id, fields, res;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              id = this.param('id');

              id = think.isArray(id) ? id : id;
              //如存在id字段，则加入该条件
              fields = this.model(model).getSchema();

              if (in_array('id', fields) && !think.isEmpty(id)) {
                where = think.extend({ 'id': ['IN', id] }, where);
              }

              msg = think.extend({ 'success': '操作成功！', 'error': '操作失败！', 'url': '', 'ajax': this.isAjax() }, msg);
              _context4.next = 7;
              return this.model(model).where(where).update(data);

            case 7:
              res = _context4.sent;

              if (res) {
                this.success({ name: msg.success, url: msg.url });
              } else {
                this.fail(msg.error, msg.url);
              }

            case 9:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function editRow(_x2, _x3, _x4, _x5) {
      return _ref4.apply(this, arguments);
    }

    return editRow;
  }();

  /**
   * 禁用条目
   * @param {String} model 模型名称,供D函数使用的参数
   * @param {Object}  where 查询时的 where()方法的参数
   * @param {Object}  msg   执行正确和错误的消息,可以设置四个元素 {'success':'','error':'', 'url':'','ajax':false}
   *                     url为跳转页面,ajax是否ajax方式(数字则为倒数计时秒数)
   */


  _class.prototype.forbid = function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(model, where, msg) {
      var data;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              where = where || {}, msg = msg || { 'success': '状态禁用成功！', 'error': '状态禁用失败！' };
              data = { 'status': 0 };
              _context5.next = 4;
              return this.editRow(model, data, where, msg);

            case 4:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function forbid(_x6, _x7, _x8) {
      return _ref5.apply(this, arguments);
    }

    return forbid;
  }();

  /**
   * 恢复条目
   * @param {String} model 模型名称,供D函数使用的参数
   * @param {Object}  where 查询时的where()方法的参数
   * @param {Object}  msg   执行正确和错误的消息 {'success':'','error':'', 'url':'','ajax':false}
   *                     url为跳转页面,ajax是否ajax方式(数字则为倒数计时秒数)
   */


  _class.prototype.resume = function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(model, where, msg) {
      var data;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              where = where || {}, msg = msg || { 'success': '状态恢复成功！', 'error': '状态恢复失败！' };
              data = { 'status': 1 };
              _context6.next = 4;
              return this.editRow(model, data, where, msg);

            case 4:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function resume(_x9, _x10, _x11) {
      return _ref6.apply(this, arguments);
    }

    return resume;
  }();

  /**
   * 还原条目
   * @param {string} model 模型名称,供D函数使用的参数
   * @param {array}  where 查询时的where()方法的参数
   * @param {array}  msg   执行正确和错误的消息 {'success':'','error':'', 'url':'','ajax':false}
   *                     url为跳转页面,ajax是否ajax方式(数字则为倒数计时秒数)
   */


  _class.prototype.restore = function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(model, where, msg) {
      var data;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              where = where || {}, msg = msg || { 'success': '状态还原成功！', 'error': '状态还原失败！' };
              data = { 'status': 1 };

              where = think.extend({ 'status': -1 }, where);
              _context7.next = 5;
              return this.editRow(model, data, where, msg);

            case 5:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function restore(_x12, _x13, _x14) {
      return _ref7.apply(this, arguments);
    }

    return restore;
  }();

  /**
   * 条目假删除
   * @param {string} model 模型名称,供D函数使用的参数
   * @param {array}  where 查询时的where()方法的参数
   * @param {array} msg   执行正确和错误的消息 {'success':'','error':'', 'url':'','ajax':false}
   *                     url为跳转页面,ajax是否ajax方式(数字则为倒数计时秒数)
   */


  _class.prototype.delete = function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(model, where, msg) {
      var data;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              where = where || {}, msg = msg || { 'success': '删除成功！', 'error': '删除失败！' };
              data = { 'status': -1 };
              _context8.next = 4;
              return this.editRow(model, data, where, msg);

            case 4:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function _delete(_x15, _x16, _x17) {
      return _ref8.apply(this, arguments);
    }

    return _delete;
  }();

  /**
   * 设置一条或者多条数据的状态
   */


  _class.prototype.setstatusAction = function () {
    var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(self, model) {
      var ids, status, map;
      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              model = model || this.http.controller;
              ids = this.param('ids');
              status = this.param('status');

              status = parseInt(status);
              if (think.isEmpty(ids)) {
                this.fail("请选择要操作的数据");
              }
              map = { id: ['IN', ids] };
              //let get = this.get();
              //this.end(status);

              _context9.t0 = status;
              _context9.next = _context9.t0 === -1 ? 9 : _context9.t0 === 0 ? 12 : _context9.t0 === 1 ? 15 : 18;
              break;

            case 9:
              _context9.next = 11;
              return this.delete(model, map, { 'success': '删除成功', 'error': '删除失败' });

            case 11:
              return _context9.abrupt('break', 20);

            case 12:
              _context9.next = 14;
              return this.forbid(model, map, { 'success': '禁用成功', 'error': '禁用失败' });

            case 14:
              return _context9.abrupt('break', 20);

            case 15:
              _context9.next = 17;
              return this.resume(model, map, { 'success': '启用成功', 'error': '启用失败' });

            case 17:
              return _context9.abrupt('break', 20);

            case 18:
              this.fail('参数错误');
              return _context9.abrupt('break', 20);

            case 20:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function setstatusAction(_x18, _x19) {
      return _ref9.apply(this, arguments);
    }

    return setstatusAction;
  }();

  return _class;
}(think.controller.base);

exports.default = _class;
//# sourceMappingURL=base.js.map