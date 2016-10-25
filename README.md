# aba-stringify

format an [ABA](https://www.cemtexaba.com/aba-format) file.

## Install

```
$ npm install aba-stringify
```

## Example

```js
const abaStringify = require('aba-stringify');

const headers = {
  reelSequenceNumber: 1,
  fiAbbreviation: 'BQL',
  preferredSpecification: 'MY NAME',
  userIdentification: '111111',
  description: '1004231633',
  date: new Date('2010-04-23')
};

const rows = [
  {
    bsb: '123-456',
    accountNumber: '157108231',
    indicator: ' ',
    transactionCode: '53',
    amount: 1234,
    accountTitle: 'S R SMITH',
    lodgementReference: 'TEST BATCH',
    traceRecordBsb: '062-000',
    traceRecordAccountNumber: '12223123',
    remitterName: 'MY ACCOUNT',
    withhealdTax: 1200
  },
  {
    bsb: '123-783',
    accountNumber: '12312312',
    indicator: ' ',
    transactionCode: '53',
    amount: 2200,
    accountTitle: 'J K MATTHEWS',
    lodgementReference: 'TEST BATCH',
    traceRecordBsb: '062-000',
    traceRecordAccountNumber: '12223123',
    remitterName: 'MY ACCOUNT',
    withhealdTax: 30
  },
  {
    bsb: '456-789',
    accountNumber: '125123',
    indicator: ' ',
    transactionCode: '53',
    amount: 3123513,
    accountTitle: 'P R JONES',
    lodgementReference: 'TEST BATCH',
    traceRecordBsb: '062-000',
    traceRecordAccountNumber: '12223123',
    remitterName: 'MY ACCOUNT',
    withhealdTax: 0
  },
  {
    bsb: '121-232',
    accountNumber: '11422',
    indicator: ' ',
    transactionCode: '53',
    amount: 2300,
    accountTitle: 'S MASLIN',
    lodgementReference: 'TEST BATCH',
    traceRecordBsb: '062-000',
    traceRecordAccountNumber: '12223123',
    remitterName: 'MY ACCOUNT',
    withhealdTax: 0
  }
];

const abaString = abaStringify(headers, rows);
```

[example output](./fixtures/first.aba)
