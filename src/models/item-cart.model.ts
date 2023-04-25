import {belongsTo, Entity, model, property} from '@loopback/repository';
import {AsientoEvento} from './asiento-evento.model';
import {Cart} from './cart.model';
import {Espectador} from './espectador.model';
import {TipoItem} from './tipo-item.model';

@model({settings: {strict: false}})
export class ItemCart extends Entity {
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
  valorUnitario: number;

  @property({
    type: 'number',
    required: true,
  })
  valorCargoServicio: number;

  @property({
    type: 'number',
    required: true,
  })
  descuento: number;

  @property({
    type: 'string',
    required: true,
  })
  codigoDescuento: string;


  @belongsTo(() => Cart)
  cartId: string;

  @belongsTo(() => Espectador)
  espectadorId: string;

  @belongsTo(() => AsientoEvento)
  asientoEventoId: string;

  @belongsTo(() => TipoItem)
  tipoItemId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ItemCart>) {
    super(data);
  }
}

export interface ItemCartRelations {
  // describe navigational properties here
}

export type ItemCartWithRelations = ItemCart & ItemCartRelations;
