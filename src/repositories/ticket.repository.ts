import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {Ticket, TicketRelations, Boleto, Espectador} from '../models';
import {BoletoRepository} from './boleto.repository';
import {EspectadorRepository} from './espectador.repository';

export class TicketRepository extends DefaultCrudRepository<
  Ticket,
  typeof Ticket.prototype.id,
  TicketRelations
> {

  public readonly boleto: BelongsToAccessor<Boleto, typeof Ticket.prototype.id>;

  public readonly espectador: BelongsToAccessor<Espectador, typeof Ticket.prototype.id>;

  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource, @repository.getter('BoletoRepository') protected boletoRepositoryGetter: Getter<BoletoRepository>, @repository.getter('EspectadorRepository') protected espectadorRepositoryGetter: Getter<EspectadorRepository>,
  ) {
    super(Ticket, dataSource);
    this.espectador = this.createBelongsToAccessorFor('espectador', espectadorRepositoryGetter,);
    this.registerInclusionResolver('espectador', this.espectador.inclusionResolver);
    this.boleto = this.createBelongsToAccessorFor('boleto', boletoRepositoryGetter,);
    this.registerInclusionResolver('boleto', this.boleto.inclusionResolver);
  }
}
