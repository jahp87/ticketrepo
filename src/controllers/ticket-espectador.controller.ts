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
  Espectador, Ticket
} from '../models';
import {TicketRepository} from '../repositories';

export class TicketEspectadorController {
  constructor(
    @repository(TicketRepository)
    public ticketRepository: TicketRepository,
  ) { }

  @get('/api/tickets/{id}/espectador', {
    responses: {
      '200': {
        description: 'Espectador belonging to Ticket',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Espectador)},
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
  async getEspectador(
    @param.path.string('id') id: typeof Ticket.prototype.id,
  ): Promise<Espectador> {
    return this.ticketRepository.espectador(id);
  }
}
