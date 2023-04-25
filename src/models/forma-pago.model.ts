import {Entity, model, property} from '@loopback/repository';

@model()
export class FormaPago extends Entity {
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
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @property({
    type: 'boolean',
    required: true,
  })
  activo: boolean;


  constructor(data?: Partial<FormaPago>) {
    super(data);
  }
}

export interface FormaPagoRelations {
  // describe navigational properties here
}

export type FormaPagoWithRelations = FormaPago & FormaPagoRelations;
