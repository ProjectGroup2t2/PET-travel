'use strict';

/**
 * history-package service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::history-package.history-package');
