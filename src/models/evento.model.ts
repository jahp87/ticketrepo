import {belongsTo, Entity, model, property} from '@loopback/repository';
import {CategoriaEvento} from './categoria-evento.model';
import {Ciudad} from './ciudad.model';
import {Comuna} from './comuna.model';
import {Empresa} from './empresa.model';
import {Layout} from './layout.model';
import {Pais} from './pais.model';
import {Promotor} from './promotor.model';
import {Recinto} from './recinto.model';
import {Region} from './region.model';

@model()
export class Evento extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreFantasia: string;

  @property({
    type: 'string',
    required: true,
  })
  subtitulo: string;

  @property({
    type: 'number',
    required: true,
  })
  limiteTicketUsuario: number;

  @property({
    type: 'boolean',
    required: true,
  })
  esExentoDelIVA: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  esRetiroEnReciento: boolean;

  @property({
    type: 'number',
    required: true,
  })
  limiteTicketPorRUT: number;

  @property({
    type: 'date',
  })
  fechaInicioEvento: string;

  @property({
    type: 'date',
  })
  fechaTerminoEvento: string;

  @property({
    type: 'string',
  })
  horaAbrePuertas: string;

  @property({
    type: 'string',
  })
  horaInicioEvento: string;

  @property({
    type: 'number',
    required: true,
  })
  duracionMinutos: number;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  imgPortada: string;

  @property({
    type: 'string',
    required: true,
  })
  imgSecundario: string;

  @property({
    type: 'string',
    required: true,
  })
  terminosEvento: string;

  @property({
    type: 'boolean',
    required: true,
  })
  activo: boolean;

  @belongsTo(() => CategoriaEvento)
  categoriaEventoId: string;

  @belongsTo(() => Empresa)
  empresaId: string;

  @belongsTo(() => Pais)
  paisId: string;

  @belongsTo(() => Region)
  regionId: string;

  @belongsTo(() => Comuna)
  comunaId: string;

  @belongsTo(() => Ciudad)
  ciudadId: string;

  @belongsTo(() => Recinto)
  recintoId: string;

  @belongsTo(() => Promotor)
  promotorId: string;

  @belongsTo(() => Layout)
  layoutId: string;

  constructor(data?: Partial<Evento>) {
    super(data);
  }
}

export interface EventoRelations {
  // describe navigational properties here
}

export type EventoWithRelations = Evento & EventoRelations;
