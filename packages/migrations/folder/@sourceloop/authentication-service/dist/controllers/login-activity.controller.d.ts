import { Count, Filter, Where } from '@loopback/repository';
import { LoginActivityRepository } from '../repositories';
import { ResponseObject } from '@loopback/rest';
import { LoginActivity } from '../models';
import { ActiveUsersRange } from '../enums';
import { ActiveUsersGroupData } from '../types';
export declare class LoginActivityController {
    private readonly loginActivityRepo;
    private response;
    constructor(loginActivityRepo: LoginActivityRepository, response: ResponseObject);
    count(where?: Where<LoginActivity>): Promise<Count>;
    find(filter?: Filter<LoginActivity>): Promise<LoginActivity[]>;
    findById(id: string, filter?: Filter<LoginActivity>): Promise<LoginActivity>;
    getActiveUsers(range: ActiveUsersRange, startDate: Date, endDate: Date): Promise<ActiveUsersGroupData>;
}
