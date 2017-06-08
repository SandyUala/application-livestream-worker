const consumer = require('@astronomer/kinesis-consumer');

const Consumer = consumer('livestream-worker');

class Livestream extends Consumer {
  async processRecord(recordInfo) {
    const { record, checkpointer, currentRecord, totalRecords } = recordInfo;
    const { sequenceNumber, data } = record;
    try {
      // data is a byteArray, we need to make it a string and then subsequently a JSON object
      const payload = Buffer.from(data, 'base64').toString('utf8');
      const event = JSON.parse(payload);
      this.logger.info({ appId: event.appId || event.writeKey, raw_clickstream_event: JSON.stringify(event), type: event.type, messageId: event.messageId });
    } catch (e) {
      this.logger.warn(e, 'Received invalid JSON syntax in clickstream.');
    } finally {
      if (currentRecord === totalRecords) {
        await this.checkpoint(checkpointer, sequenceNumber);
        this.logger.info({ event: 'checkpoint', sequenceNumber });
      }
    }
  }
}

module.exports = Livestream;
