import {inject, Getter, Constructor} from '@loopback/core';
import {DefaultCrudRepository, repository} from '@loopback/repository';


import {AuthenticationBindings} from 'loopback4-authentication';
import {AuditRepositoryMixin, IAuditMixinOptions} from '@sourceloop/audit-log';


import { AuditLogRepository } from '@sourceloop/audit-service';
import { ProductDataSource } from '../datasources/product.datasource';
import { Product, ProductRelations } from '../models/product.model';
import { SequelizeCrudRepository, SequelizeDataSource } from '@loopback/sequelize';
import { SequelizeUserModifyCrudRepository } from '@sourceloop/core/sequelize';
import { IAuthUserWithPermissions } from 'loopback4-authorization';
const productAuditOpts: IAuditMixinOptions = {
  actionKey: 'Products_Logs',
};

export class ProductRepository extends SequelizeUserModifyCrudRepository<
Product,
typeof Product.prototype.id
> { 

  constructor(
    @inject('datasources.product') dataSource: SequelizeDataSource,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    public readonly getCurrentUser: Getter<IAuthUserWithPermissions>,
    @repository.getter('AuditLogRepository')
    public getAuditLogRepository: Getter<AuditLogRepository>,) {
    super(Product, dataSource,getCurrentUser);
  }
}