import RecordProcessor from '@astronomerio/astronomer-kinesis-record-processor';

export default class Livestream extends RecordProcessor {
  async processRecord(record) {
    const { partitionKey, sequenceNumber, data } = record;

    // data is a byteArray, we need to make it a string and then subsequently a JSON object
    const payload = Buffer.from(data, 'base64').toString('utf8');
    try {
      const event = JSON.parse(payload);
      this.logger.info({ appId: event.appId, userId: event.userId, type: event.type, time: event.time, timestamp: event.timestamp, sentAt: event.sentAt, receivedAt: event.receivedAt, raw_clickstream_event: JSON.stringify(event) }, 'Received clickstream event for appId: ' + event.appId);
    } catch (e) {
      this.logger.warn(e, 'Received invalid JSON syntax in clickstream.');
    }
  }
};
