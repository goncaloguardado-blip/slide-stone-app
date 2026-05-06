# Slide & Stone SA — App de Gestão

App completa de gestão de obras, orçamentos, equipa, ferramentas e estaleiro para construção civil.

---

## 🚀 OPÇÃO 1 — Usar JÁ no telemóvel/computador (mais rápido, 5 minutos)

A forma mais rápida: pôr a app online, com endereço próprio, instalar como app no telemóvel.

### Passo 1 — Criar conta GitHub
1. Vá a https://github.com e crie uma conta gratuita (use o seu email)
2. Confirme o email

### Passo 2 — Criar conta Vercel
1. Vá a https://vercel.com
2. Clique em **"Sign Up"** e escolha **"Continue with GitHub"**
3. Autorize o Vercel a aceder ao GitHub

### Passo 3 — Carregar o código no GitHub
1. No GitHub, clique no **+** no canto superior direito → **New repository**
2. Nome: `slide-stone-app` (ou outro à sua escolha)
3. Deixe **Public** (ou Private se preferir, ambos funcionam)
4. Clique em **Create repository**
5. Na página seguinte, clique em **"uploading an existing file"**
6. Arraste **TODA a pasta `slide-stone-app`** (descompactada) para a página
7. Clique em **Commit changes**

### Passo 4 — Ligar Vercel ao GitHub
1. No Vercel, clique em **"Add New..."** → **Project**
2. Encontre o seu repositório `slide-stone-app` e clique em **Import**
3. Não mexa em nada nas configurações — o Vercel reconhece automaticamente
4. Clique em **Deploy**
5. Espere ~1 minuto. A app fica online em endereço tipo `slide-stone-app.vercel.app`

### Passo 5 — Instalar como app no telemóvel
**iPhone (Safari):**
1. Abra o link da app no Safari
2. Toque no ícone de partilha (quadradinho com seta para cima)
3. **"Adicionar ao Ecrã Principal"**
4. A app aparece como um ícone normal no telemóvel

**Android (Chrome):**
1. Abra o link no Chrome
2. Menu (3 pontos) → **"Instalar app"** (ou "Adicionar à página inicial")
3. Confirma e fica instalada

**Computador (Mac/Windows/Linux):**
- Abra o link no Chrome/Edge → Na barra de endereços aparece um ícone **⊕ Instalar** → clique. Fica como app nativa.

✅ **A app funciona offline** depois de instalada — pode usar em obra sem internet.

---

## 🌐 OPÇÃO 2 — Usar com domínio próprio (slidestone.pt, etc.)

Se quiser um endereço profissional como `gestao.slidestone.pt`:

1. Compre um domínio em https://nic.pt (`.pt`) ou https://namecheap.com (`.com`, `.app`)
2. No Vercel, vá ao seu projeto → **Settings** → **Domains**
3. Adicione o seu domínio
4. O Vercel mostra-lhe os DNS records que tem de configurar no registar do domínio
5. Em ~10 minutos a app fica acessível no seu domínio com HTTPS automático

Custo: ~€10/ano pelo domínio. Hospedagem **continua a ser gratuita**.

---

## 💻 OPÇÃO 3 — Correr localmente no seu Mac (para desenvolvimento)

Se quiser correr no seu próprio computador:

### Pré-requisito: instalar Node.js
1. Vá a https://nodejs.org → descarregue a versão LTS
2. Instale (next, next, next)

### Correr a app
Abra o Terminal e:

```bash
cd /caminho/para/slide-stone-app
npm install        # instala dependências (1-2 minutos, só primeira vez)
npm run dev        # arranca a app
```

A app abre em http://localhost:5173 — pode testar antes de fazer deploy.

---

## 📱 Como usar a app

### Início — Equipa primeiro
A ordem recomendada para começar a alimentar a app:

1. **Equipa** → adicione todos os trabalhadores (com função, telefone e custo/hora)
2. **Ferramentas** → adicione frota e equipamentos (com horas-motor)
3. **Fornecedores** → registe os principais
4. **Obras** → crie a primeira obra
5. **Cronograma** → adicione as tarefas com prazos
6. **Plano Diário** → atribua equipa e tarefas para hoje
7. No fim do dia → **Partes Diárias** + **Galeria** com fotos
8. → **Relatório Diário para Cliente** envia tudo organizadinho

### Atalhos úteis
- `⌘ K` (Mac) ou `Ctrl K` (Windows) — Pesquisa global
- O sino 🔔 no topo agrega TODOS os alertas: tarefas atrasadas, faturas vencidas, manutenções, formações a expirar
- Botão **Modelo** em cada secção — imprime folha em branco para preencher à mão em obra

### Exportações disponíveis
- **Excel real (.xlsx)** com fórmulas → na lista de Orçamentos, ícone verde
- **PowerPoint real (.pptx)** com Gantt e semáforo → no Cronograma
- **CSV** para Excel/Numbers → Faturas, Despesas, Partes Diárias
- **PDF / Imprimir** → Faturas, Relatórios, Folhas Modelo, Relatório Diário
- **WhatsApp / Email** direto do Relatório Diário ao cliente

### Backup
**MUITO IMPORTANTE**: Os dados estão guardados no navegador (localStorage). Se trocar de telemóvel ou limpar o browser, **perde tudo**.

→ Vá a **Sistema → Backup → Descarregar backup** uma vez por semana.
→ Guarde o ficheiro JSON no Drive, iCloud, ou disco externo.
→ Para restaurar (em outro telemóvel ou após reinstalar): **Restaurar backup**.

---

## 🔄 Atualizar a app no futuro

Se eu lhe der uma versão nova do `App.jsx`:

1. No GitHub, abra o seu repositório
2. Vá a `src/App.jsx`
3. Clique no lápis ✏️ (Edit) → cole o novo código → **Commit changes**
4. O Vercel rebuildá em segundos automaticamente
5. Os utilizadores recebem a versão nova ao reabrir a app

Os dados permanecem — não se perde nada.

---

## ❓ Problemas comuns

**"A app não abre offline"** → Tem de a abrir online uma primeira vez para o Service Worker registar. Depois funciona offline.

**"Os dados desapareceram"** → O navegador fez limpeza ou foi alterado o domínio. Restaure o backup mais recente.

**"Imagens estão grandes"** → A galeria comprime automaticamente. Mas se acumular muitas, use **Backup → exportar** e depois **apagar tudo**, depois **restaurar** — limpa e otimiza.

**"Excel não abre direito"** → No Mac, abra com Numbers e exporte para xlsx, ou abra direto no Excel/LibreOffice. As fórmulas funcionam em todos.

---

## 📞 Suporte

Construído à medida para a Slide & Stone SA. Para alterações ou novas funcionalidades, diga.

**Versão atual:** 2.0 · Janeiro 2026

---

*Slide & Stone SA — Construção Civil · Terraplanagens · Reabilitação*
