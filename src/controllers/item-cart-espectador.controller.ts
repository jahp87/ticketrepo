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
  Espectador, ItemCart
} from '../models';
import {ItemCartRepository} from '../repositories';

export class ItemCartEspectadorController {
  constructor(
    @repository(ItemCartRepository)
    public itemCartRepository: ItemCartRepository,
  ) { }

  @get('/api/itemcarts/{id}/espectador', {
    responses: {
      '200': {
        description: 'Espectador belonging to ItemCart',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Espectador)},
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
  async getEspectador(
    @param.path.string('id') id: typeof ItemCart.prototype.id,
  ): Promise<Espectador> {
    return this.itemCartRepository.espectador(id);
  }
}
