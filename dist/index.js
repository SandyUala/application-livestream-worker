'use strict';

var _awsKcl = require('aws-kcl');

var _awsKcl2 = _interopRequireDefault(_awsKcl);

var _recordProcessor = require('./recordProcessor');

var _recordProcessor2 = _interopRequireDefault(_recordProcessor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _awsKcl2.default)(new _recordProcessor2.default()).run();