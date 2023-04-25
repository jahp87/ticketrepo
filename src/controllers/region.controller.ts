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
import {Region} from '../models';
import {RegionRepository} from '../repositories';

export class RegionController {
  constructor(
    @repository(RegionRepository)
    public regionRepository: RegionRepository,
  ) { }

  @post('/api/regions')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Region model instance',
    content: {'application/json': {schema: getModelSchemaRef(Region)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Region, {
            title: 'NewRegion',
            exclude: ['id'],
          }),
        },
      },
    })
    region: Omit<Region, 'id'>,
  ): Promise<Region> {
    return this.regionRepository.create(region);
  }

  @get('/api/regions/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Region model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Region) where?: Where<Region>,
  ): Promise<Count> {
    return this.regionRepository.count(where);
  }

  @get('/api/regions')
  @response(200, {
    description: 'Array of Region model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Region, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Region) filter?: Filter<Region>,
  ): Promise<Region[]> {
    return this.regionRepository.find(filter);
  }

  @patch('/api/regions')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Region PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Region, {partial: true}),
        },
      },
    })
    region: Region,
    @param.where(Region) where?: Where<Region>,
  ): Promise<Count> {
    return this.regionRepository.updateAll(region, where);
  }

  @get('/api/regions/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Region model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Region, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Region, {exclude: 'where'}) filter?: FilterExcludingWhere<Region>
  ): Promise<Region> {
    return this.regionRepository.findById(id, filter);
  }

  @patch('/api/regions/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Region PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Region, {partial: true}),
        },
      },
    })
    region: Region,
  ): Promise<void> {
    await this.regionRepository.updateById(id, region);
  }

  @put('/api/regions/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Region PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() region: Region,
  ): Promise<void> {
    await this.regionRepository.replaceById(id, region);
  }

  @del('/api/regions/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Region DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.regionRepository.deleteById(id);
  }
}
