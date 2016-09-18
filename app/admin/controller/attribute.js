// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
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

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 字段属性控制器
 * @author 阿特 <arterli@qq.com>
 * http://www.cmswing.com
 */
var _class = function (_Base) {
    (0, _inherits3.default)(_class, _Base);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
    }

    _class.prototype.init = function init(http) {
        _Base.prototype.init.call(this, http);
        this.db = this.model('attribute');
    };
    /**
     * 字段列表
     * @return {Promise} []
     */


    _class.prototype.indexAction = function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
            var model_id, modelname, list, Pages, pages, page;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            model_id = this.get('model_id');
                            //await this.db.checkTableExist(model_id);
                            //console.log(think.isNumber(85));

                            _context.next = 3;
                            return this.model("model").field('title').find(model_id);

                        case 3:
                            modelname = _context.sent;
                            _context.next = 6;
                            return this.db.where({ model_id: model_id }).page(this.get('page')).countSelect();

                        case 6:
                            list = _context.sent;
                            Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter

                            pages = new Pages(); //实例化 Adapter

                            page = pages.pages(list);
                            // console.log(modelname);

                            this.meta_title = "字段列表";
                            this.active = "admin/model/index";
                            this.assign({
                                list: list.data,
                                model_id: model_id,
                                pagerData: page,
                                modelname: modelname.title
                            });
                            return _context.abrupt('return', this.display());

                        case 14:
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
     * 新增字段
     * @returns {*}
     */


    _class.prototype.addAction = function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
            var model_id, modelname;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            model_id = this.get('model_id');
                            _context2.next = 3;
                            return this.model("model").field('title').find(model_id);

                        case 3:
                            modelname = _context2.sent;

                            this.meta_title = "新增字段";
                            this.active = "admin/model/index";
                            this.assign({
                                meta_title: "新增",
                                model_id: model_id,
                                modelname: modelname.title
                            });
                            return _context2.abrupt('return', this.display());

                        case 8:
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
    /**
     * 编辑页面初始化
     * @author huajie <banhuajie@163.com>
     */


    _class.prototype.editAction = function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
            var id, data, model, modelname;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            id = this.get('id');

                            if (think.isEmpty(id)) {
                                this.fail('参数不能为空！');
                            }

                            /*获取一条记录的详细数据*/
                            _context3.next = 4;
                            return this.db.find(id);

                        case 4:
                            data = _context3.sent;

                            if (!data) {
                                this.fail('错误');
                            }
                            _context3.next = 8;
                            return this.model('model').field('title,name,field_group').find(data.model_id);

                        case 8:
                            model = _context3.sent;
                            _context3.next = 11;
                            return this.model("model").field('title').find(data.model_id);

                        case 11:
                            modelname = _context3.sent;

                            this.assign('model', model);
                            this.assign('info', data);
                            this.active = "admin/model/index";
                            this.assign({
                                meta_title: "编辑",
                                model_id: data.model_id,
                                modelname: modelname.title
                            });
                            this.meta_title = '编辑属性';
                            this.display("add");

                        case 18:
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
    /**
     * 更新一条数据
     * @author
     */


    _class.prototype.updateAction = function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
            var post, res;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            post = this.post();
                            //console.log(post);

                            _context4.next = 3;
                            return this.db.upattr(post, true);

                        case 3:
                            res = _context4.sent;

                            //console.log(res);
                            if (res) {
                                this.success({ name: res.id ? '更新成功' : '新增成功', url: '/admin/attribute/index/model_id/' + res.model_id });
                            } else {
                                this.fail("更新失败");
                            }

                        case 5:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function updateAction() {
            return _ref4.apply(this, arguments);
        }

        return updateAction;
    }();

    /**
     * 删除一条数据
     * @author
     */


    _class.prototype.delAction = function () {
        var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
            var id, info, res;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            id = this.get('id');

                            think.isEmpty(id) && this.fail('参数错误！');

                            _context5.next = 4;
                            return this.db.where({ id: id }).find();

                        case 4:
                            info = _context5.sent;

                            console.log(info);
                            think.isEmpty(info) && this.fail('该字段不存在！');

                            //删除属性数据
                            _context5.next = 9;
                            return this.db.where({ id: id }).delete();

                        case 9:
                            res = _context5.sent;
                            _context5.next = 12;
                            return this.db.deleteField(info);

                        case 12:
                            if (!res) {
                                this.fail('操作失败！');
                            } else {
                                //记录行为
                                //action_log('update_attribute', 'attribute', $id, UID);
                                this.success({ name: '删除成功', url: '/admin/attribute/index/model_id/' + info.model_id });
                            }

                        case 13:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        function delAction() {
            return _ref5.apply(this, arguments);
        }

        return delAction;
    }();

    /**
     * 新增字段检查同一张表是否有相同的字段
     */


    _class.prototype.checknameAction = function () {
        var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
            var name, model_id, id, res;
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            name = this.get('name');
                            model_id = this.get('model_id');
                            id = this.get('id');
                            _context6.next = 5;
                            return this.db.checkName(name, model_id, id);

                        case 5:
                            res = _context6.sent;

                            if (!res) {
                                _context6.next = 10;
                                break;
                            }

                            return _context6.abrupt('return', this.json(1));

                        case 10:
                            return _context6.abrupt('return', this.json(0));

                        case 11:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, this);
        }));

        function checknameAction() {
            return _ref6.apply(this, arguments);
        }

        return checknameAction;
    }();

    return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=attribute.js.map