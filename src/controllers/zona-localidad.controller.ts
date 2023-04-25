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
  Localidad, Zona
} from '../models';
import {ZonaRepository} from '../repositories';

export class ZonaLocalidadController {
  constructor(
    @repository(ZonaRepository)
    public zonaRepository: ZonaRepository,
  ) { }

  @get('/api/zonas/{id}/localidad', {
    responses: {
      '200': {
        description: 'Localidad belonging to Zona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Localidad)},
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
  async getLocalidad(
    @param.path.string('id') id: typeof Zona.prototype.id,
  ): Promise<Localidad> {
    return this.zonaRepository.localidad(id);
  }
}
