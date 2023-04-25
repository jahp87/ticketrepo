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
  CategoriaPrecioEvento,
  Evento
} from '../models';
import {CategoriaPrecioEventoRepository} from '../repositories';

export class CategoriaPrecioEventoEventoController {
  constructor(
    @repository(CategoriaPrecioEventoRepository)
    public categoriaPrecioEventoRepository: CategoriaPrecioEventoRepository,
  ) { }

  @get('/api/categoriaprecioeventos/{id}/evento', {
    responses: {
      '200': {
        description: 'Evento belonging to CategoriaPrecioEvento',
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
    @param.path.string('id') id: typeof CategoriaPrecioEvento.prototype.id,
  ): Promise<Evento> {
    return this.categoriaPrecioEventoRepository.evento(id);
  }
}
