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
  Boleto,
  User
} from '../models';
import {BoletoRepository} from '../repositories';

export class BoletoUserController {
  constructor(
    @repository(BoletoRepository)
    public boletoRepository: BoletoRepository,
  ) { }

  @get('/api/boletos/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Boleto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
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
  async getUser(
    @param.path.string('id') id: typeof Boleto.prototype.id,
  ): Promise<User> {
    return this.boletoRepository.user(id);
  }
}
