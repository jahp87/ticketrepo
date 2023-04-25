import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Localidad} from './localidad.model';

@model()
export class PrecioLocalidad extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @belongsTo(() => Localidad)
  localidadId: string;

  constructor(data?: Partial<PrecioLocalidad>) {
    super(data);
  }
}

export interface PrecioLocalidadRelations {
  // describe navigational properties here
}

export type PrecioLocalidadWithRelations = PrecioLocalidad & PrecioLocalidadRelations;
