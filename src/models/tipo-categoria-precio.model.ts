import {Entity, model, property} from '@loopback/repository';

@model()
export class TipoCategoriaPrecio extends Entity {
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


  constructor(data?: Partial<TipoCategoriaPrecio>) {
    super(data);
  }
}

export interface TipoCategoriaPrecioRelations {
  // describe navigational properties here
}

export type TipoCategoriaPrecioWithRelations = TipoCategoriaPrecio & TipoCategoriaPrecioRelations;
