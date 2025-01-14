/*
 * Copyright 2020 American Express Travel Related Services Company, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
"use strict";
const httpclient = require('../client/http-client');
const config = require('../config');
const utils = require('../utils');
const querystring = require('querystring');

/**
 * OAuth BearerToken implementation
 */
function getBearerToken() {
  const apiKey = config.authentication.clientKey;
  const apiSecret = config.authentication.clientSecret;
  const baseString = 'Basic ' + Buffer.from(apiKey + ':' + apiSecret).toString('base64');
  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
    Authorization: baseString
  };

  const form = {
    'grant_type': 'client_credentials'
  };
  return httpclient.callService('/apiplatform/v1/oauth/token_provisioning/bearer_tokens', 'POST', utils.createHeaders(headers), querystring.stringify(form))
}

module.exports = {
  getBearerToken
}