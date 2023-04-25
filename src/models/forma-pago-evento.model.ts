import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Evento} from './evento.model';
import {FormaPago} from './forma-pago.model';

@model()
export class FormaPagoEvento extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => Evento)
  eventoId: string;

  @belongsTo(() => FormaPago)
  formaPagoId: string;

  constructor(data?: Partial<FormaPagoEvento>) {
    super(data);
  }
}

export interface FormaPagoEventoRelations {
  // describe navigational properties here
}

export type FormaPagoEventoWithRelations = FormaPagoEvento & FormaPagoEventoRelations;
