# Simulador do Caos

### Variáveis de Ambiente

**SIGTERM_SECONDS**

Segundos para encerrar a aplicação

### Endpoints Disponíveis

#### Stress de CPU
```
PUT /stress/cpu?duration={segundos}
```
Simula estresse de CPU criando 1000 workers por um período determinado.
- **Parâmetro**: `duration` (opcional, padrão: 30 segundos)
- **Exemplo**: `PUT /stress/cpu?duration=60`

#### Stress de Memória
```
PUT /stress/memory?duration={segundos}
```
Simula estresse de memória alocando 1GB de RAM por um período determinado.
- **Parâmetro**: `duration` (opcional, padrão: 30 segundos)
- **Exemplo**: `PUT /stress/memory?duration=120`

#### Health Check
```
GET /health
```
Verifica se a aplicação está saudável.

#### Readiness Check
```
GET /ready
```
Verifica se a aplicação está pronta para receber requisições.

#### Marcar como Não Saudável
```
PUT /unhealth
```
Marca a aplicação como não saudável.

#### Indisponibilizar Temporariamente
```
PUT /unreadfor/{seconds}
```
Torna a aplicação indisponível por um período específico.
- **Parâmetro**: `seconds` (na URL)
- **Exemplo**: `PUT /unreadfor/60`

#### Encerrar com Sucesso
```
PUT /exit/success
```
Encerra a aplicação com código de saída 0.

#### Encerrar com Falha
```
PUT /exit/fail
```
Encerra a aplicação com código de saída 1.
