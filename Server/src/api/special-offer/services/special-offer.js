'use strict';

/**
 * special-offer service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::special-offer.special-offer');
