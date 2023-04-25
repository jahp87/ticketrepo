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
  Localidad, PrecioLocalidad
} from '../models';
import {PrecioLocalidadRepository} from '../repositories';

export class PrecioLocalidadLocalidadController {
  constructor(
    @repository(PrecioLocalidadRepository)
    public precioLocalidadRepository: PrecioLocalidadRepository,
  ) { }

  @get('/api/preciolocalidad/{id}/localidad', {
    responses: {
      '200': {
        description: 'Localidad belonging to PrecioLocalidad',
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
    @param.path.string('id') id: typeof PrecioLocalidad.prototype.id,
  ): Promise<Localidad> {
    return this.precioLocalidadRepository.localidad(id);
  }
}
