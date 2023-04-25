import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {Localidad, LocalidadRelations, Layout, TipoEntrada} from '../models';
import {LayoutRepository} from './layout.repository';
import {TipoEntradaRepository} from './tipo-entrada.repository';

export class LocalidadRepository extends DefaultCrudRepository<
  Localidad,
  typeof Localidad.prototype.id,
  LocalidadRelations
> {

  public readonly layout: BelongsToAccessor<Layout, typeof Localidad.prototype.id>;

  public readonly tipoEntrada: BelongsToAccessor<TipoEntrada, typeof Localidad.prototype.id>;

  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource, @repository.getter('LayoutRepository') protected layoutRepositoryGetter: Getter<LayoutRepository>, @repository.getter('TipoEntradaRepository') protected tipoEntradaRepositoryGetter: Getter<TipoEntradaRepository>,
  ) {
    super(Localidad, dataSource);
    this.tipoEntrada = this.createBelongsToAccessorFor('tipoEntrada', tipoEntradaRepositoryGetter,);
    this.registerInclusionResolver('tipoEntrada', this.tipoEntrada.inclusionResolver);
    this.layout = this.createBelongsToAccessorFor('layout', layoutRepositoryGetter,);
    this.registerInclusionResolver('layout', this.layout.inclusionResolver);
  }
}
