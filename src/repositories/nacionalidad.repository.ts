import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {Nacionalidad, NacionalidadRelations} from '../models';

export class NacionalidadRepository extends DefaultCrudRepository<
  Nacionalidad,
  typeof Nacionalidad.prototype.id,
  NacionalidadRelations
> {
  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource,
  ) {
    super(Nacionalidad, dataSource);
  }
}
