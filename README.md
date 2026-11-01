# StreamLivre

Catálogo de streaming moderno com player embutido e assistente de IA (Luna).

Foco em conteúdo **legal**: domínio público, Creative Commons e embeds oficiais (YouTube, Vimeo etc.).  
O site funciona no modelo **“catálogo + onde assistir”** — nunca hospeda conteúdo sem licença.

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS**
- Player via iframe (YouTube/Vimeo) ou HTML5
- Dados em JSON local (`src/data/titles.json`)
- Assistente de IA via API compatível com OpenAI
- Deploy pronto para **Vercel**

## Como rodar

```bash
# 1. Clone o repositório
git clone https://github.com/ORION292/streamlivre.git
cd streamlivre

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local e coloque sua AI_API_KEY (opcional)

# 4. Rode em desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Variáveis de ambiente

| Variável         | Descrição                                      | Obrigatório |
|------------------|------------------------------------------------|-------------|
| `AI_API_KEY`     | Chave da API (OpenAI, Grok, etc.)              | Não*        |
| `AI_BASE_URL`    | Base da API (padrão: OpenAI)                   | Não         |
| `AI_MODEL`       | Modelo (padrão: gpt-4o-mini)                   | Não         |
| `ADMIN_PASSWORD` | Senha do painel `/admin` (padrão: admin123)    | Não         |

\* Sem `AI_API_KEY` o chat funciona em modo local com recomendações do catálogo.

## Páginas

| Rota                    | Descrição                          |
|-------------------------|------------------------------------|
| `/`                     | Home com carrosséis e destaque     |
| `/titulo/[id]`          | Página do título + player          |
| `/categoria/[tipo]`     | Listagem por tipo (anime, filme…)  |
| `/busca?q=`             | Busca                              |
| `/admin`                | Painel para cadastrar títulos      |

## Assistente de IA (Luna)

Botão flutuante no canto inferior direito.  
Responde em português, recomenda títulos do catálogo e informa onde assistir oficialmente.

## Adicionando títulos

1. Acesse `/admin` e entre com a senha.
2. Preencha o formulário (capa, sinopse, player URL, onde assistir…).
3. O título é salvo em `src/data/titles.json`.

Ou edite o JSON diretamente.

## Deploy na Vercel

1. Faça push do projeto no GitHub.
2. Importe o repositório na [Vercel](https://vercel.com).
3. Adicione as variáveis de ambiente no painel da Vercel.
4. Deploy automático.

## Aviso legal

Este projeto **não** hospeda, linka nem automatiza acesso a conteúdo protegido por direitos autorais.  
Todo vídeo exibido deve ser de fonte própria, oficial ou livre (domínio público / Creative Commons).

## Licença

MIT — use como quiser.
