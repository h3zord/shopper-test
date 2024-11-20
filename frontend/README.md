## Solicitação de viagem

- [] Deve conter um formulário com os campos para informar o id do usuário, o endereço de origem e o endereço de destino e um botão para estimar o valor da viagem.
- [] Deve fazer a requisição para a API passando os parâmetros necessários, ao receber a resposta deve exibir a tela de opções de viagem.

## Opções de viagem
- [] Deve mostrar um mapa estático com a rota retornada na estimativa plotada, indicando o ponto A e o ponto B.
- [] Deve mostrar a lista de opções de motoristas com:
- nome.
- descrição.
- veículo.
- avaliação.
- valor da viagem.

- [] Para cada motorista deve ter um botão “Escolher”, que irá fazer a requisição para a API e confirmar a viagem.
- [] Após confirmar a viagem, deve direcionar automaticamente para a tela de histórico de viagens.

### Histórico de viagens
- [] Deve mostrar um campo para informar o id do usuário, um
seletor de motorista, com uma opção para mostrar todos e um
botão para aplicar o filtro.
- [] Ao aplicar o filtro, deve exibir a lista das viagens realizadas, com:
- data e hora da viagem.
- nome do motorista.
- origem.
- destino.
- distância.
- tempo.
- valor.

### Tratamento de erros
- [] Em todas as telas, os erros devem ser exibidos para o usuário, permitindo que ele verifique o problema e tente novamente.