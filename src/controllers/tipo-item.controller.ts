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
import {TipoItem} from '../models';
import {TipoItemRepository} from '../repositories';

export class TipoItemController {
  constructor(
    @repository(TipoItemRepository)
    public tipoItemRepository: TipoItemRepository,
  ) { }

  @post('/api/tipotitems')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'TipoItem model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoItem)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoItem, {
            title: 'NewTipoItem',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoItem: Omit<TipoItem, 'id'>,
  ): Promise<TipoItem> {
    return this.tipoItemRepository.create(tipoItem);
  }

  @get('/api/tipotitems/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'TipoItem model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoItem) where?: Where<TipoItem>,
  ): Promise<Count> {
    return this.tipoItemRepository.count(where);
  }

  @get('/api/tipotitems')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of TipoItem model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoItem, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoItem) filter?: Filter<TipoItem>,
  ): Promise<TipoItem[]> {
    return this.tipoItemRepository.find(filter);
  }

  @patch('/api/tipotitems')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'TipoItem PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoItem, {partial: true}),
        },
      },
    })
    tipoItem: TipoItem,
    @param.where(TipoItem) where?: Where<TipoItem>,
  ): Promise<Count> {
    return this.tipoItemRepository.updateAll(tipoItem, where);
  }

  @get('/api/tipotitems/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'TipoItem model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoItem, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TipoItem, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoItem>
  ): Promise<TipoItem> {
    return this.tipoItemRepository.findById(id, filter);
  }

  @patch('/api/tipotitems/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'TipoItem PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoItem, {partial: true}),
        },
      },
    })
    tipoItem: TipoItem,
  ): Promise<void> {
    await this.tipoItemRepository.updateById(id, tipoItem);
  }

  @put('/api/tipotitems/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'TipoItem PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tipoItem: TipoItem,
  ): Promise<void> {
    await this.tipoItemRepository.replaceById(id, tipoItem);
  }

  @del('/api/tipotitems/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'TipoItem DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tipoItemRepository.deleteById(id);
  }
}
