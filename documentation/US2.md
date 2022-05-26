# User Story 2 (US2)
## Verificar se um determinado CPF está na lista restrita

**Eu** como um usuário de **API** e Product Owner, quero verificar se um CPF esta na lista restrita.

### Critérios de aceite
* Se um CPF existir deve retornar o CPF e a data de criação (createdAt) no formato ISO 8601 - UTC. 
* Se o CPF não existir deve retornar uma exceção do tipo "NotFoundCpfException". 
* Se o CPF for inválido deve retornar a exceção do tipo "InvalidCpfException". 
### Descrição da API
* É esperado aplicar o padrão 
`{ "type":  InvalidCpfException" "message": "CPF is not valid."}`
 no retorno das mensagens de erro.

 ##### Verificar se um CPF está adicionado na lista restrita (US2)

|  Item | Descrição  | 
|---|---|
|  URL | /cpf/{cpf}  |
|  Success Result | Content: { "cpf": "64852893055", createdAt: "2019-12-17T22:22:08.547Z"}  |

##### <a href="../README.md">Voltar para a página inicial</a>
