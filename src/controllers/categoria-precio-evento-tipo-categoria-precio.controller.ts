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
  TipoCategoriaPrecio
} from '../models';
import {CategoriaPrecioEventoRepository} from '../repositories';

export class CategoriaPrecioEventoTipoCategoriaPrecioController {
  constructor(
    @repository(CategoriaPrecioEventoRepository)
    public categoriaPrecioEventoRepository: CategoriaPrecioEventoRepository,
  ) { }

  @get('/api/categoriaprecioeventos/{id}/tipocategoriaprecio', {
    responses: {
      '200': {
        description: 'TipoCategoriaPrecio belonging to CategoriaPrecioEvento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoCategoriaPrecio)},
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
  async getTipoCategoriaPrecio(
    @param.path.string('id') id: typeof CategoriaPrecioEvento.prototype.id,
  ): Promise<TipoCategoriaPrecio> {
    return this.categoriaPrecioEventoRepository.tipoCategoriaPrecio(id);
  }
}
