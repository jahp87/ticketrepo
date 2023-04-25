import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Layout} from './layout.model';
import {TipoEntrada} from './tipo-entrada.model';

@model()
export class Localidad extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  colorHTML: string;

  @belongsTo(() => Layout)
  layoutId: string;

  @belongsTo(() => TipoEntrada)
  tipoEntradaId: string;

  constructor(data?: Partial<Localidad>) {
    super(data);
  }
}

export interface LocalidadRelations {
  // describe navigational properties here
}

export type LocalidadWithRelations = Localidad & LocalidadRelations;
