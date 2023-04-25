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
import {Espectador} from '../models';
import {EspectadorRepository} from '../repositories';

export class EspectadorController {
  constructor(
    @repository(EspectadorRepository)
    public espectadorRepository: EspectadorRepository,
  ) { }

  @post('/api/espectadors')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Espectador model instance',
    content: {'application/json': {schema: getModelSchemaRef(Espectador)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Espectador, {
            title: 'NewEspectador',
            exclude: ['id'],
          }),
        },
      },
    })
    espectador: Omit<Espectador, 'id'>,
  ): Promise<Espectador> {
    return this.espectadorRepository.create(espectador);
  }

  @get('/api/espectadors/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Espectador model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Espectador) where?: Where<Espectador>,
  ): Promise<Count> {
    return this.espectadorRepository.count(where);
  }

  @get('/api/espectadors')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of Espectador model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Espectador, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Espectador) filter?: Filter<Espectador>,
  ): Promise<Espectador[]> {
    return this.espectadorRepository.find(filter);
  }

  @patch('/api/espectadors')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Espectador PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Espectador, {partial: true}),
        },
      },
    })
    espectador: Espectador,
    @param.where(Espectador) where?: Where<Espectador>,
  ): Promise<Count> {
    return this.espectadorRepository.updateAll(espectador, where);
  }

  @get('/api/espectadors/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Espectador model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Espectador, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Espectador, {exclude: 'where'}) filter?: FilterExcludingWhere<Espectador>
  ): Promise<Espectador> {
    return this.espectadorRepository.findById(id, filter);
  }

  @patch('/api/espectadors/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Espectador PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Espectador, {partial: true}),
        },
      },
    })
    espectador: Espectador,
  ): Promise<void> {
    await this.espectadorRepository.updateById(id, espectador);
  }

  @put('/api/espectadors/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Espectador PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() espectador: Espectador,
  ): Promise<void> {
    await this.espectadorRepository.replaceById(id, espectador);
  }

  @del('/api/espectadors/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Espectador DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.espectadorRepository.deleteById(id);
  }
}
