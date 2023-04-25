import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {basicAuthorization} from '../middlewares/auth.midd';
import {
  Boleto, Ticket
} from '../models';
import {TicketRepository} from '../repositories';

export class TicketBoletoController {
  constructor(
    @repository(TicketRepository)
    public ticketRepository: TicketRepository,
  ) { }

  @get('/api/tickets/{id}/boleto', {
    responses: {
      '200': {
        description: 'Boleto belonging to Ticket',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Boleto)},
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async getBoleto(
    @param.path.string('id') id: typeof Ticket.prototype.id,
  ): Promise<Boleto> {
    return this.ticketRepository.boleto(id);
  }
}
