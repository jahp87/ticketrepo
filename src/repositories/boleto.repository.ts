import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {Boleto, BoletoRelations, Evento, User} from '../models';
import {EventoRepository} from './evento.repository';
import {UserRepository} from './user.repository';

export class BoletoRepository extends DefaultCrudRepository<
  Boleto,
  typeof Boleto.prototype.id,
  BoletoRelations
> {

  public readonly evento: BelongsToAccessor<Evento, typeof Boleto.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof Boleto.prototype.id>;


  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource,
    @repository.getter('EventoRepository') protected eventoRepositoryGetter: Getter<EventoRepository>,
    @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Boleto, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.evento = this.createBelongsToAccessorFor('evento', eventoRepositoryGetter,);
    this.registerInclusionResolver('evento', this.evento.inclusionResolver);
  }
}
