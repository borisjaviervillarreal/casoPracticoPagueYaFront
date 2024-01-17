import { Cliente } from './cliente.model';
import { IntencionPago } from './intencion-pago.model';

export interface RegistroConvenioPago {
  Cliente?: Cliente;
  IntencionPago?: IntencionPago;
}
