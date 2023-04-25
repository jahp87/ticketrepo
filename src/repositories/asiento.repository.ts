import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {Asiento, AsientoRelations, Zona} from '../models';
import {ZonaRepository} from './zona.repository';

export class AsientoRepository extends DefaultCrudRepository<
  Asiento,
  typeof Asiento.prototype.id,
  AsientoRelations
> {

  public readonly zona: BelongsToAccessor<Zona, typeof Asiento.prototype.id>;

  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource, @repository.getter('ZonaRepository') protected zonaRepositoryGetter: Getter<ZonaRepository>,
  ) {
    super(Asiento, dataSource);
    this.zona = this.createBelongsToAccessorFor('zona', zonaRepositoryGetter,);
    this.registerInclusionResolver('zona', this.zona.inclusionResolver);
  }
}
