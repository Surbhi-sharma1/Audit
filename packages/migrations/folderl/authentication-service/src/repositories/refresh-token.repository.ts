﻿// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import {inject} from '@loopback/core';
import {DefaultKeyValueRepository, juggler} from '@loopback/repository';

import {RefreshToken} from '../models';
import {AuthCacheSourceName} from '../types';

export class RefreshTokenRepository extends DefaultKeyValueRepository<RefreshToken> {
  constructor(
    @inject(`datasources.${AuthCacheSourceName}`)
    dataSource: juggler.DataSource,
  ) {
    super(RefreshToken, dataSource);
  }
}
