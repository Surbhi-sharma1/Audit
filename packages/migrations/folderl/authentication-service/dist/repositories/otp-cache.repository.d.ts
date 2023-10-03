import { DefaultKeyValueRepository, juggler } from '@loopback/repository';
import { OtpCache } from '../models';
export declare class OtpCacheRepository extends DefaultKeyValueRepository<OtpCache> {
    constructor(dataSource: juggler.DataSource);
}
