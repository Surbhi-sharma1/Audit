import { DefaultKeyValueRepository, juggler } from '@loopback/repository';
import { Otp } from '../models';
export declare class OtpRepository extends DefaultKeyValueRepository<Otp> {
    constructor(dataSource: juggler.DataSource);
}
