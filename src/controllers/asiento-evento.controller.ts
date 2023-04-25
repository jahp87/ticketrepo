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
import {AsientoEvento} from '../models';
import {AsientoEventoRepository} from '../repositories';

export class AsientoEventoController {
  constructor(
    @repository(AsientoEventoRepository)
    public asientoEventoRepository: AsientoEventoRepository,
  ) { }

  @post('/api/asientoeventos')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'AsientoEvento model instance',
    content: {'application/json': {schema: getModelSchemaRef(AsientoEvento)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsientoEvento, {
            title: 'NewAsientoEvento',
            exclude: ['id'],
          }),
        },
      },
    })
    asientoEvento: Omit<AsientoEvento, 'id'>,
  ): Promise<AsientoEvento> {
    return this.asientoEventoRepository.create(asientoEvento);
  }

  @get('/api/asientoeventos/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'AsientoEvento model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AsientoEvento) where?: Where<AsientoEvento>,
  ): Promise<Count> {
    return this.asientoEventoRepository.count(where);
  }

  @get('/api/asientoeventos')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of AsientoEvento model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AsientoEvento, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AsientoEvento) filter?: Filter<AsientoEvento>,
  ): Promise<AsientoEvento[]> {
    return this.asientoEventoRepository.find(filter);
  }

  @patch('/api/asientoeventos')
  @response(200, {
    description: 'AsientoEvento PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsientoEvento, {partial: true}),
        },
      },
    })
    asientoEvento: AsientoEvento,
    @param.where(AsientoEvento) where?: Where<AsientoEvento>,
  ): Promise<Count> {
    return this.asientoEventoRepository.updateAll(asientoEvento, where);
  }

  @get('/api/asientoeventos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'AsientoEvento model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AsientoEvento, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(AsientoEvento, {exclude: 'where'}) filter?: FilterExcludingWhere<AsientoEvento>
  ): Promise<AsientoEvento> {
    return this.asientoEventoRepository.findById(id, filter);
  }

  @patch('/api/asientoeventos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'AsientoEvento PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsientoEvento, {partial: true}),
        },
      },
    })
    asientoEvento: AsientoEvento,
  ): Promise<void> {
    await this.asientoEventoRepository.updateById(id, asientoEvento);
  }

  @put('/api/asientoeventos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'AsientoEvento PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() asientoEvento: AsientoEvento,
  ): Promise<void> {
    await this.asientoEventoRepository.replaceById(id, asientoEvento);
  }

  @del('/api/asientoeventos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'AsientoEvento DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.asientoEventoRepository.deleteById(id);
  }
}
