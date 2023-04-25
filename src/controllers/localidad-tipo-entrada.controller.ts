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
  Localidad,
  TipoEntrada
} from '../models';
import {LocalidadRepository} from '../repositories';

export class LocalidadTipoEntradaController {
  constructor(
    @repository(LocalidadRepository)
    public localidadRepository: LocalidadRepository,
  ) { }

  @get('/api/localidad/{id}/tipo-entrada', {
    responses: {
      '200': {
        description: 'TipoEntrada belonging to Localidad',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoEntrada)},
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
  async getTipoEntrada(
    @param.path.string('id') id: typeof Localidad.prototype.id,
  ): Promise<TipoEntrada> {
    return this.localidadRepository.tipoEntrada(id);
  }
}
