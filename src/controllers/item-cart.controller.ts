import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {basicAuthorization} from '../middlewares/auth.midd';
import {ItemCart} from '../models';
import {ItemCartRepository} from '../repositories';

export class ItemCartController {
  constructor(
    @repository(ItemCartRepository)
    public itemCartRepository: ItemCartRepository,
  ) { }

  @post('/api/itemcarts')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'ItemCart model instance',
    content: {'application/json': {schema: getModelSchemaRef(ItemCart)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemCart, {
            title: 'NewItemCart',
            exclude: ['id'],
          }),
        },
      },
    })
    itemCart: Omit<ItemCart, 'id'>,
  ): Promise<ItemCart> {
    return this.itemCartRepository.create(itemCart);
  }

  @get('/api/itemcarts/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'ItemCart model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ItemCart) where?: Where<ItemCart>,
  ): Promise<Count> {
    return this.itemCartRepository.count(where);
  }

  @get('/api/itemcarts')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of ItemCart model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ItemCart, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ItemCart) filter?: Filter<ItemCart>,
  ): Promise<ItemCart[]> {
    return this.itemCartRepository.find(filter);
  }

  @patch('/api/itemcarts')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'ItemCart PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemCart, {partial: true}),
        },
      },
    })
    itemCart: ItemCart,
    @param.where(ItemCart) where?: Where<ItemCart>,
  ): Promise<Count> {
    return this.itemCartRepository.updateAll(itemCart, where);
  }

  @get('/api/itemcarts/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'ItemCart model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ItemCart, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ItemCart, {exclude: 'where'}) filter?: FilterExcludingWhere<ItemCart>
  ): Promise<ItemCart> {
    return this.itemCartRepository.findById(id, filter);
  }

  @patch('/api/itemcarts/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'ItemCart PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemCart, {partial: true}),
        },
      },
    })
    itemCart: ItemCart,
  ): Promise<void> {
    await this.itemCartRepository.updateById(id, itemCart);
  }

  @put('/api/itemcarts/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'ItemCart PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() itemCart: ItemCart,
  ): Promise<void> {
    await this.itemCartRepository.replaceById(id, itemCart);
  }

  @del('/api/itemcarts/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'ItemCart DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.itemCartRepository.deleteById(id);
  }
}
