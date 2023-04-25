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
  Layout
} from '../models';
import {EventoRepository} from '../repositories';

export class EventoLayoutController {
  constructor(
    @repository(EventoRepository)
    public eventoRepository: EventoRepository,
  ) { }

  @get('/api/eventos/{id}/layout', {
    responses: {
      '200': {
        description: 'Layout belonging to Evento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Layout)},
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
  async getLayout(
    @param.path.string('id') id: typeof Evento.prototype.id,
  ): Promise<Layout> {
    return this.eventoRepository.layout(id);
  }
}
