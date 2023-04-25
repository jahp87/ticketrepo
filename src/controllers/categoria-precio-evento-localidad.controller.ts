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
  Localidad
} from '../models';
import {CategoriaPrecioEventoRepository} from '../repositories';

export class CategoriaPrecioEventoLocalidadController {
  constructor(
    @repository(CategoriaPrecioEventoRepository)
    public categoriaPrecioEventoRepository: CategoriaPrecioEventoRepository,
  ) { }

  @get('/api/categoriaprecioeventos/{id}/localidad', {
    responses: {
      '200': {
        description: 'Localidad belonging to CategoriaPrecioEvento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Localidad)},
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
  async getLocalidad(
    @param.path.string('id') id: typeof CategoriaPrecioEvento.prototype.id,
  ): Promise<Localidad> {
    return this.categoriaPrecioEventoRepository.localidad(id);
  }
}
