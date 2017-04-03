import RecordProcessor from '@astronomerio/kinesis-consumer';

export default class Livestream extends RecordProcessor {
  async processRecord(record) {
    const { partitionKey, sequenceNumber, data } = record;
    try {
      // data is a byteArray, we need to make it a string and then subsequently a JSON object
      const payload = Buffer.from(data, 'base64').toString('utf8');
      const event = JSON.parse(payload);
      this.logger.info({ appId: event.appId, raw_clickstream_event: JSON.stringify(event) });
    } catch (e) {
      this.logger.warn(e, 'Received invalid JSON syntax in clickstream.');
    }
  }
};
