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
import {Boleto} from '../models';
import {BoletoRepository} from '../repositories';

export class BoletoController {
  constructor(
    @repository(BoletoRepository)
    public boletoRepository: BoletoRepository,
  ) { }

  @post('/api/boletos')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Boleto model instance',
    content: {'application/json': {schema: getModelSchemaRef(Boleto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Boleto, {
            title: 'NewBoleto',
            exclude: ['id'],
          }),
        },
      },
    })
    boleto: Omit<Boleto, 'id'>,
  ): Promise<Boleto> {
    return this.boletoRepository.create(boleto);
  }

  @get('/api/boletos/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Boleto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Boleto) where?: Where<Boleto>,
  ): Promise<Count> {
    return this.boletoRepository.count(where);
  }

  @get('/api/boletos')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of Boleto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Boleto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Boleto) filter?: Filter<Boleto>,
  ): Promise<Boleto[]> {
    return this.boletoRepository.find(filter);
  }

  @patch('/api/boletos')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Boleto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Boleto, {partial: true}),
        },
      },
    })
    boleto: Boleto,
    @param.where(Boleto) where?: Where<Boleto>,
  ): Promise<Count> {
    return this.boletoRepository.updateAll(boleto, where);
  }

  @get('/api/boletos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Boleto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Boleto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Boleto, {exclude: 'where'}) filter?: FilterExcludingWhere<Boleto>
  ): Promise<Boleto> {
    return this.boletoRepository.findById(id, filter);
  }

  @patch('/api/boletos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Boleto PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Boleto, {partial: true}),
        },
      },
    })
    boleto: Boleto,
  ): Promise<void> {
    await this.boletoRepository.updateById(id, boleto);
  }

  @put('/api/boletos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Boleto PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() boleto: Boleto,
  ): Promise<void> {
    await this.boletoRepository.replaceById(id, boleto);
  }

  @del('/api/boletos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Boleto DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.boletoRepository.deleteById(id);
  }
}
