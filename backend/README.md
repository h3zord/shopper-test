# Entities

## User
### Requisitos funcionais
- [x] O usuário poderá solicitar uma viagem em carro particular de um ponto A até um ponto B.
- [x] Ele poderá escolher entre algumas opções de motoristas e valores e confirmar a viagem.
- [x] Depois também poderá listar o histórico das viagens realizadas.

### Requisitos não funcionais
- [x] O usuário precisa ter um ID único.
- [x] O usuário precisa ter um nome.
- [x] O usuário precisa ter um email.

## Drivers
### Requisitos não funcionais
- [x] O motorista precisa ter ID único.
- [x] O motorista precisa ter um nome.
- [x] O motorista precisa ter uma descrição.
- [x] O motorista precisa ter um carro.
- [x] O motorista precisa ter uma avaliação.
- [x] O motorista precisa ter uma taxa fixa.
- [x] O motorista precisa ter uma kilometragem mínina.

## Travel
### Requisitos não funcionais
- [x] A viagem precisa ter data e hora.
- [x] A viagem precisa ter nome do motorista.
- [x] A viagem precisa ter origem e destino.
- [x] A viagem precisa ter distância e tempo.
- [x] A viagem precisa ter valor.

# Rotas

## POST /ride/estimate
### Responsável por receber a origem e o destino da viagem e realizar os cálculos dos valores da viagem.

### Esse endpoint deve fazer as seguintes validações
- [x] Os endereços de origem e destino recebidos não podem estar em branco.
- [x] O id do usuário não pode estar em branco.
- [x] Os endereços de origem e destino não podem ser o mesmo endereço.

### Após as validações, ele deve:
- [x] Calcular a rota entre a origem e destino usando a API Routes do Google Maps.
- [x] Com base no retorno, deve listar os motoristas disponíveis para a viagem de acordo com a quilometragem mínima que aceitam, cada um com seu respectivo valor.

### O endpoint deverá retornar:
- [x] A resposta original da rota no Google.
- [x] A latitude e longitude dos pontos iniciais e finais.
- [x] A distância e tempo do percurso.
- [x] A lista de motoristas disponíveis ordenados do mais barato para o mais caro, cada um contendo:
- ID e nome do motorista.
- A descrição.
- O carro.
- A avaliação.
- O valor total da corrida.

## PATCH /ride/confirm

### Responsável por confirmar a viagem e gravá-la no histórico.

### Esse endpoint deve fazer as seguintes validações:
- [x] Os endereços de origem e destino recebidos não podem estar em branco.
- [x] O id do usuário não pode estar em branco.
- [x] Os endereços de origem e destino não podem ser o mesmo endereço.
- [x] Uma opção de motorista foi informada e é uma opção válida.
- [x] A quilometragem informada realmente é válida para o motorista selecionado.

### Após as validações ele deve:
- [x] Salvar no banco de dados os dados da viagem realizada.

### Ele NÃO deve fazer:
- [x] Recalcular a rota usando a API do Google Maps.

### Ela irá retornar:
- [x] Resposta de OK ou ERRO dependendo do valor informado.

## GET /ride/{customer_id}?driver_id={id do motorista}

### Responsável por listar as viagens realizadas por um determinado usuário.

### Esse endpoint deve fazer as seguintes validações:
- [x] O id do usuário não pode estar em branco.
- [x] Se um id de motorista for informado, ele precisa ser um id válido.

### Após as validações ele:
- [x] Buscar as viagens realizadas pelo usuário, ordenando da mais recente para a mais antiga.
- [x] Pode receber um query parameter “driver_id” que, se informado, deve filtrar apenas as viagens realizadas pelo usuário com este motorista.

### Ela irá retornar:
- [x] Uma lista com as viagens realizadas.