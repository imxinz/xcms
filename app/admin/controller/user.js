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

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
  }

  /**
   * index action
   * @return {Promise} []
   */
  _class.prototype.indexAction = function indexAction() {
    //auto render template file index_index.html
    return this.display();
  };

  /**
   * 获取用户头像
   */


  _class.prototype.avatarAction = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var uploadPath, path, pic;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              uploadPath = think.RESOURCE_PATH + '/upload/avatar/' + 2; // this.user.uid;

              path = think.isFile(uploadPath + "/" + "/avatar.png");

              this.type("image/png");
              pic = void 0;

              if (path) {
                // this.download(uploadPath + "/" + "/avatar.png");
                pic = _fs2.default.readFileSync(uploadPath + "/" + "/avatar.png");
              } else {
                //this.download(think.RESOURCE_PATH + '/upload/avatar/avatar.jpg')
                pic = _fs2.default.readFileSync(think.RESOURCE_PATH + '/upload/avatar/avatar.jpg');
              }
              this.end(pic);

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function avatarAction() {
      return _ref.apply(this, arguments);
    }

    return avatarAction;
  }();

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=user.js.map