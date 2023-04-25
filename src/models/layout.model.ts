import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Empresa} from './empresa.model';
import {Recinto} from './recinto.model';

@model()
export class Layout extends Entity {
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
    type: 'number',
    required: true,
  })
  capacidadMaxima: number;

  @property({
    type: 'string',
    required: true,
  })
  archivo: string;


  @property({
    type: 'boolean',
  })
  activo: boolean;

  @belongsTo(() => Empresa)
  empresaId: string;


  @belongsTo(() => Recinto)
  recintoId: string;

  constructor(data?: Partial<Layout>) {
    super(data);
  }
}

export interface LayoutRelations {
  // describe navigational properties here
}

export type LayoutWithRelations = Layout & LayoutRelations;
