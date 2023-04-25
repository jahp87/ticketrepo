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
  AsientoEvento,
  Evento
} from '../models';
import {AsientoEventoRepository} from '../repositories';

export class AsientoEventoEventoController {
  constructor(
    @repository(AsientoEventoRepository)
    public asientoEventoRepository: AsientoEventoRepository,
  ) { }

  @get('/api/asientoeventos/{id}/evento', {
    responses: {
      '200': {
        description: 'Evento belonging to AsientoEvento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Evento)},
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
  async getEvento(
    @param.path.string('id') id: typeof AsientoEvento.prototype.id,
  ): Promise<Evento> {
    return this.asientoEventoRepository.evento(id);
  }
}
