# ClinLeads

Protótipo de um assistente de atendimento para clínicas que organiza conversas do WhatsApp e destaca os leads que precisam de atenção humana.

> Status: prova de conceito. O painel usa dados simulados e o webhook está preparado para receber eventos, mas as integrações com banco de dados, IA e envio de mensagens ainda não estão concluídas.

## Problema explorado

Clínicas recebem muitos contatos pelo WhatsApp e podem perder oportunidades entre perguntas repetidas, pedidos de orçamento e tentativas de agendamento. A ideia do ClinLeads é ajudar a equipe a visualizar o funil e assumir rapidamente as conversas mais importantes.

## O que já existe

- Painel responsivo com métricas e lista de leads.
- Estados de atendimento: em conversa, solicitou agendamento, agendado e requer atenção humana.
- Endpoint de webhook com autenticação por segredo.
- Leitura inicial de payloads típicos de provedores de WhatsApp.
- Estrutura preparada para persistência e automação com IA.

## Fluxo proposto

1. O provedor de WhatsApp envia uma mensagem ao webhook.
2. O sistema identifica o contato e registra a interação.
3. A IA classifica a intenção e sugere ou envia uma resposta.
4. Casos sensíveis ou comerciais são encaminhados para uma pessoa.
5. O painel mostra o andamento dos leads e agendamentos.

## Tecnologias

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React

Planejado para as próximas etapas: Supabase, provedor de WhatsApp e API de IA.

## Executar localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). A página inicial direciona para o painel em `/dashboard`.

Para testar o webhook, defina uma variável de ambiente:

```env
WEBHOOK_SECRET=use-um-valor-seguro
```

O endpoint é `POST /api/webhook/whatsapp` e aceita o segredo nos cabeçalhos `Authorization: Bearer ...` ou `x-api-key`.

## Próximas etapas

- Persistir leads e mensagens no Supabase.
- Integrar um provedor real de WhatsApp.
- Adicionar classificação de intenção e respostas assistidas por IA.
- Criar autenticação para o painel.
- Substituir métricas simuladas por dados reais.
- Adicionar testes do webhook e dos fluxos críticos.

## Aprendizados

Este projeto serviu para explorar descoberta de produto, desenho de fluxo de atendimento, integração por webhook e construção rápida de um painel operacional. A prioridade foi validar a experiência antes de investir em uma infraestrutura completa.

## Autor

Criado por [Davi Correia](https://www.linkedin.com/in/davi-correia-b43981418/).
