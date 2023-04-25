import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {TipoCategoriaPrecio, TipoCategoriaPrecioRelations} from '../models';

export class TipoCategoriaPrecioRepository extends DefaultCrudRepository<
  TipoCategoriaPrecio,
  typeof TipoCategoriaPrecio.prototype.id,
  TipoCategoriaPrecioRelations
> {
  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource,
  ) {
    super(TipoCategoriaPrecio, dataSource);
  }
}
