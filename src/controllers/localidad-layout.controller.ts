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
  Layout, Localidad
} from '../models';
import {LocalidadRepository} from '../repositories';

export class LocalidadLayoutController {
  constructor(
    @repository(LocalidadRepository)
    public localidadRepository: LocalidadRepository,
  ) { }

  @get('/api/localidad/{id}/layout', {
    responses: {
      '200': {
        description: 'Layout belonging to Localidad',
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
    @param.path.string('id') id: typeof Localidad.prototype.id,
  ): Promise<Layout> {
    return this.localidadRepository.layout(id);
  }
}
