import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Localidad} from './localidad.model';

@model()
export class Zona extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidadFilas: number;

  @property({
    type: 'number',
    required: true,
  })
  cantidadColumnas: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @belongsTo(() => Localidad)
  localidadId: string;

  constructor(data?: Partial<Zona>) {
    super(data);
  }
}

export interface ZonaRelations {
  // describe navigational properties here
}

export type ZonaWithRelations = Zona & ZonaRelations;
