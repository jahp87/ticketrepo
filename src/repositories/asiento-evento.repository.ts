import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {Asiento, AsientoEvento, AsientoEventoRelations, Evento} from '../models';
import {AsientoRepository} from './asiento.repository';
import {EstadoAsientoEventoRepository} from './estado-asiento-evento.repository';
import {EventoRepository} from './evento.repository';

export class AsientoEventoRepository extends DefaultCrudRepository<
  AsientoEvento,
  typeof AsientoEvento.prototype.id,
  AsientoEventoRelations
> {

  public readonly asiento: BelongsToAccessor<Asiento, typeof AsientoEvento.prototype.id>;

  public readonly evento: BelongsToAccessor<Evento, typeof AsientoEvento.prototype.id>;



  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource, @repository.getter('AsientoRepository') protected asientoRepositoryGetter: Getter<AsientoRepository>, @repository.getter('EventoRepository') protected eventoRepositoryGetter: Getter<EventoRepository>, @repository.getter('EstadoAsientoEventoRepository') protected estadoAsientoEventoRepositoryGetter: Getter<EstadoAsientoEventoRepository>,
  ) {
    super(AsientoEvento, dataSource);
    this.evento = this.createBelongsToAccessorFor('evento', eventoRepositoryGetter,);
    this.registerInclusionResolver('evento', this.evento.inclusionResolver);
    this.asiento = this.createBelongsToAccessorFor('asiento', asientoRepositoryGetter,);
    this.registerInclusionResolver('asiento', this.asiento.inclusionResolver);
  }
}
