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
  ItemCart,
  TipoItem
} from '../models';
import {ItemCartRepository} from '../repositories';

export class ItemCartTipoItemController {
  constructor(
    @repository(ItemCartRepository)
    public itemCartRepository: ItemCartRepository,
  ) { }

  @get('/api/itemcarts/{id}/tipoitem', {
    responses: {
      '200': {
        description: 'TipoItem belonging to ItemCart',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoItem)},
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
  async getTipoItem(
    @param.path.string('id') id: typeof ItemCart.prototype.id,
  ): Promise<TipoItem> {
    return this.itemCartRepository.tipoItem(id);
  }
}
