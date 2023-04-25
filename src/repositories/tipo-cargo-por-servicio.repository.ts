import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {TipoCargoPorServicio, TipoCargoPorServicioRelations} from '../models';

export class TipoCargoPorServicioRepository extends DefaultCrudRepository<
  TipoCargoPorServicio,
  typeof TipoCargoPorServicio.prototype.id,
  TipoCargoPorServicioRelations
> {
  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource,
  ) {
    super(TipoCargoPorServicio, dataSource);
  }
}
