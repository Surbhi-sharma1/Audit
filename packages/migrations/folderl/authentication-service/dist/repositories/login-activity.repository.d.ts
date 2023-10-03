import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { LoginActivity } from '../models';
export declare class LoginActivityRepository extends DefaultCrudRepository<LoginActivity, typeof LoginActivity.prototype.id> {
    constructor(dataSource: juggler.DataSource);
}
