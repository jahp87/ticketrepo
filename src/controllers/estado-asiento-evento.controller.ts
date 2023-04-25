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
import {EstadoAsientoEvento} from '../models';
import {EstadoAsientoEventoRepository} from '../repositories';

export class EstadoAsientoEventoController {
  constructor(
    @repository(EstadoAsientoEventoRepository)
    public estadoAsientoEventoRepository: EstadoAsientoEventoRepository,
  ) { }

  @post('/api/estadoasientoeventos')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'EstadoAsientoEvento model instance',
    content: {'application/json': {schema: getModelSchemaRef(EstadoAsientoEvento)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoAsientoEvento, {
            title: 'NewEstadoAsientoEvento',
            exclude: ['id'],
          }),
        },
      },
    })
    estadoAsientoEvento: Omit<EstadoAsientoEvento, 'id'>,
  ): Promise<EstadoAsientoEvento> {
    return this.estadoAsientoEventoRepository.create(estadoAsientoEvento);
  }

  @get('/api/estadoasientoeventos/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'EstadoAsientoEvento model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EstadoAsientoEvento) where?: Where<EstadoAsientoEvento>,
  ): Promise<Count> {
    return this.estadoAsientoEventoRepository.count(where);
  }

  @get('/api/estadoasientoeventos')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of EstadoAsientoEvento model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EstadoAsientoEvento, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EstadoAsientoEvento) filter?: Filter<EstadoAsientoEvento>,
  ): Promise<EstadoAsientoEvento[]> {
    return this.estadoAsientoEventoRepository.find(filter);
  }

  @patch('/api/estadoasientoeventos')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'EstadoAsientoEvento PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoAsientoEvento, {partial: true}),
        },
      },
    })
    estadoAsientoEvento: EstadoAsientoEvento,
    @param.where(EstadoAsientoEvento) where?: Where<EstadoAsientoEvento>,
  ): Promise<Count> {
    return this.estadoAsientoEventoRepository.updateAll(estadoAsientoEvento, where);
  }

  @get('/api/estadoasientoeventos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'EstadoAsientoEvento model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EstadoAsientoEvento, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(EstadoAsientoEvento, {exclude: 'where'}) filter?: FilterExcludingWhere<EstadoAsientoEvento>
  ): Promise<EstadoAsientoEvento> {
    return this.estadoAsientoEventoRepository.findById(id, filter);
  }

  @patch('/api/estadoasientoeventos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'EstadoAsientoEvento PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoAsientoEvento, {partial: true}),
        },
      },
    })
    estadoAsientoEvento: EstadoAsientoEvento,
  ): Promise<void> {
    await this.estadoAsientoEventoRepository.updateById(id, estadoAsientoEvento);
  }

  @put('/api/estadoasientoeventos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'EstadoAsientoEvento PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() estadoAsientoEvento: EstadoAsientoEvento,
  ): Promise<void> {
    await this.estadoAsientoEventoRepository.replaceById(id, estadoAsientoEvento);
  }

  @del('/api/estadoasientoeventos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'EstadoAsientoEvento DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.estadoAsientoEventoRepository.deleteById(id);
  }
}
