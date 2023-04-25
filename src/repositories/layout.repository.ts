import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {Empresa, Layout, LayoutRelations, Recinto} from '../models';
import {AsientoRepository} from './asiento.repository';
import {EmpresaRepository} from './empresa.repository';
import {EventoRepository} from './evento.repository';
import {LocalidadRepository} from './localidad.repository';
import {RecintoRepository} from './recinto.repository';
import {ZonaRepository} from './zona.repository';

export class LayoutRepository extends DefaultCrudRepository<
  Layout,
  typeof Layout.prototype.id,
  LayoutRelations
> {

  public readonly empresa: BelongsToAccessor<Empresa, typeof Layout.prototype.id>;


  public readonly recinto: BelongsToAccessor<Recinto, typeof Layout.prototype.id>;

  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource,
    @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>,
    @repository.getter('EventoRepository') protected eventoRepositoryGetter: Getter<EventoRepository>,
    @repository.getter('RecintoRepository') protected recintoRepositoryGetter: Getter<RecintoRepository>,
    @repository(LocalidadRepository) private localidadRepository: LocalidadRepository,
    @repository(ZonaRepository) private zonaRepository: ZonaRepository,
    @repository(AsientoRepository) private asientoRepository: AsientoRepository,

  ) {
    super(Layout, dataSource);
    this.recinto = this.createBelongsToAccessorFor('recinto', recintoRepositoryGetter,);
    this.registerInclusionResolver('recinto', this.recinto.inclusionResolver);
    this.empresa = this.createBelongsToAccessorFor('empresa', empresaRepositoryGetter,);
    this.registerInclusionResolver('empresa', this.empresa.inclusionResolver);
  }

  async createFullLayouts(
    layout: any
  ): Promise<Layout> {


    const newLayout = await this.create({
      nombre: layout.nombre,
      capacidadMaxima: layout.capacidadMaxima,
      archivo: layout.archivo,
      activo: true,
      empresaId: layout.empresaId,
      recintoId: layout.recintoId
    });
    for (let objLocation of layout.localidades) {

      const newLocalidad = await this.localidadRepository.create({
        nombre: objLocation.nombre,
        colorHTML: objLocation.colorHTML,
        layoutId: newLayout.id,
        tipoEntradaId: objLocation.tipoEntradaId
      });

      for (let objZona of objLocation.zonas) {
        const newZona = await this.zonaRepository.create({
          cantidadFilas: objZona.cantidadFilas,
          cantidadColumnas: objZona.cantidadColumnas,
          nombre: objZona.nombre,
          localidadId: newLocalidad.id
        });

        for (let i = 0; i < objZona.cantidadFilas; i++) {
          for (let j = 0; j < objZona.cantidadColumnas; j++) {
            {
              this.asientoRepository.create({

                fila: (i + 1).toString(),
                columna: (j + 1).toString(),
                activo: true,
                zonaId: newZona.id

              });
            }
          }
        }
      }

    }
    return newLayout;

  }

}
