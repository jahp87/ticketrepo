import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {Espectador, EspectadorRelations} from '../models';

export class EspectadorRepository extends DefaultCrudRepository<
  Espectador,
  typeof Espectador.prototype.nombre,
  EspectadorRelations
> {
  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource,
  ) {
    super(Espectador, dataSource);
  }
}
