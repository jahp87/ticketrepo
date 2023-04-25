import {Entity, model, property} from '@loopback/repository';

@model()
export class TipoCargoPorServicio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  porcentaje: number;

  @property({
    type: 'number',
    required: true,
  })
  monto: number;


  constructor(data?: Partial<TipoCargoPorServicio>) {
    super(data);
  }
}

export interface TipoCargoPorServicioRelations {
  // describe navigational properties here
}

export type TipoCargoPorServicioWithRelations = TipoCargoPorServicio & TipoCargoPorServicioRelations;
