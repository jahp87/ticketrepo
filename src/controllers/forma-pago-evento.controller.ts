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
import {FormaPagoEvento} from '../models';
import {FormaPagoEventoRepository} from '../repositories';

export class FormaPagoEventoController {
  constructor(
    @repository(FormaPagoEventoRepository)
    public formaPagoEventoRepository: FormaPagoEventoRepository,
  ) { }

  @post('/api/formapagoeventos')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'FormaPagoEvento model instance',
    content: {'application/json': {schema: getModelSchemaRef(FormaPagoEvento)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FormaPagoEvento, {
            title: 'NewFormaPagoEvento',
            exclude: ['id'],
          }),
        },
      },
    })
    formaPagoEvento: Omit<FormaPagoEvento, 'id'>,
  ): Promise<FormaPagoEvento> {
    return this.formaPagoEventoRepository.create(formaPagoEvento);
  }

  @get('/api/formapagoeventos/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'FormaPagoEvento model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(FormaPagoEvento) where?: Where<FormaPagoEvento>,
  ): Promise<Count> {
    return this.formaPagoEventoRepository.count(where);
  }

  @get('/api/formapagoeventos')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of FormaPagoEvento model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(FormaPagoEvento, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(FormaPagoEvento) filter?: Filter<FormaPagoEvento>,
  ): Promise<FormaPagoEvento[]> {
    return this.formaPagoEventoRepository.find(filter);
  }

  @patch('/api/formapagoeventos')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'FormaPagoEvento PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FormaPagoEvento, {partial: true}),
        },
      },
    })
    formaPagoEvento: FormaPagoEvento,
    @param.where(FormaPagoEvento) where?: Where<FormaPagoEvento>,
  ): Promise<Count> {
    return this.formaPagoEventoRepository.updateAll(formaPagoEvento, where);
  }

  @get('/api/formapagoeventos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'FormaPagoEvento model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(FormaPagoEvento, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(FormaPagoEvento, {exclude: 'where'}) filter?: FilterExcludingWhere<FormaPagoEvento>
  ): Promise<FormaPagoEvento> {
    return this.formaPagoEventoRepository.findById(id, filter);
  }

  @patch('/api/formapagoeventos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'FormaPagoEvento PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FormaPagoEvento, {partial: true}),
        },
      },
    })
    formaPagoEvento: FormaPagoEvento,
  ): Promise<void> {
    await this.formaPagoEventoRepository.updateById(id, formaPagoEvento);
  }

  @put('/api/formapagoeventos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'FormaPagoEvento PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() formaPagoEvento: FormaPagoEvento,
  ): Promise<void> {
    await this.formaPagoEventoRepository.replaceById(id, formaPagoEvento);
  }

  @del('/api/formapagoeventos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'FormaPagoEvento DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.formaPagoEventoRepository.deleteById(id);
  }
}
