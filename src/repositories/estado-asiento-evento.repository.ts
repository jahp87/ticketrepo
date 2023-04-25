import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {EstadoAsientoEvento, EstadoAsientoEventoRelations} from '../models';

export class EstadoAsientoEventoRepository extends DefaultCrudRepository<
  EstadoAsientoEvento,
  typeof EstadoAsientoEvento.prototype.id,
  EstadoAsientoEventoRelations
> {
  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource,
  ) {
    super(EstadoAsientoEvento, dataSource);
  }
}
