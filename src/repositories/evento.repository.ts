import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {CategoriaEvento, Ciudad, Comuna, Empresa, Evento, EventoRelations, Layout, Pais, Promotor, Recinto, Region} from '../models';
import {AsientoEventoRepository} from './asiento-evento.repository';
import {AsientoRepository} from './asiento.repository';
import {CategoriaEventoRepository} from './categoria-evento.repository';
import {CiudadRepository} from './ciudad.repository';
import {ComunaRepository} from './comuna.repository';
import {EmpresaRepository} from './empresa.repository';
import {LayoutRepository} from './layout.repository';
import {LocalidadRepository} from './localidad.repository';
import {PaisRepository} from './pais.repository';
import {PromotorRepository} from './promotor.repository';
import {RecintoRepository} from './recinto.repository';
import {RegionRepository} from './region.repository';
import {ZonaRepository} from './zona.repository';

export class EventoRepository extends DefaultCrudRepository<
  Evento,
  typeof Evento.prototype.id,
  EventoRelations
> {

  public readonly categoriaEvento: BelongsToAccessor<CategoriaEvento, typeof Evento.prototype.id>;

  public readonly empresa: BelongsToAccessor<Empresa, typeof Evento.prototype.id>;

  public readonly pais: BelongsToAccessor<Pais, typeof Evento.prototype.id>;

  public readonly region: BelongsToAccessor<Region, typeof Evento.prototype.id>;

  public readonly comuna: BelongsToAccessor<Comuna, typeof Evento.prototype.id>;

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Evento.prototype.id>;


  public readonly recinto: BelongsToAccessor<Recinto, typeof Evento.prototype.id>;

  public readonly promotor: BelongsToAccessor<Promotor, typeof Evento.prototype.id>;

  public readonly layout: BelongsToAccessor<Layout, typeof Evento.prototype.id>;

  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource,
    @repository.getter('CategoriaEventoRepository') protected categoriaEventoRepositoryGetter: Getter<CategoriaEventoRepository>,
    @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>,
    @repository.getter('PaisRepository') protected paisRepositoryGetter: Getter<PaisRepository>,
    @repository.getter('RegionRepository') protected regionRepositoryGetter: Getter<RegionRepository>,
    @repository.getter('ComunaRepository') protected comunaRepositoryGetter: Getter<ComunaRepository>,
    @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>,
    @repository.getter('RecintoRepository') protected recintoRepositoryGetter: Getter<RecintoRepository>,
    @repository.getter('PromotorRepository') protected promotorRepositoryGetter: Getter<PromotorRepository>,
    @repository.getter('LayoutRepository') protected layoutRepositoryGetter: Getter<LayoutRepository>,
    @repository(LocalidadRepository) private localidadRepository: LocalidadRepository,
    @repository(ZonaRepository) private zonaRepository: ZonaRepository,
    @repository(AsientoRepository) private asientoRepository: AsientoRepository,
    @repository(AsientoEventoRepository) private asientoEventoRepository: AsientoEventoRepository,
  ) {
    super(Evento, dataSource);
    this.layout = this.createBelongsToAccessorFor('layout', layoutRepositoryGetter,);
    this.registerInclusionResolver('layout', this.layout.inclusionResolver);
    this.promotor = this.createBelongsToAccessorFor('promotor', promotorRepositoryGetter,);
    this.registerInclusionResolver('promotor', this.promotor.inclusionResolver);
    this.recinto = this.createBelongsToAccessorFor('recinto', recintoRepositoryGetter,);
    this.registerInclusionResolver('recinto', this.recinto.inclusionResolver);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
    this.comuna = this.createBelongsToAccessorFor('comuna', comunaRepositoryGetter,);
    this.registerInclusionResolver('comuna', this.comuna.inclusionResolver);
    this.region = this.createBelongsToAccessorFor('region', regionRepositoryGetter,);
    this.registerInclusionResolver('region', this.region.inclusionResolver);
    this.pais = this.createBelongsToAccessorFor('pais', paisRepositoryGetter,);
    this.registerInclusionResolver('pais', this.pais.inclusionResolver);
    this.empresa = this.createBelongsToAccessorFor('empresa', empresaRepositoryGetter,);
    this.registerInclusionResolver('empresa', this.empresa.inclusionResolver);
    this.categoriaEvento = this.createBelongsToAccessorFor('categoriaEvento', categoriaEventoRepositoryGetter,);
    this.registerInclusionResolver('categoriaEvento', this.categoriaEvento.inclusionResolver);
  }

  async createAllSeat(
    objCreateSeat: any
  ): Promise<Evento> {

    const evento = await this.findById(objCreateSeat.eventoId);

    var fila = 1;
    var columna = 1;

    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x));

    const locations = await this.localidadRepository.find({
      where: {
        layoutId: objCreateSeat.layoutId
      },

    });

    for (var objLocation of locations) {

      const zones = await this.zonaRepository.find({
        where: {
          localidadId: objLocation.id,
        }
      });


      fila = 0;
      var nameFila = '';
      for (var objZone of zones) {
        const seats = await this.asientoRepository.find({
          where: {
            and: [
              {zonaId: objZone.id},
              {activo: true}
            ]
          }
        });


        for (var objSeat of seats) {

          if (alphabet[fila] > 'Z' && alphabet[fila].length > 1) {
            nameFila = alphabet[fila] + alphabet[fila];
          }
          else {
            nameFila = alphabet[fila];
          }

          // estados asiento evento

          /*
          1: habilitado
          2: disponible
          3: ocupado
          4: inhabilitado
          */
          const seatEvent = await this.asientoEventoRepository.create({
            nombre: nameFila + columna.toString(),
            asientoId: objSeat.id,
            eventoId: evento.id,
            estado: 1

          });

          columna++;
        }

        fila = fila++;
        columna = 1;
      }
    }



    return evento;


  }
}
