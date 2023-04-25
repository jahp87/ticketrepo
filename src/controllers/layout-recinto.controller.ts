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
  Layout,
  Recinto
} from '../models';
import {LayoutRepository} from '../repositories';

export class LayoutRecintoController {
  constructor(
    @repository(LayoutRepository)
    public layoutRepository: LayoutRepository,
  ) { }

  @get('/api/layouts/{id}/recinto', {
    responses: {
      '200': {
        description: 'Recinto belonging to Layout',
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
    @param.path.string('id') id: typeof Layout.prototype.id,
  ): Promise<Recinto> {
    return this.layoutRepository.recinto(id);
  }
}
