import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {Zona, ZonaRelations, Localidad} from '../models';
import {LocalidadRepository} from './localidad.repository';

export class ZonaRepository extends DefaultCrudRepository<
  Zona,
  typeof Zona.prototype.id,
  ZonaRelations
> {

  public readonly localidad: BelongsToAccessor<Localidad, typeof Zona.prototype.id>;

  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource, @repository.getter('LocalidadRepository') protected localidadRepositoryGetter: Getter<LocalidadRepository>,
  ) {
    super(Zona, dataSource);
    this.localidad = this.createBelongsToAccessorFor('localidad', localidadRepositoryGetter,);
    this.registerInclusionResolver('localidad', this.localidad.inclusionResolver);
  }
}
