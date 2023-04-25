import {Entity, model, property} from '@loopback/repository';

@model()
export class EstadoAsientoEvento extends Entity {
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
  nombre: string;


  constructor(data?: Partial<EstadoAsientoEvento>) {
    super(data);
  }
}

export interface EstadoAsientoEventoRelations {
  // describe navigational properties here
}

export type EstadoAsientoEventoWithRelations = EstadoAsientoEvento & EstadoAsientoEventoRelations;
