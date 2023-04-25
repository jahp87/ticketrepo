import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Asiento} from './asiento.model';
import {Evento} from './evento.model';

@model()
export class AsientoEvento extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  // estados asiento evento

  /*
  1: habilitado
  2: disponible
  3: ocupado
  4: inhabilitado
  */

  @property({
    type: 'number',

  })
  estado: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @belongsTo(() => Asiento)
  asientoId: string;

  @belongsTo(() => Evento)
  eventoId: string;


  constructor(data?: Partial<AsientoEvento>) {
    super(data);
  }
}

export interface AsientoEventoRelations {
  // describe navigational properties here
}

export type AsientoEventoWithRelations = AsientoEvento & AsientoEventoRelations;
