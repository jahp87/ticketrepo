import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {FormaPago, FormaPagoRelations} from '../models';

export class FormaPagoRepository extends DefaultCrudRepository<
  FormaPago,
  typeof FormaPago.prototype.id,
  FormaPagoRelations
> {
  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource,
  ) {
    super(FormaPago, dataSource);
  }
}
