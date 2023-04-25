import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Zona} from './zona.model';

@model()
export class Asiento extends Entity {
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
  fila: string;

  @property({
    type: 'string',
    required: true,
  })
  columna: string;

  @property({
    type: 'boolean',
    required: true,
  })
  activo: boolean;

  @belongsTo(() => Zona)
  zonaId: string;

  constructor(data?: Partial<Asiento>) {
    super(data);
  }
}

export interface AsientoRelations {
  // describe navigational properties here
}

export type AsientoWithRelations = Asiento & AsientoRelations;
