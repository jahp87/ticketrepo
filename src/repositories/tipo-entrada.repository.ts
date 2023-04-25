import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {TipoEntrada, TipoEntradaRelations} from '../models';

export class TipoEntradaRepository extends DefaultCrudRepository<
  TipoEntrada,
  typeof TipoEntrada.prototype.id,
  TipoEntradaRelations
> {
  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource,
  ) {
    super(TipoEntrada, dataSource);
  }
}
