import {Entity, model, property} from '@loopback/repository';

@model()
export class Nacionalidad extends Entity {
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


  constructor(data?: Partial<Nacionalidad>) {
    super(data);
  }
}

export interface NacionalidadRelations {
  // describe navigational properties here
}

export type NacionalidadWithRelations = Nacionalidad & NacionalidadRelations;
