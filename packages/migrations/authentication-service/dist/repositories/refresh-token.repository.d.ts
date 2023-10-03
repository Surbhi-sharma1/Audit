import { DefaultKeyValueRepository, juggler } from '@loopback/repository';
import { RefreshToken } from '../models';
export declare class RefreshTokenRepository extends DefaultKeyValueRepository<RefreshToken> {
    constructor(dataSource: juggler.DataSource);
}
