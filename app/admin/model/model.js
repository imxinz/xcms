'use strict';
/**
 * model
 */

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$model$base) {
    (0, _inherits3.default)(_class, _think$model$base);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, _think$model$base.apply(this, arguments));
    }

    /**
     * 删除数据
     */
    _class.prototype.del = function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(id) {
            var table_name, model, sql, istable, res;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            table_name = void 0;
                            _context.next = 3;
                            return this.field('name,extend').find(id);

                        case 3:
                            model = _context.sent;

                            console.log(model);

                            if (!(model.extend == 0)) {
                                _context.next = 9;
                                break;
                            }

                            table_name = think.config('db').prefix + model.name.toLowerCase();
                            _context.next = 14;
                            break;

                        case 9:
                            if (!(model.extend == 1)) {
                                _context.next = 13;
                                break;
                            }

                            table_name = think.config('db').prefix + 'document_' + model.name.toLowerCase();
                            _context.next = 14;
                            break;

                        case 13:
                            return _context.abrupt('return', false);

                        case 14:
                            //console.log(table_name);
                            //删除属性数据
                            // this.model('attribute').where({model_id:id}).delete();
                            //删除模型数据
                            this.delete(id);
                            sql = 'SHOW TABLES LIKE \'' + table_name + '\'';
                            _context.next = 18;
                            return think.model('mysql', think.config('db')).query(sql);

                        case 18:
                            istable = _context.sent;

                            if (think.isEmpty(istable)) {
                                _context.next = 24;
                                break;
                            }

                            sql = 'DROP TABLE ' + table_name;
                            _context.next = 23;
                            return think.model('mysql', think.config('db')).execute(sql);

                        case 23:
                            res = _context.sent;

                        case 24:
                            return _context.abrupt('return', true);

                        case 25:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function del(_x) {
            return _ref.apply(this, arguments);
        }

        return del;
    }();
    /**
     * 检查是否有相同的表名
     * @param name 要验证的字段名称
     * @param model_id 要验证的字段的模型id
     * @author
     */


    _class.prototype.checkName = function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(name, id) {
            var map, res;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            map = { 'name': name };

                            if (!think.isEmpty(id)) {
                                map.id = ["!=", id];
                            }
                            _context2.next = 4;
                            return this.where(map).find();

                        case 4:
                            res = _context2.sent;
                            return _context2.abrupt('return', think.isEmpty(res));

                        case 6:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function checkName(_x2, _x3) {
            return _ref2.apply(this, arguments);
        }

        return checkName;
    }();
    /**
     * 获取表名（不含表前缀）
     * @param string $model_id
     * @return string 表名
     *
     */


    _class.prototype.get_table_name = function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(model_id) {
            var name, info;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            model_id = model_id || null;

                            if (!think.isEmpty(model_id)) {
                                _context3.next = 3;
                                break;
                            }

                            return _context3.abrupt('return', false);

                        case 3:
                            name = void 0;
                            _context3.next = 6;
                            return this.where({ id: model_id }).find();

                        case 6:
                            info = _context3.sent;

                            if (!(info.extend != 0)) {
                                _context3.next = 12;
                                break;
                            }

                            _context3.next = 10;
                            return this.where({ id: info.extend }).find();

                        case 10:
                            name = _context3.sent;

                            name = name.name + '_';

                        case 12:
                            name += info.name;
                            return _context3.abrupt('return', name.replace(/undefined/, ""));

                        case 14:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function get_table_name(_x4) {
            return _ref3.apply(this, arguments);
        }

        return get_table_name;
    }();
    /**
     * 获取文档模型信息并缓存
     * @param  integer id    模型ID
     * @param  string  field 模型字段
     * @return array
     */

    _class.prototype.get_document_model = function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(id, field) {
            var _this2 = this;

            var list;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            id = id || null, field = field || null;
                            /* 非法分类ID */
                            //if(!(think.isNumberString(id) || think.isNumber(id))){
                            //    return '555';
                            //}

                            /* 读取缓存数据 */
                            _context4.next = 3;
                            return think.cache("get_document_model", function () {
                                return _this2._get_document_model();
                            }, { timeout: 365 * 24 * 3600 });

                        case 3:
                            list = _context4.sent;

                            if (!think.isEmpty(id)) {
                                _context4.next = 8;
                                break;
                            }

                            return _context4.abrupt('return', list);

                        case 8:
                            if (!think.isEmpty(field)) {
                                _context4.next = 12;
                                break;
                            }

                            return _context4.abrupt('return', list[id]);

                        case 12:
                            return _context4.abrupt('return', list[id][field]);

                        case 13:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function get_document_model(_x5, _x6) {
            return _ref4.apply(this, arguments);
        }

        return get_document_model;
    }();
    /* 获取模型名称 */


    _class.prototype._get_document_model = function () {
        var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
            var lists, map, model, _iterator, _isArray, _i, _ref6, v;

            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            lists = {};
                            map = { 'status': 1, 'extend': 1 };
                            _context5.next = 4;
                            return this.where(map).select();

                        case 4:
                            model = _context5.sent;
                            _iterator = model, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

                        case 6:
                            if (!_isArray) {
                                _context5.next = 12;
                                break;
                            }

                            if (!(_i >= _iterator.length)) {
                                _context5.next = 9;
                                break;
                            }

                            return _context5.abrupt('break', 20);

                        case 9:
                            _ref6 = _iterator[_i++];
                            _context5.next = 16;
                            break;

                        case 12:
                            _i = _iterator.next();

                            if (!_i.done) {
                                _context5.next = 15;
                                break;
                            }

                            return _context5.abrupt('break', 20);

                        case 15:
                            _ref6 = _i.value;

                        case 16:
                            v = _ref6;

                            lists[v.id] = v;

                        case 18:
                            _context5.next = 6;
                            break;

                        case 20:
                            return _context5.abrupt('return', lists);

                        case 21:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        function _get_document_model() {
            return _ref5.apply(this, arguments);
        }

        return _get_document_model;
    }();

    _class.prototype.getmodel = function getmodel(id) {
        return id;
    };

    return _class;
}(think.model.base);

exports.default = _class;
//# sourceMappingURL=model.js.map