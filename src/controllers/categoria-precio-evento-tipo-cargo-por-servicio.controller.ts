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
  TipoCargoPorServicio
} from '../models';
import {CategoriaPrecioEventoRepository} from '../repositories';

export class CategoriaPrecioEventoTipoCargoPorServicioController {
  constructor(
    @repository(CategoriaPrecioEventoRepository)
    public categoriaPrecioEventoRepository: CategoriaPrecioEventoRepository,
  ) { }

  @get('/api/categoriaprecioeventos/{id}/tipocargoporservicio', {
    responses: {
      '200': {
        description: 'TipoCargoPorServicio belonging to CategoriaPrecioEvento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoCargoPorServicio)},
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
  async getTipoCargoPorServicio(
    @param.path.string('id') id: typeof CategoriaPrecioEvento.prototype.id,
  ): Promise<TipoCargoPorServicio> {
    return this.categoriaPrecioEventoRepository.tipoCargoPorServicio(id);
  }
}
