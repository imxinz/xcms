// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';
/**
 * Role-Based Access Control

 DROP TABLE IF EXISTS `think_auth_role`;
 CREATE TABLE `think_auth_role` (
 `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
 `desc` varchar(255) NOT NULL DEFAULT '',
 `status` tinyint(11) NOT NULL DEFAULT '1',
 `rule_ids` varchar(255) DEFAULT '' COMMENT '',
 PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=utf8;

 DROP TABLE IF EXISTS `think_auth_rule`;
 CREATE TABLE `think_auth_rule` (
 `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
 `name` varchar(255) NOT NULL DEFAULT '' COMMENT '',
 `desc` varchar(255) NOT NULL DEFAULT '' COMMENT '',
 `pid` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '',
 `status` tinyint(11) NOT NULL DEFAULT '1',
 `condition` varchar(255) DEFAULT '' COMMENT '',
 PRIMARY KEY (`id`),
 UNIQUE KEY `name` (`name`),
 KEY `status` (`status`)
 ) ENGINE=MyISAM DEFAULT CHARSET=utf8;

 DROP TABLE IF EXISTS `think_auth_user_role`;
 CREATE TABLE `think_auth_user_role` (
 `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
 `user_id` int(11) NOT NULL,
 `role_id` int(11) NOT NULL,
 PRIMARY KEY (`id`),
 UNIQUE KEY `user_role` (`user_id`,`role_id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=utf8;

 * @type {Class}
 */

exports.__esModule = true;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _class = function (_think$adapter$base) {
  (0, _inherits3.default)(_class, _think$adapter$base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$adapter$base.apply(this, arguments));
  }

  /**
   * init
   * @param  {Number} userId []
   * @param  {Object} config []
   * @param  {Object} http   []
   * @return {}        []
   */
  _class.prototype.init = function init(userId, config, http) {
    _think$adapter$base.prototype.init.call(this, http);
    if (think.isObject(userId)) {
      config = userId;
      userId = config.id;
    }
    this.userId = userId;
    this.config = think.extend({
      type: 1, //auth type, 2 is session auth
      user: 'users', //user info table
      role: 'auth_role', //role table
      rule: 'auth_rule', //rule table
      user_role: 'auth_user_role', //user - role relation table
      userInfo: null
    }, config);
  };
  /**
   * check auth
   * @param  {String} name [auth type]
   * @param  {Boolean} and  [condition]
   * @return {Promise}      []
   */


  _class.prototype.check = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(name, and) {
      var authList, logic;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:

              if (think.isString(name)) {
                name = name.split(',');
              }
              _context.next = 3;
              return this.getAuthList();

            case 3:
              authList = _context.sent;

              if (!(name.length === 1)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt('return', authList.indexOf(name[0]) > -1);

            case 6:
              logic = and ? 'every' : 'some';
              return _context.abrupt('return', name[logic](function (item) {
                return authList.indexOf(item) > -1;
              }));

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function check(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return check;
  }();

  _class.prototype._getAuthList = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var data, http, key, _data;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              data = void 0;

              if (!(this.config.type === 1)) {
                _context2.next = 7;
                break;
              }

              _context2.next = 4;
              return this.flushAuthList();

            case 4:
              data = _context2.sent;
              _context2.next = 19;
              break;

            case 7:
              http = this.http;
              key = this.config('auth_key');

              think.session(this.http);
              _context2.next = 12;
              return http.session.get(key);

            case 12:
              _data = _context2.sent;

              if (!think.isEmpty(_data)) {
                _context2.next = 19;
                break;
              }

              _context2.next = 16;
              return this.flushAuthList();

            case 16:
              _data = _context2.sent;
              _context2.next = 19;
              return http.session.set(key, _data);

            case 19:
              return _context2.abrupt('return', data);

            case 20:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function _getAuthList() {
      return _ref2.apply(this, arguments);
    }

    return _getAuthList;
  }();
  /**
   * get auth list
   * @return {Promise} []
   */


  _class.prototype.getAuthList = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var data, authList, userInfo, result;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _promise2.default.all([this._getAuthList(), this.getUserInfo()]);

            case 2:
              data = _context3.sent;
              authList = data[0];
              userInfo = data[1];
              result = [];


              authList.forEach(function (item) {
                if (!item.condition) {
                  result.push(item.name);
                } else {
                  var condition = item.condition.replace(/\w+/, function (a) {
                    return 'userInfo.' + a;
                  });
                  /*jslint evil: true */
                  var fn = new Function('userInfo', 'return ' + condition);
                  var flag = fn(userInfo);
                  if (flag) {
                    result.push(item.name);
                  }
                }
              });
              return _context3.abrupt('return', result);

            case 8:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getAuthList() {
      return _ref3.apply(this, arguments);
    }

    return getAuthList;
  }();
  /**
   * flush auth list
   * @return {Promise} []
   */


  _class.prototype.flushAuthList = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      var ids, model;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.getRuleIds();

            case 2:
              ids = _context4.sent;
              model = think.model(this.config.rule, think.config('db'));
              return _context4.abrupt('return', model.field('name,condition').where({ id: ['IN', ids], status: 1 }).select());

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function flushAuthList() {
      return _ref4.apply(this, arguments);
    }

    return flushAuthList;
  }();
  /**
   * get user info
   * @return {Promise} []
   */


  _class.prototype.getUserInfo = function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
      var data;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (think.isEmpty(this.config.userInfo)) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt('return', this.config.userInfo);

            case 2:
              _context5.next = 4;
              return think.model(this.config.user, think.config('db')).where({ id: this.userId }).find();

            case 4:
              data = _context5.sent;

              this.config.userInfo = data;
              return _context5.abrupt('return', data);

            case 7:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function getUserInfo() {
      return _ref5.apply(this, arguments);
    }

    return getUserInfo;
  }();
  /**
   * get rule ids
   * @return {Promise} []
   */


  _class.prototype.getRuleIds = function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
      var data, ids;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.getRoles();

            case 2:
              data = _context6.sent;
              ids = [];

              data.forEach(function (item) {
                var ruleIds = (item.rule_ids || '').split(',');
                ids = ids.concat(ruleIds);
              });
              return _context6.abrupt('return', ids);

            case 6:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function getRuleIds() {
      return _ref6.apply(this, arguments);
    }

    return getRuleIds;
  }();
  /**
   * get roles
   * @return {Promise} []
   */


  _class.prototype.getRoles = function getRoles() {
    return think.model(this.config.user_role, think.config('db')).alias('a').join({
      table: this.config.role,
      as: 'b',
      on: ['role_id', 'id']
    }).where({
      'a.user_id': this.userId,
      'b.status': 1
    }).select();
  };

  return _class;
}(think.adapter.base);

exports.default = _class;
//# sourceMappingURL=rbac.js.map