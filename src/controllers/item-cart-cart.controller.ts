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
  Cart, ItemCart
} from '../models';
import {ItemCartRepository} from '../repositories';

export class ItemCartCartController {
  constructor(
    @repository(ItemCartRepository)
    public itemCartRepository: ItemCartRepository,
  ) { }

  @get('/api/itemcarts/{id}/cart', {
    responses: {
      '200': {
        description: 'Cart belonging to ItemCart',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cart)},
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
  async getCart(
    @param.path.string('id') id: typeof ItemCart.prototype.id,
  ): Promise<Cart> {
    return this.itemCartRepository.cart(id);
  }
}
