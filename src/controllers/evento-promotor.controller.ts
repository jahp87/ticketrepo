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
  Evento,
  Promotor
} from '../models';
import {EventoRepository} from '../repositories';

export class EventoPromotorController {
  constructor(
    @repository(EventoRepository)
    public eventoRepository: EventoRepository,
  ) { }

  @get('/api/eventos/{id}/promotor', {
    responses: {
      '200': {
        description: 'Promotor belonging to Evento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Promotor)},
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
  async getPromotor(
    @param.path.string('id') id: typeof Evento.prototype.id,
  ): Promise<Promotor> {
    return this.eventoRepository.promotor(id);
  }
}
