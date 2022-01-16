#User Story 2 (US2)
##Remover um CPF da lista restrita

**Eu** como um usuário de **API** e Product Owner, quero remover um CPF da lista restrita.

### Critérios de aceite
* Se o CPF não existir deve retornar uma exceção do tipo "NotFoundCpfException". 
* Se o CPF for inválido deve retornar a exceção do tipo "InvalidCpfException".

### Descrição da API
* É esperado aplicar o padrão 
`{ "type":  InvalidCpfException" "message": "CPF is not valid."}`
 no retorno das mensagens de erro.

 ##### Remove um CPF adicionado na lista restrita (US3)

|  Item | Descrição  | 
|---|---|
|  URL | /cpf/{cpf}  |

##### <a href="../README.md">Voltar para a página inicial</a>