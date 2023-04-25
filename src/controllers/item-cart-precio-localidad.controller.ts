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
  PrecioLocalidad
} from '../models';
import {ItemCartRepository} from '../repositories';

export class ItemCartPrecioLocalidadController {
  constructor(
    @repository(ItemCartRepository)
    public itemCartRepository: ItemCartRepository,
  ) { }

  @get('/api/itemcarts/{id}/preciolocalidad', {
    responses: {
      '200': {
        description: 'PrecioLocalidad belonging to ItemCart',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PrecioLocalidad)},
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
  async getPrecioLocalidad(
    @param.path.string('id') id: typeof ItemCart.prototype.id,
  ): Promise<PrecioLocalidad> {
    return this.itemCartRepository.precioLocalidad(id);
  }
}
