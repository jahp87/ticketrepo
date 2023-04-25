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
  Asiento, AsientoEvento
} from '../models';
import {AsientoEventoRepository} from '../repositories';

export class AsientoEventoAsientoController {
  constructor(
    @repository(AsientoEventoRepository)
    public asientoEventoRepository: AsientoEventoRepository,
  ) { }

  @get('/api/asientoeventos/{id}/asiento', {
    responses: {
      '200': {
        description: 'Asiento belonging to AsientoEvento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asiento)},
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
  async getAsiento(
    @param.path.string('id') id: typeof AsientoEvento.prototype.id,
  ): Promise<Asiento> {
    return this.asientoEventoRepository.asiento(id);
  }
}
