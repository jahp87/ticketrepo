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
import {CategoriaPrecioEvento} from '../models';
import {CategoriaPrecioEventoRepository} from '../repositories';

export class CategoriaPrecioEventoController {
  constructor(
    @repository(CategoriaPrecioEventoRepository)
    public categoriaPrecioEventoRepository: CategoriaPrecioEventoRepository,
  ) { }

  @post('/api/categoriaprecioeventos')
  @response(200, {
    description: 'CategoriaPrecioEvento model instance',
    content: {'application/json': {schema: getModelSchemaRef(CategoriaPrecioEvento)}},
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CategoriaPrecioEvento, {
            title: 'NewCategoriaPrecioEvento',
            exclude: ['id'],
          }),
        },
      },
    })
    categoriaPrecioEvento: Omit<CategoriaPrecioEvento, 'id'>,
  ): Promise<CategoriaPrecioEvento> {
    return this.categoriaPrecioEventoRepository.create(categoriaPrecioEvento);
  }

  @get('/api/categoriaprecioeventos/count')
  @response(200, {
    description: 'CategoriaPrecioEvento model count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async count(
    @param.where(CategoriaPrecioEvento) where?: Where<CategoriaPrecioEvento>,
  ): Promise<Count> {
    return this.categoriaPrecioEventoRepository.count(where);
  }

  @get('/api/categoriaprecioeventos')
  @response(200, {
    description: 'Array of CategoriaPrecioEvento model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CategoriaPrecioEvento, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async find(
    @param.filter(CategoriaPrecioEvento) filter?: Filter<CategoriaPrecioEvento>,
  ): Promise<CategoriaPrecioEvento[]> {
    return this.categoriaPrecioEventoRepository.find(filter);
  }

  @patch('/api/categoriaprecioeventos')
  @response(200, {
    description: 'CategoriaPrecioEvento PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CategoriaPrecioEvento, {partial: true}),
        },
      },
    })
    categoriaPrecioEvento: CategoriaPrecioEvento,
    @param.where(CategoriaPrecioEvento) where?: Where<CategoriaPrecioEvento>,
  ): Promise<Count> {
    return this.categoriaPrecioEventoRepository.updateAll(categoriaPrecioEvento, where);
  }

  @get('/api/categoriaprecioeventos/{id}')
  @response(200, {
    description: 'CategoriaPrecioEvento model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CategoriaPrecioEvento, {includeRelations: true}),
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CategoriaPrecioEvento, {exclude: 'where'}) filter?: FilterExcludingWhere<CategoriaPrecioEvento>
  ): Promise<CategoriaPrecioEvento> {
    return this.categoriaPrecioEventoRepository.findById(id, filter);
  }

  @patch('/api/categoriaprecioeventos/{id}')
  @response(204, {
    description: 'CategoriaPrecioEvento PATCH success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CategoriaPrecioEvento, {partial: true}),
        },
      },
    })
    categoriaPrecioEvento: CategoriaPrecioEvento,
  ): Promise<void> {
    await this.categoriaPrecioEventoRepository.updateById(id, categoriaPrecioEvento);
  }

  @put('/api/categoriaprecioeventos/{id}')
  @response(204, {
    description: 'CategoriaPrecioEvento PUT success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() categoriaPrecioEvento: CategoriaPrecioEvento,
  ): Promise<void> {
    await this.categoriaPrecioEventoRepository.replaceById(id, categoriaPrecioEvento);
  }

  @del('/api/categoriaprecioeventos/{id}')
  @response(204, {
    description: 'CategoriaPrecioEvento DELETE success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.categoriaPrecioEventoRepository.deleteById(id);
  }
}
