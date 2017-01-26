'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _astronomerKinesisRecordProcessor = require('@astronomerio/astronomer-kinesis-record-processor');

var _astronomerKinesisRecordProcessor2 = _interopRequireDefault(_astronomerKinesisRecordProcessor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Livestream = function (_RecordProcessor) {
  _inherits(Livestream, _RecordProcessor);

  function Livestream() {
    _classCallCheck(this, Livestream);

    return _possibleConstructorReturn(this, (Livestream.__proto__ || Object.getPrototypeOf(Livestream)).apply(this, arguments));
  }

  _createClass(Livestream, [{
    key: 'processRecord',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(record) {
        var partitionKey, sequenceNumber, data, payload;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                partitionKey = record.partitionKey, sequenceNumber = record.sequenceNumber, data = record.data;

                // data is a byteArray, we need to make it a string and then subsequently a JSON object

                payload = Buffer.from(data, 'base64').toString('utf8');


                this.logger.info({ clickstream_event: payload });

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function processRecord(_x) {
        return _ref.apply(this, arguments);
      }

      return processRecord;
    }()
  }]);

  return Livestream;
}(_astronomerKinesisRecordProcessor2.default);

exports.default = Livestream;
;