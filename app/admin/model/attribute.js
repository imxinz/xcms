'use strict';
/**
 * model
 */

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$model$base) {
    (0, _inherits3.default)(_class, _think$model$base);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, _think$model$base.apply(this, arguments));
    }

    /**
     * 新增或更新一个属性
     * @return Boolean  fasle 失败 ， int  成功 返回完整的数据
     * @author
     */
    _class.prototype.upattr = function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(data, create) {
            var id, res, _res, status;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!think.isEmpty(data)) {
                                _context.next = 2;
                                break;
                            }

                            return _context.abrupt("return", false);

                        case 2:
                            if (!think.isEmpty(data.id)) {
                                _context.next = 20;
                                break;
                            }

                            //新增字段
                            data.create_time = new Date().valueOf();
                            data.status = 1;
                            _context.next = 7;
                            return this.add(data);

                        case 7:
                            id = _context.sent;

                            if (id) {
                                _context.next = 10;
                                break;
                            }

                            return _context.abrupt("return", false);

                        case 10:
                            if (!create) {
                                _context.next = 18;
                                break;
                            }

                            _context.next = 13;
                            return this.addField(data);

                        case 13:
                            res = _context.sent;

                            console.log(res);
                            //return false;

                            if (res) {
                                _context.next = 18;
                                break;
                            }

                            this.delete(id);
                            return _context.abrupt("return", false);

                        case 18:
                            _context.next = 32;
                            break;

                        case 20:
                            if (!create) {
                                _context.next = 26;
                                break;
                            }

                            _context.next = 23;
                            return this.updateField(data);

                        case 23:
                            _res = _context.sent;

                            if (_res) {
                                _context.next = 26;
                                break;
                            }

                            return _context.abrupt("return", false);

                        case 26:
                            data.update_time = new Date().valueOf();
                            _context.next = 29;
                            return this.update(data);

                        case 29:
                            status = _context.sent;

                            if (status) {
                                _context.next = 32;
                                break;
                            }

                            return _context.abrupt("return", false);

                        case 32:
                            return _context.abrupt("return", data);

                        case 33:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function upattr(_x, _x2) {
            return _ref.apply(this, arguments);
        }

        return upattr;
    }();

    /**
     * 检查当前表是否存在
     * @param Number model_id 模型id
     * @return Number 是否存在
     * @author
     */


    _class.prototype.checkTableExist = function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(model_id) {
            var table_name, extend_model, Model, model, res;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            table_name = void 0;
                            extend_model = void 0;
                            Model = this.model("model");
                            _context2.next = 5;
                            return Model.where({ id: model_id }).field("name,extend").find();

                        case 5:
                            model = _context2.sent;

                            if (!(model.extend == 0)) {
                                _context2.next = 10;
                                break;
                            }

                            //独立模型表名
                            table_name = this.table_name = think.parseConfig(true, think.config("db")).prefix + model.name.toLowerCase();
                            _context2.next = 14;
                            break;

                        case 10:
                            _context2.next = 12;
                            return Model.where({ id: model.extend }).field("name,extend").find();

                        case 12:
                            extend_model = _context2.sent;

                            table_name = this.table_name = think.parseConfig(true, think.config("db")).prefix + extend_model.name.toLowerCase() + '_' + model.name.toLowerCase();

                        case 14:
                            _context2.next = 16;
                            return think.model('mysql', think.config("db")).query("SHOW TABLES LIKE '" + table_name + "'");

                        case 16:
                            res = _context2.sent;
                            return _context2.abrupt("return", res.length);

                        case 18:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function checkTableExist(_x3) {
            return _ref2.apply(this, arguments);
        }

        return checkTableExist;
    }();

    /**
     * 新建表字段
     * @param Array field 需要新建的字段属性
     * @return Boolean  true 成功 ， false 失败
     * @author
     */


    _class.prototype.addField = function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_filed) {
            var table_exist, def, sql, value, fie, model_info, _fie, _fie2, res;

            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return this.checkTableExist(_filed.model_id);

                        case 2:
                            table_exist = _context3.sent;

                            //获取默认值
                            value = _filed.value;

                            if (value === '') {
                                def = '';
                            } else if (think.isNumberString(value)) {
                                def = ' DEFAULT ' + value;
                            } else if (think.isString(value)) {
                                def = ' DEFAULT \'' + value + '\'';
                            } else {
                                def = '';
                            }

                            if (!table_exist) {
                                _context3.next = 11;
                                break;
                            }

                            fie = _filed;

                            sql = "ALTER TABLE `" + this.table_name + "` ADD COLUMN `" + fie.name + "`  " + fie.field + "  " + def + " COMMENT '" + fie.title + "';";
                            sql = this.parseSql(sql);
                            _context3.next = 15;
                            break;

                        case 11:
                            _context3.next = 13;
                            return this.model('model').where({ id: _filed.model_id }).field('engine_type,need_pk').find();

                        case 13:
                            model_info = _context3.sent;

                            if (model_info.need_pk) {
                                _fie = _filed;

                                sql = " CREATE TABLE IF NOT EXISTS `" + this.table_name + "` (\n                `id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键' ,\n                `" + _fie.name + "`  " + _fie.field + " " + def + " COMMENT '" + _fie.title + "' ,\n                PRIMARY KEY (`id`)\n                )\n                ENGINE=" + model_info.engine_type + "\n                DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci\n                CHECKSUM=0\n                ROW_FORMAT=DYNAMIC\n                DELAY_KEY_WRITE=0\n                ;";
                                sql = this.parseSql(sql);
                            } else {
                                _fie2 = _filed;

                                sql = "  CREATE TABLE IF NOT EXISTS `" + this.table_name + "` (\n                `" + _fie2.name + "`  " + _fie2.field + " " + def + " COMMENT '" + _fie2.title + "'\n                )\n                ENGINE=" + model_info.engine_type + "\n                DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci\n                CHECKSUM=0\n                ROW_FORMAT=DYNAMIC\n                DELAY_KEY_WRITE=0\n                ;";
                                sql = this.parseSql(sql);
                            }

                        case 15:
                            _context3.next = 17;
                            return think.model('mysql', think.config("db")).execute(sql);

                        case 17:
                            res = _context3.sent;
                            return _context3.abrupt("return", res >= 0);

                        case 19:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function addField(_x4) {
            return _ref3.apply(this, arguments);
        }

        return addField;
    }();

    /**
     * 更新表字段
     * @param array _field 需要更新的字段属性
     * @return boolean true 成功 ， false 失败
     * @author
     */


    _class.prototype.updateField = function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_field) {
            var last_field, def, sql, res;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return this.checkTableExist(_field.model_id);

                        case 2:
                            _context4.next = 4;
                            return this.where({ id: _field.id }).getField('name');

                        case 4:
                            last_field = _context4.sent;


                            //获取默认值
                            def = _field.value != '' ? ' DEFAULT ' + _field.value : '';
                            sql = "ALTER TABLE `" + this.table_name + "` CHANGE COLUMN `" + last_field + "` `" + _field.name + "`  " + _field.field + " " + def + " COMMENT '" + _field.title + "' ;";

                            sql = this.parseSql(sql);
                            console.log(sql);
                            _context4.next = 11;
                            return think.model('mysql', think.config("db")).execute(sql);

                        case 11:
                            res = _context4.sent;

                            console.log(res);
                            return _context4.abrupt("return", res == 0);

                        case 14:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function updateField(_x5) {
            return _ref4.apply(this, arguments);
        }

        return updateField;
    }();

    /**
     * 删除一个字段
     * @param array field 需要删除的字段属性
     * @return boolean true 成功 ， false 失败
     * @author
     */


    _class.prototype.deleteField = function () {
        var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(_field) {
            var sql, res;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return this.checkTableExist(_field.model_id);

                        case 2:
                            sql = "ALTER TABLE `" + this.table_name + "` DROP COLUMN `" + _field.name + "`;";


                            sql = this.parseSql(sql);
                            // console.log(sql);
                            _context5.next = 6;
                            return think.model('mysql', think.config("db")).execute(sql);

                        case 6:
                            res = _context5.sent;
                            return _context5.abrupt("return", res == 0);

                        case 8:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        function deleteField(_x6) {
            return _ref5.apply(this, arguments);
        }

        return deleteField;
    }();

    /**
     * 检查同一张表是否有相同的字段
     * @param name 要验证的字段名称
     * @param model_id 要验证的字段的模型id
     * @author
     */


    _class.prototype.checkName = function () {
        var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(name, model_id, id) {
            var map, res;
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            map = { 'name': name, 'model_id': model_id };

                            if (!think.isEmpty(id)) {
                                map.id = ["!=", id];
                            }
                            _context6.next = 4;
                            return this.where(map).find();

                        case 4:
                            res = _context6.sent;
                            return _context6.abrupt("return", think.isEmpty(res));

                        case 6:
                        case "end":
                            return _context6.stop();
                    }
                }
            }, _callee6, this);
        }));

        function checkName(_x7, _x8, _x9) {
            return _ref6.apply(this, arguments);
        }

        return checkName;
    }();

    /**
     * 获取属性信息并缓存
     * @param int id 属性id
     * @param string field 要获取的字段名
     * @return string  属性信息
     */


    _class.prototype.get_model_attribute = function () {
        var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(model_id, group, fields) {
            var _this2 = this;

            var map, extend, info, attr, k, _iterator4, _isArray4, _i4, _ref11, v;

            return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            //group=group?true:false;
                            //fields=fields?true:false;
                            map = void 0;
                            //验证ID

                            if (!(think.isEmpty(model_id) || !think.isNumberString(model_id))) {
                                _context8.next = 3;
                                break;
                            }

                            return _context8.abrupt("return", '');

                        case 3:
                            //获取属性
                            map = { model_id: model_id };
                            _context8.next = 6;
                            return this.model('model').where({ id: model_id }).getField('extend', true);

                        case 6:
                            extend = _context8.sent;

                            //console.log(extend);
                            if (extend) {
                                map = { model_id: ['IN', [model_id, extend]] };
                            }
                            _context8.next = 10;
                            return this.where(map).field(fields).select();

                        case 10:
                            info = _context8.sent;
                            attr = {};

                            if (!group) {
                                _context8.next = 16;
                                break;
                            }

                            return _context8.delegateYield(_regenerator2.default.mark(function _callee7() {
                                var _iterator, _isArray, _i, _ref8, _val2, model, attribute, group, keys, _group, __group, _iterator2, _isArray2, _i2, _ref9, val, narr, _k;

                                return _regenerator2.default.wrap(function _callee7$(_context7) {
                                    while (1) {
                                        switch (_context7.prev = _context7.next) {
                                            case 0:
                                                _iterator = info, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

                                            case 1:
                                                if (!_isArray) {
                                                    _context7.next = 7;
                                                    break;
                                                }

                                                if (!(_i >= _iterator.length)) {
                                                    _context7.next = 4;
                                                    break;
                                                }

                                                return _context7.abrupt("break", 15);

                                            case 4:
                                                _ref8 = _iterator[_i++];
                                                _context7.next = 11;
                                                break;

                                            case 7:
                                                _i = _iterator.next();

                                                if (!_i.done) {
                                                    _context7.next = 10;
                                                    break;
                                                }

                                                return _context7.abrupt("break", 15);

                                            case 10:
                                                _ref8 = _i.value;

                                            case 11:
                                                _val2 = _ref8;

                                                attr[_val2.id] = _val2;

                                            case 13:
                                                _context7.next = 1;
                                                break;

                                            case 15:
                                                _context7.next = 17;
                                                return _this2.model('model').field("field_sort,attribute_list,attribute_alias").find(model_id);

                                            case 17:
                                                model = _context7.sent;
                                                attribute = void 0;

                                                if (model.attribute_list) {
                                                    attribute = model.attribute_list.split(",");
                                                } else {
                                                    attribute = [];
                                                }
                                                group = void 0;

                                                if (!think.isEmpty(model.field_sort)) {
                                                    _context7.next = 25;
                                                    break;
                                                }

                                                group = { 1: obj_values(attr) };
                                                _context7.next = 55;
                                                break;

                                            case 25:
                                                group = JSON.parse(model.field_sort);
                                                keys = (0, _keys2.default)(group);
                                                //console.log(group);

                                                _group = {};
                                                _context7.t0 = _regenerator2.default.keys(group);

                                            case 29:
                                                if ((_context7.t1 = _context7.t0()).done) {
                                                    _context7.next = 51;
                                                    break;
                                                }

                                                k = _context7.t1.value;
                                                __group = [];
                                                _iterator2 = group[k], _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);

                                            case 33:
                                                if (!_isArray2) {
                                                    _context7.next = 39;
                                                    break;
                                                }

                                                if (!(_i2 >= _iterator2.length)) {
                                                    _context7.next = 36;
                                                    break;
                                                }

                                                return _context7.abrupt("break", 48);

                                            case 36:
                                                _ref9 = _iterator2[_i2++];
                                                _context7.next = 43;
                                                break;

                                            case 39:
                                                _i2 = _iterator2.next();

                                                if (!_i2.done) {
                                                    _context7.next = 42;
                                                    break;
                                                }

                                                return _context7.abrupt("break", 48);

                                            case 42:
                                                _ref9 = _i2.value;

                                            case 43:
                                                val = _ref9;

                                                __group.push(attr[val]);
                                                delete attr[val];

                                            case 46:
                                                _context7.next = 33;
                                                break;

                                            case 48:
                                                _group[k] = __group;
                                                _context7.next = 29;
                                                break;

                                            case 51:
                                                group = _group;

                                                if (!think.isEmpty(attr)) {
                                                    narr = [];

                                                    for (_k in attr) {
                                                        if (!in_array(attr[_k].id, attribute)) {
                                                            delete attr[_k];
                                                        } else {
                                                            narr.push(attr[_k]);
                                                        }
                                                    }
                                                    group[keys[0]] = group[keys[0]].concat(narr);
                                                }
                                                if (!think.isEmpty(model.attribute_alias)) {
                                                    (function () {
                                                        //let alias  = preg_split('/[;\r\n]+/s', model.attribute_alias);
                                                        var alias = model.attribute_alias.split('\r\n');
                                                        //think.log(alias);
                                                        var fields = {};
                                                        for (var _iterator3 = alias, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
                                                            var _ref10;

                                                            if (_isArray3) {
                                                                if (_i3 >= _iterator3.length) break;
                                                                _ref10 = _iterator3[_i3++];
                                                            } else {
                                                                _i3 = _iterator3.next();
                                                                if (_i3.done) break;
                                                                _ref10 = _i3.value;
                                                            }

                                                            var _value = _ref10;

                                                            var _val = _value.split(':');
                                                            //think.log(val);
                                                            fields[_val[0]] = _val[1];
                                                        }
                                                        //think.log(fields);

                                                        var _loop = function _loop(value) {
                                                            group[value].forEach(function (v, k) {
                                                                if (!think.isEmpty(fields[v.name])) {
                                                                    //think.log(group[value][k]);
                                                                    group[value][k]['title'] = fields[v.name];
                                                                }
                                                            });
                                                            //think.log(group[value]['title']);
                                                        };

                                                        for (var value in group) {
                                                            _loop(value);
                                                        }
                                                    })();
                                                }
                                                attr = group;
                                                //think.log(attr);

                                            case 55:
                                            case "end":
                                                return _context7.stop();
                                        }
                                    }
                                }, _callee7, _this2);
                            })(), "t0", 14);

                        case 14:
                            _context8.next = 31;
                            break;

                        case 16:
                            _iterator4 = info, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : (0, _getIterator3.default)(_iterator4);

                        case 17:
                            if (!_isArray4) {
                                _context8.next = 23;
                                break;
                            }

                            if (!(_i4 >= _iterator4.length)) {
                                _context8.next = 20;
                                break;
                            }

                            return _context8.abrupt("break", 31);

                        case 20:
                            _ref11 = _iterator4[_i4++];
                            _context8.next = 27;
                            break;

                        case 23:
                            _i4 = _iterator4.next();

                            if (!_i4.done) {
                                _context8.next = 26;
                                break;
                            }

                            return _context8.abrupt("break", 31);

                        case 26:
                            _ref11 = _i4.value;

                        case 27:
                            v = _ref11;

                            attr[v.name] = v;

                        case 29:
                            _context8.next = 17;
                            break;

                        case 31:
                            return _context8.abrupt("return", attr);

                        case 32:
                        case "end":
                            return _context8.stop();
                    }
                }
            }, _callee8, this);
        }));

        function get_model_attribute(_x10, _x11, _x12) {
            return _ref7.apply(this, arguments);
        }

        return get_model_attribute;
    }();

    return _class;
}(think.model.base);

exports.default = _class;
//# sourceMappingURL=attribute.js.map