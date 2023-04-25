import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {FormaPagoEvento, FormaPagoEventoRelations, Evento, FormaPago} from '../models';
import {EventoRepository} from './evento.repository';
import {FormaPagoRepository} from './forma-pago.repository';

export class FormaPagoEventoRepository extends DefaultCrudRepository<
  FormaPagoEvento,
  typeof FormaPagoEvento.prototype.id,
  FormaPagoEventoRelations
> {

  public readonly evento: BelongsToAccessor<Evento, typeof FormaPagoEvento.prototype.id>;

  public readonly formaPago: BelongsToAccessor<FormaPago, typeof FormaPagoEvento.prototype.id>;

  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource, @repository.getter('EventoRepository') protected eventoRepositoryGetter: Getter<EventoRepository>, @repository.getter('FormaPagoRepository') protected formaPagoRepositoryGetter: Getter<FormaPagoRepository>,
  ) {
    super(FormaPagoEvento, dataSource);
    this.formaPago = this.createBelongsToAccessorFor('formaPago', formaPagoRepositoryGetter,);
    this.registerInclusionResolver('formaPago', this.formaPago.inclusionResolver);
    this.evento = this.createBelongsToAccessorFor('evento', eventoRepositoryGetter,);
    this.registerInclusionResolver('evento', this.evento.inclusionResolver);
  }
}
