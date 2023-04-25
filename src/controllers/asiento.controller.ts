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
import {Asiento} from '../models';
import {AsientoRepository} from '../repositories';

export class AsientoController {
  constructor(
    @repository(AsientoRepository)
    public asientoRepository: AsientoRepository,
  ) { }

  @post('/api/asientos')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Asiento model instance',
    content: {'application/json': {schema: getModelSchemaRef(Asiento)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asiento, {
            title: 'NewAsiento',
            exclude: ['id'],
          }),
        },
      },
    })
    asiento: Omit<Asiento, 'id'>,
  ): Promise<Asiento> {
    return this.asientoRepository.create(asiento);
  }

  @get('/api/asientos/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Asiento model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Asiento) where?: Where<Asiento>,
  ): Promise<Count> {
    return this.asientoRepository.count(where);
  }

  @get('/api/asientos')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of Asiento model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Asiento, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Asiento) filter?: Filter<Asiento>,
  ): Promise<Asiento[]> {
    return this.asientoRepository.find(filter);
  }

  @patch('/api/asientos')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Asiento PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asiento, {partial: true}),
        },
      },
    })
    asiento: Asiento,
    @param.where(Asiento) where?: Where<Asiento>,
  ): Promise<Count> {
    return this.asientoRepository.updateAll(asiento, where);
  }

  @get('/api/asientos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Asiento model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Asiento, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Asiento, {exclude: 'where'}) filter?: FilterExcludingWhere<Asiento>
  ): Promise<Asiento> {
    return this.asientoRepository.findById(id, filter);
  }

  @patch('/api/asientos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Asiento PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asiento, {partial: true}),
        },
      },
    })
    asiento: Asiento,
  ): Promise<void> {
    await this.asientoRepository.updateById(id, asiento);
  }

  @put('/api/asientos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Asiento PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() asiento: Asiento,
  ): Promise<void> {
    await this.asientoRepository.replaceById(id, asiento);
  }

  @del('/api/asientos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Asiento DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.asientoRepository.deleteById(id);
  }
}
