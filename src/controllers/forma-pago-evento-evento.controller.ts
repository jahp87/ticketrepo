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
  Evento, FormaPagoEvento
} from '../models';
import {FormaPagoEventoRepository} from '../repositories';

export class FormaPagoEventoEventoController {
  constructor(
    @repository(FormaPagoEventoRepository)
    public formaPagoEventoRepository: FormaPagoEventoRepository,
  ) { }

  @get('/api/formapagoeventos/{id}/evento', {
    responses: {
      '200': {
        description: 'Evento belonging to FormaPagoEvento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Evento)},
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
  async getEvento(
    @param.path.string('id') id: typeof FormaPagoEvento.prototype.id,
  ): Promise<Evento> {
    return this.formaPagoEventoRepository.evento(id);
  }
}
