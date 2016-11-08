const util = require('./util');

exports = module.exports = (invoice) => {
  /* eslint-disable no-param-reassign */
  invoice.prototype.convertToInvoice = function convertToInvoice(id, item, cb) {
    util.makePostRequest(this, 'convert_to_invoice', id, item, cb);
  };
  invoice.prototype.addPayment = function addPayment(id, item, cb) {
    util.makePostRequest(this, 'payments', id, item, cb);
  };
  invoice.prototype.getEDocumentType = function getEDocumentType(id, cb) {
    util.makeGetRequest(this, 'e_document_type', id, cb);
  };
  invoice.prototype.addEInvoice = function addEInvoice(id, item, cb) {
    util.makePostRequest(this, 'e_invoice', id, item, cb);
  };
  invoice.prototype.addEArchive = function addEArchive(id, item, cb) {
    util.makePostRequest(this, 'e_archive', id, item, cb);
  };
  invoice.prototype.getDocumentStatus = function getDocumentStatus(id, cb) {
    util.makeGetRequest(this, 'e_document_status', id, cb);
  };
  /* eslint-enable no-param-reassign */
};
