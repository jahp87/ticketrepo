import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Espectador extends Entity {
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
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  rut: string;

  @property({
    type: 'boolean',
    required: true,
  })
  esExtranjero: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  esMenor: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Espectador>) {
    super(data);
  }
}

export interface EspectadorRelations {
  // describe navigational properties here
}

export type EspectadorWithRelations = Espectador & EspectadorRelations;
