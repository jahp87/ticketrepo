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
import {Nacionalidad} from '../models';
import {NacionalidadRepository} from '../repositories';

export class NacionalidadController {
  constructor(
    @repository(NacionalidadRepository)
    public nacionalidadRepository: NacionalidadRepository,
  ) { }

  @post('/api/nacionalidades')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Nacionalidad model instance',
    content: {'application/json': {schema: getModelSchemaRef(Nacionalidad)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nacionalidad, {
            title: 'NewNacionalidad',
            exclude: ['id'],
          }),
        },
      },
    })
    nacionalidad: Omit<Nacionalidad, 'id'>,
  ): Promise<Nacionalidad> {
    return this.nacionalidadRepository.create(nacionalidad);
  }

  @get('/api/nacionalidades/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Nacionalidad model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Nacionalidad) where?: Where<Nacionalidad>,
  ): Promise<Count> {
    return this.nacionalidadRepository.count(where);
  }

  @get('/api/nacionalidades')
  @response(200, {
    description: 'Array of Nacionalidad model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Nacionalidad, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Nacionalidad) filter?: Filter<Nacionalidad>,
  ): Promise<Nacionalidad[]> {
    return this.nacionalidadRepository.find(filter);
  }

  @patch('/api/nacionalidades')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Nacionalidad PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nacionalidad, {partial: true}),
        },
      },
    })
    nacionalidad: Nacionalidad,
    @param.where(Nacionalidad) where?: Where<Nacionalidad>,
  ): Promise<Count> {
    return this.nacionalidadRepository.updateAll(nacionalidad, where);
  }

  @get('/api/nacionalidades/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Nacionalidad model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Nacionalidad, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Nacionalidad, {exclude: 'where'}) filter?: FilterExcludingWhere<Nacionalidad>
  ): Promise<Nacionalidad> {
    return this.nacionalidadRepository.findById(id, filter);
  }

  @patch('/api/nacionalidades/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Nacionalidad PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nacionalidad, {partial: true}),
        },
      },
    })
    nacionalidad: Nacionalidad,
  ): Promise<void> {
    await this.nacionalidadRepository.updateById(id, nacionalidad);
  }

  @put('/api/nacionalidades/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Nacionalidad PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() nacionalidad: Nacionalidad,
  ): Promise<void> {
    await this.nacionalidadRepository.replaceById(id, nacionalidad);
  }

  @del('/api/nacionalidades/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Nacionalidad DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.nacionalidadRepository.deleteById(id);
  }
}
