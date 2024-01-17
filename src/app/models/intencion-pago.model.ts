export interface IntencionPago {
  CedulaCliente?: string;
  CodTipoDeuda?: string;
  MontoIntencionPago: number;
  HorarioDesde: string;
  HorarioHasta: string;
  TelefonoContactabilidad?: string;
  FechaIntencion: string;
}
