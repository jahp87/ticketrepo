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
  AsientoEvento, ItemCart
} from '../models';
import {ItemCartRepository} from '../repositories';

export class ItemCartAsientoEventoController {
  constructor(
    @repository(ItemCartRepository)
    public itemCartRepository: ItemCartRepository,
  ) { }

  @get('/api/itemcarts/{id}/asientoevento', {
    responses: {
      '200': {
        description: 'AsientoEvento belonging to ItemCart',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AsientoEvento)},
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
  async getAsientoEvento(
    @param.path.string('id') id: typeof ItemCart.prototype.id,
  ): Promise<AsientoEvento> {
    return this.itemCartRepository.asientoEvento(id);
  }
}
