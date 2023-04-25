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
import {TipoEntrada} from '../models';
import {TipoEntradaRepository} from '../repositories';

export class TipoEntradaController {
  constructor(
    @repository(TipoEntradaRepository)
    public tipoEntradaRepository: TipoEntradaRepository,
  ) { }

  @post('/api/tipoentradas')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'TipoEntrada model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoEntrada)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoEntrada, {
            title: 'NewTipoEntrada',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoEntrada: Omit<TipoEntrada, 'id'>,
  ): Promise<TipoEntrada> {
    return this.tipoEntradaRepository.create(tipoEntrada);
  }

  @get('/api/tipoentradas/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'TipoEntrada model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoEntrada) where?: Where<TipoEntrada>,
  ): Promise<Count> {
    return this.tipoEntradaRepository.count(where);
  }

  @get('/api/tipoentradas')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of TipoEntrada model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoEntrada, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoEntrada) filter?: Filter<TipoEntrada>,
  ): Promise<TipoEntrada[]> {
    return this.tipoEntradaRepository.find(filter);
  }

  @patch('/api/tipoentradas')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'TipoEntrada PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoEntrada, {partial: true}),
        },
      },
    })
    tipoEntrada: TipoEntrada,
    @param.where(TipoEntrada) where?: Where<TipoEntrada>,
  ): Promise<Count> {
    return this.tipoEntradaRepository.updateAll(tipoEntrada, where);
  }

  @get('/api/tipoentradas/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'TipoEntrada model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoEntrada, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TipoEntrada, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoEntrada>
  ): Promise<TipoEntrada> {
    return this.tipoEntradaRepository.findById(id, filter);
  }

  @patch('/api/tipoentradas/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'TipoEntrada PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoEntrada, {partial: true}),
        },
      },
    })
    tipoEntrada: TipoEntrada,
  ): Promise<void> {
    await this.tipoEntradaRepository.updateById(id, tipoEntrada);
  }

  @put('/api/tipoentradas/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'TipoEntrada PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tipoEntrada: TipoEntrada,
  ): Promise<void> {
    await this.tipoEntradaRepository.replaceById(id, tipoEntrada);
  }

  @del('/api/tipoentradas/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'TipoEntrada DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tipoEntradaRepository.deleteById(id);
  }
}
