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
  Asiento,
  Zona
} from '../models';
import {AsientoRepository} from '../repositories';

export class AsientoZonaController {
  constructor(
    @repository(AsientoRepository)
    public asientoRepository: AsientoRepository,
  ) { }

  @get('/api/asientos/{id}/zona', {
    responses: {
      '200': {
        description: 'Zona belonging to Asiento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Zona)},
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
  async getZona(
    @param.path.string('id') id: typeof Asiento.prototype.id,
  ): Promise<Zona> {
    return this.asientoRepository.zona(id);
  }
}
