const kcl = require('aws-kcl');
const RecordProcessor = require('./record-processor');
const logger = require('./util/logger');

kcl(new RecordProcessor({
  logger,
})).run();
