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
import {PrecioLocalidad} from '../models';
import {PrecioLocalidadRepository} from '../repositories';

export class PrecioLocalidadController {
  constructor(
    @repository(PrecioLocalidadRepository)
    public precioLocalidadRepository: PrecioLocalidadRepository,
  ) { }

  @post('/api/preciolocalidad')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'PrecioLocalidad model instance',
    content: {'application/json': {schema: getModelSchemaRef(PrecioLocalidad)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PrecioLocalidad, {
            title: 'NewPrecioLocalidad',
            exclude: ['id'],
          }),
        },
      },
    })
    precioLocalidad: Omit<PrecioLocalidad, 'id'>,
  ): Promise<PrecioLocalidad> {
    return this.precioLocalidadRepository.create(precioLocalidad);
  }

  @get('/api/preciolocalidad/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'PrecioLocalidad model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PrecioLocalidad) where?: Where<PrecioLocalidad>,
  ): Promise<Count> {
    return this.precioLocalidadRepository.count(where);
  }

  @get('/api/preciolocalidad')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of PrecioLocalidad model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PrecioLocalidad, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PrecioLocalidad) filter?: Filter<PrecioLocalidad>,
  ): Promise<PrecioLocalidad[]> {
    return this.precioLocalidadRepository.find(filter);
  }

  @patch('/api/preciolocalidad')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'PrecioLocalidad PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PrecioLocalidad, {partial: true}),
        },
      },
    })
    precioLocalidad: PrecioLocalidad,
    @param.where(PrecioLocalidad) where?: Where<PrecioLocalidad>,
  ): Promise<Count> {
    return this.precioLocalidadRepository.updateAll(precioLocalidad, where);
  }

  @get('/api/preciolocalidad/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'PrecioLocalidad model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PrecioLocalidad, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PrecioLocalidad, {exclude: 'where'}) filter?: FilterExcludingWhere<PrecioLocalidad>
  ): Promise<PrecioLocalidad> {
    return this.precioLocalidadRepository.findById(id, filter);
  }

  @patch('/api/preciolocalidad/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'PrecioLocalidad PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PrecioLocalidad, {partial: true}),
        },
      },
    })
    precioLocalidad: PrecioLocalidad,
  ): Promise<void> {
    await this.precioLocalidadRepository.updateById(id, precioLocalidad);
  }

  @put('/api/preciolocalidad/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'PrecioLocalidad PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() precioLocalidad: PrecioLocalidad,
  ): Promise<void> {
    await this.precioLocalidadRepository.replaceById(id, precioLocalidad);
  }

  @del('/api/preciolocalidad/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'PrecioLocalidad DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.precioLocalidadRepository.deleteById(id);
  }
}
