const bunyan = require('bunyan');
const uuid = require('uuid');
const path = require('path');
const RollingFileStream = require('streamroller').RollingFileStream;

const name = 'livestream-worker';

function getDefaultStreams() {
  const streams = [];

  const logPath = path.join('./log', `${uuid.v4()}.log`);
  const rollingStream = new RollingFileStream(logPath, 100000000, 3);
  streams.push({
    level: 'info',
    stream: rollingStream,
  });

  return streams;
}

const options = {
  name,
  streams: getDefaultStreams(),
};

const log = bunyan.createLogger(options);

module.exports = log;
