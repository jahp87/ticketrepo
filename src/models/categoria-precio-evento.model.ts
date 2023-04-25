import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Evento} from './evento.model';
import {Localidad} from './localidad.model';
import {TipoCategoriaPrecio} from './tipo-categoria-precio.model';
import {TipoCargoPorServicio} from './tipo-cargo-por-servicio.model';

@model()
export class CategoriaPrecioEvento extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  precioUnitario: number;

  @property({
    type: 'number',
  })
  cargoPorServicio?: number;

  @property({
    type: 'boolean',
    required: true,
  })
  permiteVentaWeb: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  permiteVentaPtoVento: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  esNominativa: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  presentaPaseMovilidad: boolean;

  @property({
    type: 'date',
    required: true,
  })
  fechaInicioVenta: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaFinVenta: string;

  @belongsTo(() => Evento)
  eventoId: string;

  @belongsTo(() => Localidad)
  localidadId: string;

  @belongsTo(() => TipoCategoriaPrecio)
  tipoCategoriaPrecioId: string;

  @belongsTo(() => TipoCargoPorServicio)
  tipoCargoPorServicioId: string;

  constructor(data?: Partial<CategoriaPrecioEvento>) {
    super(data);
  }
}

export interface CategoriaPrecioEventoRelations {
  // describe navigational properties here
}

export type CategoriaPrecioEventoWithRelations = CategoriaPrecioEvento & CategoriaPrecioEventoRelations;
