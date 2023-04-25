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
import {TipoCargoPorServicio} from '../models';
import {TipoCargoPorServicioRepository} from '../repositories';

export class TipoCargoPorServicioController {
  constructor(
    @repository(TipoCargoPorServicioRepository)
    public tipoCargoPorServicioRepository: TipoCargoPorServicioRepository,
  ) { }

  @post('/api/tipocargoporservicios')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'TipoCargoPorServicio model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoCargoPorServicio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoCargoPorServicio, {
            title: 'NewTipoCargoPorServicio',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoCargoPorServicio: Omit<TipoCargoPorServicio, 'id'>,
  ): Promise<TipoCargoPorServicio> {
    return this.tipoCargoPorServicioRepository.create(tipoCargoPorServicio);
  }

  @get('/api/tipocargoporservicios/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'TipoCargoPorServicio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoCargoPorServicio) where?: Where<TipoCargoPorServicio>,
  ): Promise<Count> {
    return this.tipoCargoPorServicioRepository.count(where);
  }

  @get('/api/tipocargoporservicios')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of TipoCargoPorServicio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoCargoPorServicio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoCargoPorServicio) filter?: Filter<TipoCargoPorServicio>,
  ): Promise<TipoCargoPorServicio[]> {
    return this.tipoCargoPorServicioRepository.find(filter);
  }

  @patch('/api/tipocargoporservicios')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'TipoCargoPorServicio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoCargoPorServicio, {partial: true}),
        },
      },
    })
    tipoCargoPorServicio: TipoCargoPorServicio,
    @param.where(TipoCargoPorServicio) where?: Where<TipoCargoPorServicio>,
  ): Promise<Count> {
    return this.tipoCargoPorServicioRepository.updateAll(tipoCargoPorServicio, where);
  }

  @get('/api/tipocargoporservicios/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'TipoCargoPorServicio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoCargoPorServicio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TipoCargoPorServicio, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoCargoPorServicio>
  ): Promise<TipoCargoPorServicio> {
    return this.tipoCargoPorServicioRepository.findById(id, filter);
  }

  @patch('/api/tipocargoporservicios/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'TipoCargoPorServicio PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoCargoPorServicio, {partial: true}),
        },
      },
    })
    tipoCargoPorServicio: TipoCargoPorServicio,
  ): Promise<void> {
    await this.tipoCargoPorServicioRepository.updateById(id, tipoCargoPorServicio);
  }

  @put('/api/tipocargoporservicios/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'TipoCargoPorServicio PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tipoCargoPorServicio: TipoCargoPorServicio,
  ): Promise<void> {
    await this.tipoCargoPorServicioRepository.replaceById(id, tipoCargoPorServicio);
  }

  @del('/api/tipocargoporservicios/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'TipoCargoPorServicio DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tipoCargoPorServicioRepository.deleteById(id);
  }
}
