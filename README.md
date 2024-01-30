# Client Explorer
 Esse projeto tem como objetivo construir uma aplicação capaz de gerenciar clientes de uma empresa. O projeto é composto por 2 partes: 
 <ul>
  <li>
    Backend:  Um backend responsável por receber, tratar e armazenar informações de clientes.
  </li>
  <li>
    Frontend: Um frontend responsável por mostrar graficamente as informações dos clientes, possibilitar a deleção e a inserção de informações de novos clientes.
  </li>
</ul>

 ## Requisitos

 <table>
   <thead>
     <th> Requisito </th>
     <th> Versão </th>
     <th> Instalação </th>
   </thead>
   <tbody>
     <tr>
       <td>
         NodeJs
       </td>
       <td>
         18.12.0
       </td>
       <td>
         <a href="https://nodejs.org/download/release/v18.19.0/"> Instalação </a>
       </td>
     </tr>
     <tr>
       <td>
         Yarn
       </td>
       <td>
         1.22.19
       </td>
       <td>
         <a href="https://classic.yarnpkg.com/lang/en/docs/install/"> Instalação </a>
       </td>
     </tr>
      <tr>
       <td>
         PostgreSQL
       </td>
       <td>
         16.0-1
       </td>
       <td>
         <a href="https://www.postgresql.org/download/"> Instalação </a>
       </td>
     </tr>
   </tbody>
 </table>
 
 ## Backend 
 
 ### Funcionalidades
 <ul>
   <li> Criação de clientes </li>
   <li> Listagem de clientes </li>
   <li> Deleção de clientes </li>
   <li> Busca de um cliente </li>
   <li> Atualização de um cliente </li>
   <li> Geração da rota mais rápida para visitar todos os clientes cadastrados </li>
 </ul>

 ### Geração de rotas e o algoritmo do caixeiro viajante.
 Para a geração da rota foi utilizado o método de cálculo do vizinho mais próximo, baseado no ponto inicial (0,0), utilizando o método euclidiano de cálculo da distância entre dois pontos. Essa não é a melhor abordagem para a solução desse problema, porém é a mais simples entre as possíveis. Como estamos falando de um cálculo onde os nós (clientes) não possuem restrição de rota, acredito que essa seja uma solução com uma boa taxa de acerto, com um baixo custo performático e com pouca possibilidade de de possíveis futuras manutenções.

 ### Arquitetura
A arquitetura foi uma baseada na arquitetura limpa, apesar de não aplicar todos os conceitos da arquitetura limpa. Onde o sistema é dividido em camadas, com as seguintes responsabilidades:
<ul>
  <li> A primeira camada "domain" tem a responsabilidade de guardar as entidades que reprentam o domínio da aplicação. </li>
  <li> A segunda camada "business" tem a responsabilidade de criar os DTOs (Data Transfer Object), os contratos de funcionamento de serviços e repositórios, os possíveis erros dos useCases, além dos próprios useCases. </li>
  <li> A terceira camada "controller" guardam os controllers da aplicação, onde são aplicadas algumas regras de negócio além da validação dos serializers, que trazem os dados enviados pelo ambiente web. </li>
  <li> A quarta camada é onde ficam as implementações dos repositórios e services, que precisam respeitar os contratos definidos na camada 2, são feitas as injeções de dependência, definição das rotas e dos "controllers" reais que recebem os dados vindos das endpoints da API e repassam para os controllers da camada 3. Nessa camada é onde vem em peso o uso de frameworks, bibliotecas externas, etc. Também podem ser criados nessa camada possíveis adapters que trabalham para traduzir o que é recebido pelo banco de dados, por exemplo, para o que é esperado pelo sistema, controllers, etc.</li>
</ul>

### Banco de dados e variáveis de ambiente
<li>
  O códgo de criação do banco de dados e das tabelas do sistema pode ser encontrado na pasta <a href="https://github.com/silvavinicyus/client-explorer/blob/master/backend/sql/db.sql"> backend/sql </a>
</li>
<li>
  Apesar de não ser das melhores práticas, o arquivo .env foi enviado junto com o projeto contendo as variáveis necessárias para o sistema funcionar corretamente. Caso seja necessário a alteração de alguma variável, é só alterar direto no <a href="https://github.com/silvavinicyus/client-explorer/blob/master/backend/.env"> arquivo </a>.
</li>

### Execução
 Para a execução do projeto é necessária a execução dos seguintes passos: 
   <li> 
     1 - Execução do arquivo DDL disponibilidado <a href="https://github.com/silvavinicyus/client-explorer/blob/master/backend/sql/db.sql"> aqui </a>  para realizar a criação do banco de dados e das tabelas. 
   </li> 
   <li>
     2 - Instação das dependências do projeto, executando o seguinte comando no terminal:      
   </li>
        
     yarn install     
     
   <li>
     3 - Após o fim da instalação, executar o seguinte comando no terminal para executar o projeto e iniciar a API:      
   </li>
        
     yarn dev     

### Testes
 Após a instalação das dependências do projeto, para executar os testes basta executar o seguinte comando no terminal:

     yarn tun test     
 
 
### Tecnologias 
<table>
  <thead>
    <th> Tecnologia </th>
    <th> Versão </th>
  </thead>
  <tbody>
    <tr>
      <td> NodeJs </td>
      <td> 18.1.0 </td>
    </tr>
    <tr>
      <td> Express.js </td>
      <td> 4.18.2 </td>
    </tr>
    <tr>
      <td> TypeScript </td>
      <td> 5.3.3 </td>
    </tr>
    <tr>
      <td> PostgreSQL </td>
      <td> 16.0-1 </td>
    </tr>
    <tr>
      <td> Jest </td>
      <td> 29.5.0 </td>
    </tr>
  </tbody>
</table>

## Frontend

### Funcionalidades
 <ul>
   <li> Criação de clientes </li>
   <li> Listagem de clientes </li>
   <li> Deleção de clientes </li>
   <li> Busca de um cliente </li>   
   <li> Exibição da rota mais rápida para visitar todos os clientes cadastrados </li>
 </ul>

### Tecnologias
<table>
  <thead>
    <th> Tecnologia </th>
    <th> Versão </th>
  </thead>
  <tbody>
    <tr>
      <td> NodeJs </td>
      <td> 18.1.0 </td>
    </tr>
    <tr>
      <td> React </td>
      <td> 18.2.0 </td>
    </tr>
    <tr>
      <td> Vite </td>
      <td> 5.0.8 </td>
    </tr>
    <tr>
      <td> TypeScript </td>
      <td> 5.2.2 </td>
    </tr>
    <tr>
      <td> Material UI </td>
      <td> 5.15.6 </td>
    </tr>
    <tr>
      <td> Axios </td>
      <td> 1.6.7 </td>
    </tr>
    <tr>
      <td> React Icons </td>
      <td> 5.0.1 </td>
    </tr>
  </tbody>
</table>

### Execução
 Para a execução do projeto é necessária a execução dos seguintes passos: 
   <li>
     1 - Instação das dependências do projeto, executando o seguinte comando no terminal:      
   </li>
        
     yarn install     
     
   <li>
     2 - Após o fim da instalação, executar o seguinte comando no terminal para executar o projeto e iniciar a API:      
   </li>
        
     yarn dev     