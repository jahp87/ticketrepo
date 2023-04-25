import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {PrecioLocalidad, PrecioLocalidadRelations, Localidad} from '../models';
import {LocalidadRepository} from './localidad.repository';

export class PrecioLocalidadRepository extends DefaultCrudRepository<
  PrecioLocalidad,
  typeof PrecioLocalidad.prototype.id,
  PrecioLocalidadRelations
> {

  public readonly localidad: BelongsToAccessor<Localidad, typeof PrecioLocalidad.prototype.id>;

  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource, @repository.getter('LocalidadRepository') protected localidadRepositoryGetter: Getter<LocalidadRepository>,
  ) {
    super(PrecioLocalidad, dataSource);
    this.localidad = this.createBelongsToAccessorFor('localidad', localidadRepositoryGetter,);
    this.registerInclusionResolver('localidad', this.localidad.inclusionResolver);
  }
}
