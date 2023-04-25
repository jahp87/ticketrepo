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
  Boleto,
  Evento
} from '../models';
import {BoletoRepository} from '../repositories';

export class BoletoEventoController {
  constructor(
    @repository(BoletoRepository)
    public boletoRepository: BoletoRepository,
  ) { }

  @get('/api/boletos/{id}/evento', {
    responses: {
      '200': {
        description: 'Evento belonging to Boleto',
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
    @param.path.string('id') id: typeof Boleto.prototype.id,
  ): Promise<Evento> {
    return this.boletoRepository.evento(id);
  }
}
