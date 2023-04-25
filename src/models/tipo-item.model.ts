import {Entity, model, property} from '@loopback/repository';

@model()
export class TipoItem extends Entity {
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


  constructor(data?: Partial<TipoItem>) {
    super(data);
  }
}

export interface TipoItemRelations {
  // describe navigational properties here
}

export type TipoItemWithRelations = TipoItem & TipoItemRelations;
