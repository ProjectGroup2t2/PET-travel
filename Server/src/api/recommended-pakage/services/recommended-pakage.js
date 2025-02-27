'use strict';

/**
 * recommended-pakage service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::recommended-pakage.recommended-pakage');
