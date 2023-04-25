import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {CategoriaPrecioEvento, CategoriaPrecioEventoRelations, Evento, Localidad, TipoCategoriaPrecio, TipoCargoPorServicio} from '../models';
import {EventoRepository} from './evento.repository';
import {LocalidadRepository} from './localidad.repository';
import {TipoCategoriaPrecioRepository} from './tipo-categoria-precio.repository';
import {TipoCargoPorServicioRepository} from './tipo-cargo-por-servicio.repository';

export class CategoriaPrecioEventoRepository extends DefaultCrudRepository<
  CategoriaPrecioEvento,
  typeof CategoriaPrecioEvento.prototype.id,
  CategoriaPrecioEventoRelations
> {

  public readonly evento: BelongsToAccessor<Evento, typeof CategoriaPrecioEvento.prototype.id>;

  public readonly localidad: BelongsToAccessor<Localidad, typeof CategoriaPrecioEvento.prototype.id>;

  public readonly tipoCategoriaPrecio: BelongsToAccessor<TipoCategoriaPrecio, typeof CategoriaPrecioEvento.prototype.id>;

  public readonly tipoCargoPorServicio: BelongsToAccessor<TipoCargoPorServicio, typeof CategoriaPrecioEvento.prototype.id>;

  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource, @repository.getter('EventoRepository') protected eventoRepositoryGetter: Getter<EventoRepository>, @repository.getter('LocalidadRepository') protected localidadRepositoryGetter: Getter<LocalidadRepository>, @repository.getter('TipoCategoriaPrecioRepository') protected tipoCategoriaPrecioRepositoryGetter: Getter<TipoCategoriaPrecioRepository>, @repository.getter('TipoCargoPorServicioRepository') protected tipoCargoPorServicioRepositoryGetter: Getter<TipoCargoPorServicioRepository>,
  ) {
    super(CategoriaPrecioEvento, dataSource);
    this.tipoCargoPorServicio = this.createBelongsToAccessorFor('tipoCargoPorServicio', tipoCargoPorServicioRepositoryGetter,);
    this.registerInclusionResolver('tipoCargoPorServicio', this.tipoCargoPorServicio.inclusionResolver);
    this.tipoCategoriaPrecio = this.createBelongsToAccessorFor('tipoCategoriaPrecio', tipoCategoriaPrecioRepositoryGetter,);
    this.registerInclusionResolver('tipoCategoriaPrecio', this.tipoCategoriaPrecio.inclusionResolver);
    this.localidad = this.createBelongsToAccessorFor('localidad', localidadRepositoryGetter,);
    this.registerInclusionResolver('localidad', this.localidad.inclusionResolver);
    this.evento = this.createBelongsToAccessorFor('evento', eventoRepositoryGetter,);
    this.registerInclusionResolver('evento', this.evento.inclusionResolver);
  }
}
