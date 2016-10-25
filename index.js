'use strict';

const TRANSACTION_CODES = ['13', '50', '51', '52', '53', '54', '55', '56', '57'];
const INDICATOR = ['N', 'W', 'X', 'Y', ' '];
const bsbRegex = /\d{3}\-\d{3}/;

function pad(char, right, input, n) {
  let str = input == null ? '' : String(input);

  if (str.length > n) {
    throw new Error(`Value "${str}" is longer than ${n}`);
  }

  while (str.length < n) {
    str = right ? str + char : char + str;
  }

  return str;
}

const leftPad = pad.bind(null, ' ', false);
const rightPad = pad.bind(null, ' ', true);
const zeroPad = pad.bind(null, '0', false);

function formatDate(date) {
  return [
    zeroPad(date.getDate(), 2),
    zeroPad(date.getMonth() + 1, 2),
    zeroPad(date.getYear() % 100, 2)
  ].join('');
}

function formatHeader(header) {
  if (header.fiAbbreviation.length !== 3) throw new Error('Invalid header abbreviation');

  return [
    '0                 ',
    zeroPad(header.reelSequenceNumber, 2),
    header.fiAbbreviation,
    '       ',
    rightPad(header.preferredSpecification, 26),
    zeroPad(header.userIdentification, 6),
    rightPad(header.description, 12),
    formatDate(header.date),
    '                                        \n'
  ].join('');
}

function formatRow(row) {
  const indicator = row.indicator || ' ';

  if (TRANSACTION_CODES.indexOf(row.transactionCode) === -1) throw new Error(`Invalid transactionCode "${row.transactionCode}"`);
  if (INDICATOR.indexOf(indicator) === -1) throw new Error(`Invalid indicator "${indicator}"`);
  if (!bsbRegex.test(row.bsb)) throw new Error(`Invalid bsb "${row.bsb}"`);
  if (!bsbRegex.test(row.traceRecordBsb)) throw new Error(`Invalid traceRecordBsb "${row.traceRecordBsb}"`);

  return [
    '1',
    row.bsb,
    leftPad(row.accountNumber, 9),
    indicator,
    row.transactionCode,
    zeroPad(row.amount, 10),
    rightPad(row.accountTitle, 32),
    rightPad(row.lodgementReference, 18),
    row.traceRecordBsb,
    leftPad(row.traceRecordAccountNumber, 9),
    rightPad(row.remitterName, 16),
    zeroPad(row.withhealdTax, 8),
    '\n'
  ].join('');
}

function formatFooter(rows) {
  const creditTotal = rows.reduce((t, r) => t + (r.transactionCode >= 50 ? r.amount : 0), 0);
  const debitTotal = rows.reduce((t, r) => t + (r.transactionCode < 50 ? r.amount : 0), 0);
  const netTotal = Math.abs(creditTotal - debitTotal);

  return [
    '7999-999            ',
    zeroPad(netTotal, 10),
    zeroPad(creditTotal, 10),
    zeroPad(debitTotal, 10),
    '                        ',
    zeroPad(rows.length, 6),
    '                                        \n'
  ].join('');
}

function abaStringify(header, rows) {
  return rows.reduce((out, r) => out + formatRow(r), formatHeader(header)) + formatFooter(rows);
}

module.exports = abaStringify;
