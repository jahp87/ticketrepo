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
import {FormaPago} from '../models';
import {FormaPagoRepository} from '../repositories';

export class FormaPagoController {
  constructor(
    @repository(FormaPagoRepository)
    public formaPagoRepository: FormaPagoRepository,
  ) { }

  @post('/api/formapagos')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'FormaPago model instance',
    content: {'application/json': {schema: getModelSchemaRef(FormaPago)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FormaPago, {
            title: 'NewFormaPago',
            exclude: ['id'],
          }),
        },
      },
    })
    formaPago: Omit<FormaPago, 'id'>,
  ): Promise<FormaPago> {
    return this.formaPagoRepository.create(formaPago);
  }

  @get('/api/formapagos/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'FormaPago model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(FormaPago) where?: Where<FormaPago>,
  ): Promise<Count> {
    return this.formaPagoRepository.count(where);
  }

  @get('/api/formapagos')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of FormaPago model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(FormaPago, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(FormaPago) filter?: Filter<FormaPago>,
  ): Promise<FormaPago[]> {
    return this.formaPagoRepository.find(filter);
  }

  @patch('/api/formapagos')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'FormaPago PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FormaPago, {partial: true}),
        },
      },
    })
    formaPago: FormaPago,
    @param.where(FormaPago) where?: Where<FormaPago>,
  ): Promise<Count> {
    return this.formaPagoRepository.updateAll(formaPago, where);
  }

  @get('/api/formapagos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'FormaPago model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(FormaPago, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(FormaPago, {exclude: 'where'}) filter?: FilterExcludingWhere<FormaPago>
  ): Promise<FormaPago> {
    return this.formaPagoRepository.findById(id, filter);
  }

  @patch('/api/formapagos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'FormaPago PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FormaPago, {partial: true}),
        },
      },
    })
    formaPago: FormaPago,
  ): Promise<void> {
    await this.formaPagoRepository.updateById(id, formaPago);
  }

  @put('/api/formapagos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'FormaPago PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() formaPago: FormaPago,
  ): Promise<void> {
    await this.formaPagoRepository.replaceById(id, formaPago);
  }

  @del('/api/formapagos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'FormaPago DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.formaPagoRepository.deleteById(id);
  }
}
