import RecordProcessor from '@astronomerio/astronomer-kinesis-record-processor';

export default class Livestream extends RecordProcessor {
  async processRecord(record) {
    const { partitionKey, sequenceNumber, data } = record;

    // data is a byteArray, we need to make it a string and then subsequently a JSON object
    const payload = Buffer.from(data, 'base64').toString('utf8');

    this.logger.info({ event: payload });
  }
};
