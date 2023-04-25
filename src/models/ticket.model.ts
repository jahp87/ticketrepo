import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Boleto} from './boleto.model';
import {Espectador} from './espectador.model';

@model()
export class Ticket extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  numeroFila: number;

  @property({
    type: 'number',
    required: true,
  })
  numeroAsiento: number;

  @property({
    type: 'string',
    required: true,
  })
  hora: string;

  @property({
    type: 'string',
    required: true,
  })
  numeroTicket: string;

  @property({
    type: 'number',
    required: true,
  })
  valorUnitario: number;

  @property({
    type: 'number',
    required: true,
  })
  valorCargo: number;

  @belongsTo(() => Boleto)
  boletoId: string;

  @belongsTo(() => Espectador)
  espectadorId: string;

  constructor(data?: Partial<Ticket>) {
    super(data);
  }
}

export interface TicketRelations {
  // describe navigational properties here
}

export type TicketWithRelations = Ticket & TicketRelations;
