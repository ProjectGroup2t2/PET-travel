'use strict';

/**
 * history-package router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::history-package.history-package');
