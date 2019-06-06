import PubcidHandler from './pubcidHandler';

/**
 * Create a window level PublisherCommonId object that sets and returns pubcid (aka fpc).
 * @param {Window} w window object
 * @param {Document} d document object
 * @param {object} options Additional options.
 */
export function setupPubcid(w, d, options = {}) {

    const PublisherCommonId = (function() {
        if (typeof w.PublisherCommonId === 'object') {
            return w.PublisherCommonId;
        }
        w.PublisherCommonId = {};
        return w.PublisherCommonId;
    }());

    const _handler = new PubcidHandler(options);
    let _cachedId = '';

    // function to get the id value
    PublisherCommonId.getId = function() {
        return _cachedId;
    };

    PublisherCommonId.init = function(consentData) {
        _handler.updatePubcidWithConsent(consentData);
        _cachedId = _handler.readPubcid();
    };

    PublisherCommonId.createId = function() {
        _handler.createPubcid({force: true});
        _cachedId = _handler.readPubcid();
    };

    PublisherCommonId.deleteId = function() {
        _handler.deletePubcid();
        _cachedId = '';
    };

    if (options.autoinit === undefined || options.autoinit)
        PublisherCommonId.init(options.consentData);
}
