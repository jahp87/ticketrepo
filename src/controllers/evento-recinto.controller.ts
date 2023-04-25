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
  Recinto
} from '../models';
import {EventoRepository} from '../repositories';

export class EventoRecintoController {
  constructor(
    @repository(EventoRepository)
    public eventoRepository: EventoRepository,
  ) { }

  @get('/api/eventos/{id}/recinto', {
    responses: {
      '200': {
        description: 'Recinto belonging to Evento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Recinto)},
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
  async getRecinto(
    @param.path.string('id') id: typeof Evento.prototype.id,
  ): Promise<Recinto> {
    return this.eventoRepository.recinto(id);
  }
}
