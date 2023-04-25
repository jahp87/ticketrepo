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
import {Pais} from '../models';
import {PaisRepository} from '../repositories';

export class PaisController {
  constructor(
    @repository(PaisRepository)
    public paisRepository: PaisRepository,
  ) { }

  @post('/api/pais')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Pais model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pais)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pais, {
            title: 'NewPais',
            exclude: ['id'],
          }),
        },
      },
    })
    pais: Omit<Pais, 'id'>,
  ): Promise<Pais> {
    return this.paisRepository.create(pais);
  }

  @get('/api/pais/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Pais model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pais) where?: Where<Pais>,
  ): Promise<Count> {
    return this.paisRepository.count(where);
  }

  @get('/api/pais')
  @response(200, {
    description: 'Array of Pais model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pais, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pais) filter?: Filter<Pais>,
  ): Promise<Pais[]> {
    return this.paisRepository.find(filter);
  }

  @patch('/api/pais')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Pais PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pais, {partial: true}),
        },
      },
    })
    pais: Pais,
    @param.where(Pais) where?: Where<Pais>,
  ): Promise<Count> {
    return this.paisRepository.updateAll(pais, where);
  }

  @get('/api/pais/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Pais model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pais, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Pais, {exclude: 'where'}) filter?: FilterExcludingWhere<Pais>
  ): Promise<Pais> {
    return this.paisRepository.findById(id, filter);
  }

  @patch('/api/pais/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Pais PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pais, {partial: true}),
        },
      },
    })
    pais: Pais,
  ): Promise<void> {
    await this.paisRepository.updateById(id, pais);
  }

  @put('/api/pais/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Pais PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pais: Pais,
  ): Promise<void> {
    await this.paisRepository.replaceById(id, pais);
  }

  @del('/api/pais/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Pais DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.paisRepository.deleteById(id);
  }
}
