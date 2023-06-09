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
import {Zona} from '../models';
import {ZonaRepository} from '../repositories';

export class ZonaController {
  constructor(
    @repository(ZonaRepository)
    public zonaRepository: ZonaRepository,
  ) { }

  @post('/api/zonas')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Zona model instance',
    content: {'application/json': {schema: getModelSchemaRef(Zona)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Zona, {
            title: 'NewZona',
            exclude: ['id'],
          }),
        },
      },
    })
    zona: Omit<Zona, 'id'>,
  ): Promise<Zona> {
    return this.zonaRepository.create(zona);
  }

  @get('/api/zonas/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Zona model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Zona) where?: Where<Zona>,
  ): Promise<Count> {
    return this.zonaRepository.count(where);
  }

  @get('/api/zonas')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of Zona model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Zona, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Zona) filter?: Filter<Zona>,
  ): Promise<Zona[]> {
    return this.zonaRepository.find(filter);
  }

  @patch('/api/zonas')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Zona PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Zona, {partial: true}),
        },
      },
    })
    zona: Zona,
    @param.where(Zona) where?: Where<Zona>,
  ): Promise<Count> {
    return this.zonaRepository.updateAll(zona, where);
  }

  @get('/api/zonas/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Zona model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Zona, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Zona, {exclude: 'where'}) filter?: FilterExcludingWhere<Zona>
  ): Promise<Zona> {
    return this.zonaRepository.findById(id, filter);
  }

  @patch('/api/zonas/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Zona PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Zona, {partial: true}),
        },
      },
    })
    zona: Zona,
  ): Promise<void> {
    await this.zonaRepository.updateById(id, zona);
  }

  @put('/api/zonas/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Zona PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() zona: Zona,
  ): Promise<void> {
    await this.zonaRepository.replaceById(id, zona);
  }

  @del('/api/zonas/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Zona DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.zonaRepository.deleteById(id);
  }
}
