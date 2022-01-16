<h1 id="logo" align="center">
  <a name="logo" href="#"><img src="./documentation/assets/logo.png" alt="Bear Stone Smart Home" width="300"></a>
  <br>
  Project Antifraud Provider
</h1>

<p align="justify">
  The <b> Antifraud Provider </b>is a set of definitions to help you integrate your team consume our <b> services of API</b> with maximum agility. 

  O Provedor de Anti-fraude é um conjuto de definições para ajudar você a integrar seu time consumindo nossos <b> serviços de API </b>com o máximo de agilidade.
</p>
<h2>
  Contextualização do Problema
</h2>
Atualmente o time de análise antifraude do ecommerce realiza um controle de CPFs em
uma planilha eletrônica. Nesta planilha são adicionados CPFs com risco de fraude. Com o
aumento da nossa base de clientes têm ficado cada vez mais difícil manter o controle
manual.

<h2>
  Requisitos funcionais
</h2>
<table>
  <tr>
    <td> User Story </td> 
    <td> Funcionalidade </td>
  </tr>
  <tr>
    <td>
     US1
    </td>
    <td>
      <a href="./documentation/US1.md" target=""_blank>
       Adicionar CPF na lista restrita
      </a>
    </td>
  </tr>
  <tr>
    <td> US2</td>
    <td> 
      <a href="./documentation/US2.md">
       Verificar se um determinado CPF está na lista restrita
      </a>
    </td>
  </tr>
  <tr>
    <td> US3</td>
    <td>
      <a href="./documentation/US3.md">
        Remover um CPF da lista restrita
      </a>
    </td>
  </tr>
  <tr>
    <td>
     US4
    </td>
    <td>
      <a href="./documentation/US4.md">
       Visualizar todos os CPFs que estão na lista restrita
      </a>
    </td>
  </tr>
</table>
<h2>
  Requisitos não funcionais
</h2>
<li> A aplicação expoẽ suas funcionalidades em um serviço Restful utlizando o formato JSON
</li>
<li>
A plantaforma de desenvolvimento é em Node.js (Javascript/Typescript).
<li>
 O Framework utilizado é o <b>Nest.JS</b> quem tem o foco maximizar a produtividade na criação de <b>API's RESTful</b>
</li>
<li>
  O Banco de dados usado é o mongoDB
</li>
<li>
  Uso de TDD para manter uma documentação de como o código foi construido, reduzir falhas e testar unitáriamente da forma mais eficaz os critérios de aceite.
</li>
<li>
  Uso de container <b> Docker </b> para ter o ambiente local pré-configurado similar ao ambiente produtivo.

  comando para criar a imagem: `docker build .`
  comando para executar o projeto: `docker-compose up`
</li>

<h2>
  Motivos na escolha do framework
</h2>
<h2>
  Motivos na escolha do banco de dados
</h2>
<h2>
  Arquitetura Limpa  
</h2>

<h2>
  Documentação - Swagger
</h2>

<h2>
  Notifier Service - Amazon SNS
</h2>
<li>
  O serviço de notificação da AWS será usado como um notificador via email para quando alguém testar os endpoints fazendo alguma request para nossos serviços.
</li>
<h2>
  Fluxo de implantação
</h2>

##### <a href="../README.md">Voltar para o Início</a>