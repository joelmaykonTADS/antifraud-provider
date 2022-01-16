#User Story 2 (US2)
##Visualizar todos os CPFs que estão na lista restrita 
**Eu** como um usuário de **API** e Product Owner, quero visualizar todos os CPFs que estão na lista restrita para gerar um relatório de controle de CPFs. 
### Critérios de aceite
* Se nenhum CPF existir na lista deve retornar um array vazio. 
### Descrição da API
* É esperado aplicar o padrão 
`{ "type":  InvalidCpfException" "message": "CPF is not valid."}`
 no retorno das mensagens de erro.

 ##### Retorna a lista de CPFs da lista restrita (US4)

|  Item | Descrição  | 
|---|---|
|  URL | /cpf |
|Success Result| Content: [ { "cpf": 64852893055", createdAt: "2019-12- 17T22:22:08.547Z"} ] |

##### <a href="../README.md">Voltar para a página inicial</a>