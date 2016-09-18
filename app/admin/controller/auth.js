// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';

exports.__esModule = true;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Base) {
    (0, _inherits3.default)(_class, _Base);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
    }

    _class.prototype.init = function init(http) {
        _Base.prototype.init.call(this, http);
        this.tactive = "user";
    };
    /**
     * 后台节点配置的url作为规则存入auth_rule
     * 执行新节点的插入,已有节点的更新,无效规则的删除三项任务
     * @author
     */


    _class.prototype.updaterules = function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
            var nodes, AuthRule, map, rules, data, update, ids, diff;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return this.returnnodes(false);

                        case 2:
                            nodes = _context.sent;

                            //think.log(nodes);
                            AuthRule = this.model('auth_rule');
                            map = { 'module': 'admin', 'type': ['in', [1, 2]] }; //status全部取出,以进行更新
                            //需要更新和删除的节点必然位于$rules

                            _context.next = 7;
                            return AuthRule.where(map).order('name').select();

                        case 7:
                            rules = _context.sent;

                            //构建insert数据
                            data = {}; //保存需要插入和更新的新节点

                            nodes.forEach(function (value) {
                                var temp = {};
                                temp.name = value.url;
                                temp.desc = value.title;
                                temp.module = 'admin';
                                if (value.pid > 0) {
                                    temp.type = 1;
                                } else {
                                    temp.type = 2;
                                }
                                temp.status = 1;
                                //$data[strtolower($temp['name'].$temp['module'].$temp['type'])] = $temp;//去除重复项
                                var url = temp.name + temp.module + temp.type;
                                url = url.toLocaleLowerCase();
                                data[url] = temp;
                            });
                            //console.log(rules);
                            update = []; //保存需要更新的节点

                            ids = []; //保存需要删除的节点的id

                            diff = {};

                            rules.forEach(function (rule, i) {
                                var key = rule.name + rule.module + rule.type;
                                key = key.toLocaleLowerCase();
                                if (!think.isEmpty(data[key])) {
                                    //如果数据库中的规则与配置的节点匹配,说明是需要更新的节点
                                    data[key].id = rule.id; //为需要更新的节点补充id值
                                    update.push(data[key]);
                                    delete data[key];
                                    // console.log(i);
                                    // rules.splice(i,1);
                                    delete rule.condition;
                                    delete rule.pid;
                                    //console.log(rule);
                                    diff[rule.id] = rule;
                                } else {
                                    if (rule.status == 1) {
                                        ids.push(rule.id);
                                    }
                                }
                            });

                            // console.log(update);
                            //console.log(rules);
                            // console.log(diff);
                            //console.log(data);
                            if (!think.isEmpty(update)) {
                                update.forEach(function (row) {
                                    //console.log(isObjectValueEqual(row, diff[row.id]))
                                    // console.log(row)
                                    //console.log(diff[row.id])
                                    if (!isObjectValueEqual(row, diff[row.id])) {

                                        AuthRule.where({ id: row.id }).update(row);
                                        //console.log(row);
                                    }
                                });
                            }
                            //console.log(ids);
                            if (!think.isEmpty(ids)) {
                                AuthRule.where({ id: ['IN', ids] }).update({ 'status': -1 });
                                //删除规则是否需要从每个用户组的访问授权表中移除该规则?
                            }
                            // console.log(data);
                            if (!think.isEmpty(data)) {
                                AuthRule.addMany(obj_values(data));
                            }
                            //if ( $AuthRule->getDbError() ) {
                            //    trace('['.__METHOD__.']:'.$AuthRule->getDbError());
                            //    return false;
                            //}else{
                            //    return true;
                            //}
                            return _context.abrupt('return', true);

                        case 18:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function updaterules() {
            return _ref.apply(this, arguments);
        }

        return updaterules;
    }();

    /**
     * 用户分组管理首页
     * @returns {*}
     */


    _class.prototype.indexAction = function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
            var list, _iterator, _isArray, _i, _ref3, v;

            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return this.model("users_group").order("sort ASC").select();

                        case 2:
                            list = _context2.sent;
                            _iterator = list, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);

                        case 4:
                            if (!_isArray) {
                                _context2.next = 10;
                                break;
                            }

                            if (!(_i >= _iterator.length)) {
                                _context2.next = 7;
                                break;
                            }

                            return _context2.abrupt('break', 20);

                        case 7:
                            _ref3 = _iterator[_i++];
                            _context2.next = 14;
                            break;

                        case 10:
                            _i = _iterator.next();

                            if (!_i.done) {
                                _context2.next = 13;
                                break;
                            }

                            return _context2.abrupt('break', 20);

                        case 13:
                            _ref3 = _i.value;

                        case 14:
                            v = _ref3;
                            _context2.next = 17;
                            return this.model('users').where({ groupid: v.groupid, status: 1 }).count('id');

                        case 17:
                            v.count = _context2.sent;

                        case 18:
                            _context2.next = 4;
                            break;

                        case 20:
                            this.assign("list", list);
                            this.meta_title = "会员组管理";
                            return _context2.abrupt('return', this.display());

                        case 23:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function indexAction() {
            return _ref2.apply(this, arguments);
        }

        return indexAction;
    }();

    /**
     * 添加会员组
     */


    _class.prototype.adduserAction = function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
            var data, add;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            if (!this.isPost()) {
                                _context3.next = 13;
                                break;
                            }

                            data = this.post();

                            console.log(data);
                            _context3.next = 5;
                            return this.model("users_group").add(data);

                        case 5:
                            add = _context3.sent;

                            if (!add) {
                                _context3.next = 10;
                                break;
                            }

                            return _context3.abrupt('return', this.success({ name: "添加成功！", url: "/admin/auth/index" }));

                        case 10:
                            return _context3.abrupt('return', this.fail("添加失败！"));

                        case 11:
                            _context3.next = 16;
                            break;

                        case 13:
                            this.meta_title = "添加会员组";
                            this.active = "admin/auth/index";
                            return _context3.abrupt('return', this.display());

                        case 16:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function adduserAction() {
            return _ref4.apply(this, arguments);
        }

        return adduserAction;
    }();
    /**
     * 编辑会员组
     */


    _class.prototype.edituserAction = function () {
        var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
            var data, update, info;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            if (!this.isPost()) {
                                _context4.next = 19;
                                break;
                            }

                            data = this.post();

                            data.allowpost = data.allowpost || 0;
                            data.allowpostverify = data.allowpostverify || 0;
                            data.allowupgrade = data.allowupgrade || 0;
                            data.allowsendmessage = data.allowsendmessage || 0;
                            data.allowattachment = data.allowattachment || 0;
                            data.allowsearch = data.allowsearch || 0;
                            console.log(data);
                            _context4.next = 11;
                            return this.model("users_group").where({ groupid: data.groupid }).update(data);

                        case 11:
                            update = _context4.sent;

                            if (!update) {
                                _context4.next = 16;
                                break;
                            }

                            return _context4.abrupt('return', this.success({ name: "编辑成功！", url: "/admin/auth/index" }));

                        case 16:
                            return _context4.abrupt('return', this.fail("编辑失败！"));

                        case 17:
                            _context4.next = 26;
                            break;

                        case 19:
                            _context4.next = 21;
                            return this.model("users_group").where({ groupid: this.get("id") }).find();

                        case 21:
                            info = _context4.sent;

                            this.assign("info", info);
                            this.meta_title = "编辑会员组";
                            this.active = "admin/auth/index";
                            return _context4.abrupt('return', this.display());

                        case 26:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function edituserAction() {
            return _ref5.apply(this, arguments);
        }

        return edituserAction;
    }();
    /**
     * 删除会员组
     */


    _class.prototype.deluserAction = function () {
        var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
            var ids, dels, id, issystem, del;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            if (!this.isPost()) {
                                _context5.next = 12;
                                break;
                            }

                            ids = this.post("ids");
                            _context5.next = 4;
                            return this.model('users_group').where({ groupid: ['IN', ids] }).delete();

                        case 4:
                            dels = _context5.sent;

                            if (!dels) {
                                _context5.next = 9;
                                break;
                            }

                            return _context5.abrupt('return', this.success({ name: "删除成功！" }));

                        case 9:
                            return _context5.abrupt('return', this.fail("删除失败！"));

                        case 10:
                            _context5.next = 26;
                            break;

                        case 12:
                            id = this.get("id");
                            _context5.next = 15;
                            return this.model('users_group').where({ groupid: id }).getField("issystem", true);

                        case 15:
                            issystem = _context5.sent;

                            if (!(issystem > 0)) {
                                _context5.next = 18;
                                break;
                            }

                            return _context5.abrupt('return', this.fail("系统组，不能删除！"));

                        case 18:
                            _context5.next = 20;
                            return this.model('users_group').where({ groupid: id }).delete();

                        case 20:
                            del = _context5.sent;

                            if (!del) {
                                _context5.next = 25;
                                break;
                            }

                            return _context5.abrupt('return', this.success({ name: "删除成功！" }));

                        case 25:
                            return _context5.abrupt('return', this.fail("删除失败！"));

                        case 26:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        function deluserAction() {
            return _ref6.apply(this, arguments);
        }

        return deluserAction;
    }();
    /**
     * 排序
     */


    _class.prototype.sortAction = function () {
        var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            if (!(this.param('type') == 1)) {
                                _context6.next = 3;
                                break;
                            }

                            _context6.next = 3;
                            return _Base.prototype.sortAction.call(this, this, 'users_group', 'groupid');

                        case 3:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, this);
        }));

        function sortAction() {
            return _ref7.apply(this, arguments);
        }

        return sortAction;
    }();
    /**
     * 管理角色管理首页
     * @returns {*}
     */


    _class.prototype.adminAction = function adminAction() {
        this.assign({
            "datatables": true,
            "tactive": "/admin/user",
            "selfjs": "auth"
        });
        this.active = "admin/auth/index";
        this.meta_title = "权限管理";
        return this.display();
    };
    /**
     * role
     * 权限管理首页ajax角色列表
     * @returns {Promise|*}
     */


    _class.prototype.roleAction = function () {
        var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
            var gets, draw, res, data;
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            gets = this.get();
                            draw = gets.draw;
                            _context7.next = 4;
                            return this.model('auth_role').field("id,desc,status,description").order("id ASC").select();

                        case 4:
                            res = _context7.sent;
                            data = {
                                "draw": draw,
                                "data": res
                            };
                            //console.log(data);

                            return _context7.abrupt('return', this.json(data));

                        case 7:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, this);
        }));

        function roleAction() {
            return _ref8.apply(this, arguments);
        }

        return roleAction;
    }();

    _class.prototype.roleeditAction = function () {
        var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
            var id, desc, description, data, _id, res;

            return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            if (!this.isAjax("post")) {
                                _context8.next = 10;
                                break;
                            }

                            id = this.post("id");
                            desc = this.post("desc");
                            description = this.post("description");
                            _context8.next = 6;
                            return this.model('auth_role').where({ id: id }).update({ desc: desc, description: description });

                        case 6:
                            data = _context8.sent;
                            return _context8.abrupt('return', this.json(data));

                        case 10:
                            _id = this.get("id");
                            _context8.next = 13;
                            return this.model('auth_role').where({ id: _id }).find();

                        case 13:
                            res = _context8.sent;

                            this.assign({
                                data: res
                            });
                            return _context8.abrupt('return', this.display());

                        case 16:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, this);
        }));

        function roleeditAction() {
            return _ref9.apply(this, arguments);
        }

        return roleeditAction;
    }();

    _class.prototype.roleaddAction = function () {
        var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9() {
            var data, res;
            return _regenerator2.default.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            data = this.post();
                            //console.log(1111111111111111)

                            _context9.next = 3;
                            return this.model('auth_role').add(data);

                        case 3:
                            res = _context9.sent;

                            if (!res) {
                                _context9.next = 8;
                                break;
                            }

                            return _context9.abrupt('return', this.json(1));

                        case 8:
                            return _context9.abrupt('return', this.json(0));

                        case 9:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, this);
        }));

        function roleaddAction() {
            return _ref10.apply(this, arguments);
        }

        return roleaddAction;
    }();

    /**
     * roldel
     * 角色删除
     * @returns {Promise|*}
     */


    _class.prototype.roledelAction = function () {
        var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10() {
            var id, res;
            return _regenerator2.default.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            id = this.post("id");
                            //console.log(id);

                            _context10.next = 3;
                            return this.model('auth_role').where({ id: id }).delete();

                        case 3:
                            res = _context10.sent;
                            return _context10.abrupt('return', this.json(res));

                        case 5:
                        case 'end':
                            return _context10.stop();
                    }
                }
            }, _callee10, this);
        }));

        function roledelAction() {
            return _ref11.apply(this, arguments);
        }

        return roledelAction;
    }();

    /**
     * 权限列表
     * @returns {*}
     */


    _class.prototype.accessAction = function () {
        var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11() {
            var _this2 = this;

            var auth_role, this_role;
            return _regenerator2.default.wrap(function _callee11$(_context11) {
                while (1) {
                    switch (_context11.prev = _context11.next) {
                        case 0:
                            _context11.next = 2;
                            return this.updaterules();

                        case 2:
                            _context11.next = 4;
                            return this.model('auth_role').where({ status: ["!=", 0], module: "admin", 'type': 1 }).field('id,desc,rule_ids').select();

                        case 4:
                            auth_role = _context11.sent;

                            //let node_list = await this.returnnodes();
                            //let map       = {module:"admin",type:2,status:1};
                            //let main_rules= await this.model('auth_rule').where(map).field("name,id").select();
                            //let nap       = {module:"admin",type:1,status:1};
                            //let child_rules = await this.model('auth_rule').where(nap).field('name,id').select();
                            this_role = {};

                            auth_role.forEach(function (role) {
                                if (role.id == _this2.get("id")) {
                                    this_role = role;
                                }
                            });
                            //console.log(node_list);
                            this.active = "admin/auth/index";
                            this.meta_title = "权限管理";
                            this.assign({
                                "tactive": "/admin/user",
                                "selfjs": "auth",
                                "thisid": this.get("id"),
                                "auth_role": auth_role,
                                "this_role": this_role
                            });
                            return _context11.abrupt('return', this.display());

                        case 11:
                        case 'end':
                            return _context11.stop();
                    }
                }
            }, _callee11, this);
        }));

        function accessAction() {
            return _ref12.apply(this, arguments);
        }

        return accessAction;
    }();

    _class.prototype.accessdataAction = function () {
        var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12() {
            var _this3 = this;

            var auth_role, node_list, map, main_rules, this_role, m_rules, data;
            return _regenerator2.default.wrap(function _callee12$(_context12) {
                while (1) {
                    switch (_context12.prev = _context12.next) {
                        case 0:
                            _context12.next = 2;
                            return this.updaterules();

                        case 2:
                            _context12.next = 4;
                            return this.model('auth_role').where({ status: ["!=", 0], module: "admin", 'type': 1 }).field('id,desc,rule_ids').select();

                        case 4:
                            auth_role = _context12.sent;
                            _context12.next = 7;
                            return this.returnnodes();

                        case 7:
                            node_list = _context12.sent;
                            map = { module: "admin", type: ['IN', [1, 2]], status: 1 };
                            _context12.next = 11;
                            return this.model('auth_rule').where(map).field("name,id").select();

                        case 11:
                            main_rules = _context12.sent;

                            //let nap       = {module:"admin",type:1,status:1};
                            //let child_rules =await this.model('auth_rule').where(nap).field('name,id').select();
                            this_role = {};

                            auth_role.forEach(function (role) {
                                if (role.id == _this3.post("id")) {
                                    this_role = role;
                                }
                            });
                            m_rules = {};

                            main_rules.forEach(function (v) {
                                var obj = {};
                                obj[v.name] = v.id;
                                (0, _assign2.default)(m_rules, obj);
                            });
                            data = {
                                "main_rules": m_rules,
                                "node_list": node_list,
                                "this_role": this_role
                            };
                            return _context12.abrupt('return', this.json(data));

                        case 18:
                        case 'end':
                            return _context12.stop();
                    }
                }
            }, _callee12, this);
        }));

        function accessdataAction() {
            return _ref13.apply(this, arguments);
        }

        return accessdataAction;
    }();

    _class.prototype.testAction = function () {
        var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13() {
            var ss;
            return _regenerator2.default.wrap(function _callee13$(_context13) {
                while (1) {
                    switch (_context13.prev = _context13.next) {
                        case 0:
                            _context13.next = 2;
                            return this.updaterules();

                        case 2:
                            ss = _context13.sent;

                            //console.log(ss);
                            this.end();

                        case 4:
                        case 'end':
                            return _context13.stop();
                    }
                }
            }, _callee13, this);
        }));

        function testAction() {
            return _ref14.apply(this, arguments);
        }

        return testAction;
    }();

    /**
     * 管理员用户组数据写入/更新
     *
     */


    _class.prototype.writeroleAction = function () {
        var _ref15 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14() {
            var map, id, role;
            return _regenerator2.default.wrap(function _callee14$(_context14) {
                while (1) {
                    switch (_context14.prev = _context14.next) {
                        case 0:
                            map = {};

                            map.rule_ids = this.post("rules");
                            if (think.isArray(map.rule_ids)) {
                                map.rule_ids = map.rule_ids.sort(function (a, b) {
                                    return a - b;
                                }).join(",");
                            }
                            map.module = "admin";
                            map.type = 1;
                            id = this.post("id");
                            role = this.model("auth_role");
                            _context14.next = 9;
                            return role.where({ id: id }).update(map);

                        case 9:
                            return _context14.abrupt('return', this.success({ name: "更新成功" }));

                        case 10:
                        case 'end':
                            return _context14.stop();
                    }
                }
            }, _callee14, this);
        }));

        function writeroleAction() {
            return _ref15.apply(this, arguments);
        }

        return writeroleAction;
    }();

    /**
     * 改变角色状态
     * @returns {Promise|*}
     */


    _class.prototype.chstaAction = function () {
        var _ref16 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee15() {
            var role, res;
            return _regenerator2.default.wrap(function _callee15$(_context15) {
                while (1) {
                    switch (_context15.prev = _context15.next) {
                        case 0:
                            role = this.model("auth_role");
                            _context15.next = 3;
                            return role.update(this.get());

                        case 3:
                            res = _context15.sent;

                            if (!res) {
                                _context15.next = 6;
                                break;
                            }

                            return _context15.abrupt('return', this.json(res));

                        case 6:
                        case 'end':
                            return _context15.stop();
                    }
                }
            }, _callee15, this);
        }));

        function chstaAction() {
            return _ref16.apply(this, arguments);
        }

        return chstaAction;
    }();

    return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=auth.js.map