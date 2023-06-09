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
import {Empresa} from '../models';
import {EmpresaRepository} from '../repositories';

@authenticate('jwt')
@authorize({
  allowedRoles: ['admin'],
  voters: [basicAuthorization],
})
export class EmpresaController {
  constructor(
    @repository(EmpresaRepository)
    public empresaRepository: EmpresaRepository,
  ) { }

  @post('/api/empresas')
  @response(200, {
    description: 'Empresa model instance',
    content: {'application/json': {schema: getModelSchemaRef(Empresa)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empresa, {
            title: 'NewEmpresa',
            exclude: ['id'],
          }),
        },
      },
    })
    empresa: Omit<Empresa, 'id'>,
  ): Promise<Empresa> {
    return this.empresaRepository.create(empresa);
  }

  @get('/api/empresas/count')
  @response(200, {
    description: 'Empresa model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Empresa) where?: Where<Empresa>,
  ): Promise<Count> {
    return this.empresaRepository.count(where);
  }

  @get('/api/empresas')
  @response(200, {
    description: 'Array of Empresa model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Empresa, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Empresa) filter?: Filter<Empresa>,
  ): Promise<Empresa[]> {
    return this.empresaRepository.find(filter);
  }

  @patch('/api/empresas')
  @response(200, {
    description: 'Empresa PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empresa, {partial: true}),
        },
      },
    })
    empresa: Empresa,
    @param.where(Empresa) where?: Where<Empresa>,
  ): Promise<Count> {
    return this.empresaRepository.updateAll(empresa, where);
  }

  @get('/api/empresas/{id}')
  @response(200, {
    description: 'Empresa model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Empresa, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Empresa, {exclude: 'where'}) filter?: FilterExcludingWhere<Empresa>
  ): Promise<Empresa> {
    return this.empresaRepository.findById(id, filter);
  }

  @patch('/api/empresas/{id}')
  @response(204, {
    description: 'Empresa PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empresa, {partial: true}),
        },
      },
    })
    empresa: Empresa,
  ): Promise<void> {
    await this.empresaRepository.updateById(id, empresa);
  }

  @put('/api/empresas/{id}')
  @response(204, {
    description: 'Empresa PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() empresa: Empresa,
  ): Promise<void> {
    await this.empresaRepository.replaceById(id, empresa);
  }

  @del('/api/empresas/{id}')
  @response(204, {
    description: 'Empresa DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.empresaRepository.deleteById(id);
  }
}
