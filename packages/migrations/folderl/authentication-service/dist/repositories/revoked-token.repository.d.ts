import { DefaultKeyValueRepository, juggler } from '@loopback/repository';
import { RevokedToken } from '../models';
export declare class RevokedTokenRepository extends DefaultKeyValueRepository<RevokedToken> {
    constructor(dataSource: juggler.DataSource);
}
