# User Story (US1)
## Adicionar CPF na lista restrita

**Eu** como um usuário de **API** e Product Owner, quero adicionar um CPF na lista restrita para consulta futura.

### Critérios de aceite
* Deve ser adicionado um CPF válido na lista, sem dígitos repetidos e formatação.
* Se o CPF for inválido deve retornar a exceção do tipo "InvalidCpfException".
* Se um CPF existir na lista deve retornar a exceção do tipo "ExistsCpfException".
* O CPF adicionado na lista deve conter a data de inclusão (createdAt) no formatado ISO 8601 - UTC.

### Descrição da API
* É esperado aplicar o padrão 
`{ "type":  InvalidCpfException" "message": "CPF is not valid."}`
 no retorno das mensagens de erro.

 ##### Adicionar um CPF na lista restrita (US01)

|  Item | Descrição  | 
|---|---|
|  URL | /cpf  |
|  Data params | { "cpf": "64852893055" }  |

##### <a href="../README.md">Voltar para a página inicial</a>