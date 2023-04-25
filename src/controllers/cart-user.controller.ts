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
  Cart,
  User
} from '../models';
import {CartRepository} from '../repositories';

export class CartUserController {
  constructor(
    @repository(CartRepository)
    public cartRepository: CartRepository,
  ) { }

  @get('/api/carts/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Cart',
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
    @param.path.string('id') id: typeof Cart.prototype.id,
  ): Promise<User> {
    return this.cartRepository.user(id);
  }
}
