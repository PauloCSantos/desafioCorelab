Tecnologias utilizadas:

- Docker para criar um ambiente facil de executar independente de Sistema operacional e afins
   - Imagem Node na ultima versao estavel
   - Imagem Mysql na ultima versao estavel
- Nextjs para frontend
   - Utilizei High Order Components
   - Nao utilizei Context (Depois de ver o codigo, com certeza deveria refatorar e utilizar para facilitar)
   - Utilzei somente componentes no cliente(Como implementacao futura construir os eventos de servidor para utilizar mais do next como SSR)
   - Criei um componente usando o padrao de composicao
   - Dividi os componentes grandes em menores(Faltou separar a logica da UI)
- Nodejs para backend
   - Utilizei DDD
   - Diretorios separados de acordo com a Arquitetura limpa
   - Testes unitarios
   - Entidade relativamente rica cumprindo a necessidade
   - SOLID
- Mysql como banco de dados
