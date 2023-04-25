import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {basicAuthorization} from '../middlewares/auth.midd';
import {
  FormaPago, FormaPagoEvento
} from '../models';
import {FormaPagoEventoRepository} from '../repositories';

export class FormaPagoEventoFormaPagoController {
  constructor(
    @repository(FormaPagoEventoRepository)
    public formaPagoEventoRepository: FormaPagoEventoRepository,
  ) { }

  @get('/api/formapagoeventos/{id}/forma-pago', {
    responses: {
      '200': {
        description: 'FormaPago belonging to FormaPagoEvento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(FormaPago)},
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async getFormaPago(
    @param.path.string('id') id: typeof FormaPagoEvento.prototype.id,
  ): Promise<FormaPago> {
    return this.formaPagoEventoRepository.formaPago(id);
  }
}
