import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Evento} from './evento.model';
import {User} from './user.model';

@model()
export class Boleto extends Entity {
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
    type: 'date',
    required: true,
  })
  fechaCreacion: string;

  @property({
    type: 'string',
    required: true,
  })
  imagenFondo: string;

  @belongsTo(() => Evento)
  eventoId: string;

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<Boleto>) {
    super(data);
  }
}

export interface BoletoRelations {
  // describe navigational properties here
}

export type BoletoWithRelations = Boleto & BoletoRelations;
