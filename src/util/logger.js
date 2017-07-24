const KinesisWritable = require('aws-kinesis-writable');
const bunyan = require('bunyan');

const kinesis = new KinesisWritable({
  region: 'us-east-1',
  streamName: 'application-livestream',
  partitionKey: (msg) => {
    const event = JSON.parse(msg);
    return event.writeKey || event.appId;
  },
  buffer: {
    length: 100, // or when 100 messages are in the queue
  },
});

const applicationLivestreamOptions = {
  name: 'application-livestream-worker',
  serializers: { err: bunyan.stdSerializers.err },
  streams: [{
    level: 'info',
    stream: kinesis,
    reemitErrorEvents: true,
  }],
};

const logger = bunyan.createLogger(applicationLivestreamOptions);

// udp errors will be reemitted here. figure out what to do with them later
logger.on('error', () => { });

module.exports = logger;
