'use strict';

exports.__esModule = true;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
  }

  _class.prototype.init = function init(http) {
    _Base.prototype.init.call(this, http);
    this.db = this.model('model');
  };
  /**
   * index action
   * @return {Promise} []
   */


  _class.prototype.indexAction = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var map, data, Pages, pages, page;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              map = { 'status': ['>', -1] };
              _context.next = 3;
              return this.db.where(map).page(this.get('page')).countSelect();

            case 3:
              data = _context.sent;
              Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter

              pages = new Pages(); //实例化 Adapter

              page = pages.pages(data);

              this.assign('pagerData', page); //分页展示使用
              this.assign('list', data.data);
              this.meta_title = "模型管理";
              return _context.abrupt('return', this.display());

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function indexAction() {
      return _ref.apply(this, arguments);
    }

    return indexAction;
  }();

  /**
   * 新建模型
   * @returns {*}
   */


  _class.prototype.addAction = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var data, res;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!this.isPost()) {
                _context2.next = 13;
                break;
              }

              data = this.post();
              //console.log(data);

              data.create_time = new Date().valueOf();
              data.update_time = new Date().valueOf();
              data.status = 1;
              _context2.next = 7;
              return this.db.add(data);

            case 7:
              res = _context2.sent;

              if (!res) {
                _context2.next = 11;
                break;
              }

              this.cache("get_document_model", null); //清除模型缓存
              return _context2.abrupt('return', this.success({ name: "添加成功", url: "/admin/model/index" }));

            case 11:
              _context2.next = 16;
              break;

            case 13:
              this.active = "admin/model/index";
              this.meta_title = "添加模型";
              return _context2.abrupt('return', this.display());

            case 16:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function addAction() {
      return _ref2.apply(this, arguments);
    }

    return addAction;
  }();

  _class.prototype.editAction = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var post, res, id, allfields, data, fields, extend_fields, _iterator, _isArray, _i, _ref4, field, obj, _iterator2, _isArray2, _i2, _ref5, v, _iterator3, _isArray3, _i3, _ref6, _v, field_sort, _loop, group;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!this.isPost()) {
                _context3.next = 12;
                break;
              }

              post = this.post();

              post.update_time = new Date().valueOf();
              if (think.isArray(post.attribute_list)) {
                post.attribute_list = post.attribute_list.join(",");
              }

              _context3.next = 6;
              return this.db.update(post);

            case 6:
              res = _context3.sent;

              if (!res) {
                _context3.next = 10;
                break;
              }

              this.cache("get_document_model", null); //清除模型缓存
              return _context3.abrupt('return', this.success({ name: "更新模型成功!", url: "/admin/model/index" }));

            case 10:
              _context3.next = 85;
              break;

            case 12:
              id = this.get("id");
              allfields = void 0;

              if (think.isEmpty(id)) {
                this.fail('参数不能为空！');
              }
              _context3.next = 17;
              return this.db.find(id);

            case 17:
              data = _context3.sent;

              // console.log(data);
              data.attribute_list = think.isEmpty(data.attribute_list) ? '' : data.attribute_list.split(",");
              // console.log(data.attribute_list);
              _context3.next = 21;
              return this.model('attribute').where({ model_id: data.id }).field('id,name,title,is_show').select();

            case 21:
              fields = _context3.sent;

              if (!(data.extend != 0)) {
                _context3.next = 29;
                break;
              }

              _context3.next = 25;
              return this.model('attribute').where({ model_id: data.extend }).field('id,name,title,is_show').select();

            case 25:
              extend_fields = _context3.sent;

              allfields = fields.concat(extend_fields);
              _context3.next = 30;
              break;

            case 29:
              allfields = fields;

            case 30:
              _iterator = allfields, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

            case 31:
              if (!_isArray) {
                _context3.next = 37;
                break;
              }

              if (!(_i >= _iterator.length)) {
                _context3.next = 34;
                break;
              }

              return _context3.abrupt('break', 45);

            case 34:
              _ref4 = _iterator[_i++];
              _context3.next = 41;
              break;

            case 37:
              _i = _iterator.next();

              if (!_i.done) {
                _context3.next = 40;
                break;
              }

              return _context3.abrupt('break', 45);

            case 40:
              _ref4 = _i.value;

            case 41:
              field = _ref4;

              if (!think.isEmpty(data.attribute_list) && !in_array(field.id, data.attribute_list)) {
                field.is_show = 0;
              }
              //console.log(field);

            case 43:
              _context3.next = 31;
              break;

            case 45:
              //console.log(allfields);
              //改造数组
              obj = {};

              if (!allfields) {
                _context3.next = 64;
                break;
              }

              _iterator2 = allfields, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);

            case 48:
              if (!_isArray2) {
                _context3.next = 54;
                break;
              }

              if (!(_i2 >= _iterator2.length)) {
                _context3.next = 51;
                break;
              }

              return _context3.abrupt('break', 62);

            case 51:
              _ref5 = _iterator2[_i2++];
              _context3.next = 58;
              break;

            case 54:
              _i2 = _iterator2.next();

              if (!_i2.done) {
                _context3.next = 57;
                break;
              }

              return _context3.abrupt('break', 62);

            case 57:
              _ref5 = _i2.value;

            case 58:
              v = _ref5;

              obj[v.id] = v;

            case 60:
              _context3.next = 48;
              break;

            case 62:
              _context3.next = 79;
              break;

            case 64:
              _iterator3 = fields, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);

            case 65:
              if (!_isArray3) {
                _context3.next = 71;
                break;
              }

              if (!(_i3 >= _iterator3.length)) {
                _context3.next = 68;
                break;
              }

              return _context3.abrupt('break', 79);

            case 68:
              _ref6 = _iterator3[_i3++];
              _context3.next = 75;
              break;

            case 71:
              _i3 = _iterator3.next();

              if (!_i3.done) {
                _context3.next = 74;
                break;
              }

              return _context3.abrupt('break', 79);

            case 74:
              _ref6 = _i3.value;

            case 75:
              _v = _ref6;

              obj[_v.id] = _v;

            case 77:
              _context3.next = 65;
              break;

            case 79:
              //获取模型排序字段
              field_sort = JSON.parse(data.field_sort);

              if (!think.isEmpty(field_sort)) {
                _loop = function _loop(group) {
                  //console.log(field_sort[group])
                  //for(var value of field_sort[group]){
                  //    console.log(value)
                  //}

                  field_sort[group].forEach(function (v, k) {
                    if (obj[v]) {
                      obj[v].group = group;
                      obj[v].sort = k;
                    }
                    //console.log(v, k)
                  });
                };

                for (group in field_sort) {
                  _loop(group);
                }
              }
              // console.log(field_sort);
              // console.log(obj)
              this.assign({ 'fields': fields, 'extend_fields': extend_fields, 'allfields': obj, 'info': data });
              this.active = "admin/model/index";
              this.meta_title = "编辑模型";
              this.display();

            case 85:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function editAction() {
      return _ref3.apply(this, arguments);
    }

    return editAction;
  }();

  _class.prototype.delAction = function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      var ids, res;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              ids = this.get('id');

              think.isEmpty(ids) && this.fail("参数不能为空");
              _context4.next = 4;
              return this.db.del(ids);

            case 4:
              res = _context4.sent;

              if (!res) {
                this.fail("删除失败");
              } else {
                this.cache("get_document_model", null); //清除模型缓存
                this.success({ name: "删除成功！" });
              }

            case 6:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function delAction() {
      return _ref7.apply(this, arguments);
    }

    return delAction;
  }();

  /**
   * 新增字段检查同一张表是否有相同的字段
   */


  _class.prototype.checknameAction = function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
      var name, id, res;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              name = this.get('name');
              id = this.get('id');
              _context5.next = 4;
              return this.db.checkName(name, id);

            case 4:
              res = _context5.sent;

              if (!res) {
                _context5.next = 9;
                break;
              }

              return _context5.abrupt('return', this.json(1));

            case 9:
              return _context5.abrupt('return', this.json(0));

            case 10:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function checknameAction() {
      return _ref8.apply(this, arguments);
    }

    return checknameAction;
  }();

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=model.js.map