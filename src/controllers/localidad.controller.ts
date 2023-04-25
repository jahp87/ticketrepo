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
import {Localidad} from '../models';
import {LocalidadRepository} from '../repositories';

export class LocalidadController {
  constructor(
    @repository(LocalidadRepository)
    public localidadRepository: LocalidadRepository,
  ) { }

  @post('/api/localidad')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Localidad model instance',
    content: {'application/json': {schema: getModelSchemaRef(Localidad)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Localidad, {
            title: 'NewLocalidad',
            exclude: ['id'],
          }),
        },
      },
    })
    localidad: Omit<Localidad, 'id'>,
  ): Promise<Localidad> {
    return this.localidadRepository.create(localidad);
  }

  @get('/api/localidad/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Localidad model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Localidad) where?: Where<Localidad>,
  ): Promise<Count> {
    return this.localidadRepository.count(where);
  }

  @get('/api/localidad')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of Localidad model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Localidad, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Localidad) filter?: Filter<Localidad>,
  ): Promise<Localidad[]> {
    return this.localidadRepository.find(filter);
  }

  @patch('/api/localidad')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Localidad PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Localidad, {partial: true}),
        },
      },
    })
    localidad: Localidad,
    @param.where(Localidad) where?: Where<Localidad>,
  ): Promise<Count> {
    return this.localidadRepository.updateAll(localidad, where);
  }

  @get('/api/localidad/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Localidad model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Localidad, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Localidad, {exclude: 'where'}) filter?: FilterExcludingWhere<Localidad>
  ): Promise<Localidad> {
    return this.localidadRepository.findById(id, filter);
  }

  @patch('/api/localidad/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Localidad PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Localidad, {partial: true}),
        },
      },
    })
    localidad: Localidad,
  ): Promise<void> {
    await this.localidadRepository.updateById(id, localidad);
  }

  @put('/api/localidad/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Localidad PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() localidad: Localidad,
  ): Promise<void> {
    await this.localidadRepository.replaceById(id, localidad);
  }

  @del('/api/localidad/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Localidad DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.localidadRepository.deleteById(id);
  }
}
