export class GetRideDetailsError extends Error {
  constructor() {
    super(
      'Erro ao obter detalhes do trajeto, verifique se as informações estão corretas',
    )
  }
}
