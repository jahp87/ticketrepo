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
import {TipoCategoriaPrecio} from '../models';
import {TipoCategoriaPrecioRepository} from '../repositories';

export class TipoCategoriaPrecioController {
  constructor(
    @repository(TipoCategoriaPrecioRepository)
    public tipoCategoriaPrecioRepository: TipoCategoriaPrecioRepository,
  ) { }

  @post('/api/tipocategoriaprecios')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'TipoCategoriaPrecio model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoCategoriaPrecio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoCategoriaPrecio, {
            title: 'NewTipoCategoriaPrecio',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoCategoriaPrecio: Omit<TipoCategoriaPrecio, 'id'>,
  ): Promise<TipoCategoriaPrecio> {
    return this.tipoCategoriaPrecioRepository.create(tipoCategoriaPrecio);
  }

  @get('/api/tipocategoriaprecios/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'TipoCategoriaPrecio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoCategoriaPrecio) where?: Where<TipoCategoriaPrecio>,
  ): Promise<Count> {
    return this.tipoCategoriaPrecioRepository.count(where);
  }

  @get('/api/tipocategoriaprecios')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of TipoCategoriaPrecio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoCategoriaPrecio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoCategoriaPrecio) filter?: Filter<TipoCategoriaPrecio>,
  ): Promise<TipoCategoriaPrecio[]> {
    return this.tipoCategoriaPrecioRepository.find(filter);
  }

  @patch('/api/tipocategoriaprecios')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'TipoCategoriaPrecio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoCategoriaPrecio, {partial: true}),
        },
      },
    })
    tipoCategoriaPrecio: TipoCategoriaPrecio,
    @param.where(TipoCategoriaPrecio) where?: Where<TipoCategoriaPrecio>,
  ): Promise<Count> {
    return this.tipoCategoriaPrecioRepository.updateAll(tipoCategoriaPrecio, where);
  }

  @get('/api/tipocategoriaprecios/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'TipoCategoriaPrecio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoCategoriaPrecio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TipoCategoriaPrecio, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoCategoriaPrecio>
  ): Promise<TipoCategoriaPrecio> {
    return this.tipoCategoriaPrecioRepository.findById(id, filter);
  }

  @patch('/api/tipocategoriaprecios/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'TipoCategoriaPrecio PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoCategoriaPrecio, {partial: true}),
        },
      },
    })
    tipoCategoriaPrecio: TipoCategoriaPrecio,
  ): Promise<void> {
    await this.tipoCategoriaPrecioRepository.updateById(id, tipoCategoriaPrecio);
  }

  @put('/api/tipocategoriaprecios/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'TipoCategoriaPrecio PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tipoCategoriaPrecio: TipoCategoriaPrecio,
  ): Promise<void> {
    await this.tipoCategoriaPrecioRepository.replaceById(id, tipoCategoriaPrecio);
  }

  @del('/api/tipocategoriaprecios/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'TipoCategoriaPrecio DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tipoCategoriaPrecioRepository.deleteById(id);
  }
}
