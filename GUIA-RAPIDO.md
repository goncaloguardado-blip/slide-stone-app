# 🚀 GUIA RÁPIDO — Pôr a app a funcionar em 10 minutos

**Para o Rei começar a usar JÁ a app, sem conhecimentos técnicos.**

---

## ✅ O que vai conseguir no fim
- Endereço web próprio (ex: `slide-stone.vercel.app`) com HTTPS
- App instalada no iPhone, no MacBook e no telemóvel dos encarregados
- Funciona offline em obra
- 100% gratuito para sempre

---

## 📋 Antes de começar — só precisa disto

- O ficheiro **`slide-stone-app.zip`** (a pasta do projeto)
- Um navegador (Safari, Chrome)
- 10 minutos

---

## 1️⃣ CRIAR CONTA NO GITHUB *(2 minutos)*

GitHub é onde fica o código. Gratuito e seguro.

1. Vá a 👉 **https://github.com/signup**
2. Email, password, username (pode ser `slidestone`)
3. Confirme o email recebido na caixa de correio

✅ Pronto.

---

## 2️⃣ CRIAR CONTA NO VERCEL *(1 minuto)*

Vercel é quem coloca a app online. Também gratuito.

1. Vá a 👉 **https://vercel.com/signup**
2. Clique em **"Continue with GitHub"** (a opção do meio, com o gato preto)
3. Autorize com a sua conta GitHub
4. Quando perguntar, escolha o plano **Hobby (Free)** — chega e sobra

✅ Pronto.

---

## 3️⃣ CARREGAR O CÓDIGO NO GITHUB *(3 minutos)*

1. No GitHub, no canto superior direito clique no **`+`** → **New repository**
2. Em "Repository name" escreva: `slide-stone-app`
3. Deixe **Public** marcado
4. Clique em **Create repository** (botão verde no fundo)

5. Na página seguinte, vai ver um link azul que diz:

   > **uploading an existing file**

   Clique nele.

6. Aparece uma área grande a dizer **"Drag files here..."**

7. Abra o **Finder** (Mac) e descompacte o `.zip` se ainda não o fez.

8. Selecione **TODOS os ficheiros e pastas DENTRO da pasta `slide-stone-app`** (não a pasta em si — apenas o conteúdo) e arraste para a área do GitHub.

   📌 Atenção: tem de selecionar `package.json`, `vite.config.js`, `index.html`, e as pastas `src/` e `public/` — tudo junto.

9. Espere o upload (10-30 segundos).
10. No fundo da página, em "Commit changes", clique no botão verde **Commit changes**.

✅ Pronto. O código está online no GitHub.

---

## 4️⃣ COLOCAR A APP ONLINE *(2 minutos)*

1. Vá ao **Vercel** → https://vercel.com/dashboard
2. Clique em **Add New...** (canto superior direito) → **Project**
3. Aparece a lista dos seus repositórios GitHub. Encontre **`slide-stone-app`** e clique em **Import**
4. **Não mexa em nada.** Apenas clique em **Deploy** (botão preto em baixo)
5. Veja a animação de fogo de artifício 🎉
6. Espere 60-90 segundos
7. Aparece o seu link: algo como **`slide-stone-app-abc123.vercel.app`**

✅ **A SUA APP ESTÁ ONLINE!**

Clique em **Visit** ou copie o link para o telemóvel.

---

## 5️⃣ INSTALAR NO IPHONE *(30 segundos)*

1. No iPhone, abra o **Safari** (não Chrome — só funciona no Safari para iPhone)
2. Vá ao link da app (o `*.vercel.app`)
3. Toque no ícone de **partilha** (quadradinho com seta para cima — em baixo)
4. Role para baixo e toque em **"Adicionar ao Ecrã Principal"**
5. Confirme com **Adicionar**

✅ A app aparece como ícone **S** laranja no telemóvel, igual a qualquer outra app nativa.

---

## 6️⃣ INSTALAR NO MACBOOK *(30 segundos)*

1. Abra o link no **Safari** ou **Chrome**
2. **Safari:** Menu **Ficheiro** → **Adicionar à Dock**
3. **Chrome:** Na barra de endereços, lado direito, ícone **⊕ Instalar** → clique
4. A app fica no Launchpad / Dock como qualquer aplicação Mac

---

## 7️⃣ INSTALAR EM TELEMÓVEIS ANDROID *(para os encarregados)*

1. Partilhe o link via WhatsApp aos encarregados
2. Eles abrem no Chrome
3. Menu (3 pontos) → **"Instalar app"** ou **"Adicionar à página inicial"**

✅ Fica instalada e funciona offline em obra.

---

## 🛡️ MUITO IMPORTANTE — Backups

Os dados ficam no telemóvel/computador. Se trocar de equipamento sem backup, **perde tudo**.

**Faça backup todas as sextas-feiras:**
1. Abra a app
2. Menu lateral → **Sistema → Backup**
3. Clique em **Descarregar backup**
4. Guarde o ficheiro **`slide-stone-backup_DATA.json`** no iCloud Drive (ou Google Drive)

Para restaurar num novo equipamento: **Sistema → Backup → Selecionar ficheiro**.

---

## 🆕 Como atualizar a app no futuro

Se eu lhe enviar uma versão nova do ficheiro `App.jsx`:

1. Vá ao GitHub → seu repositório → pasta `src/` → ficheiro `App.jsx`
2. Clique no botão do **lápis ✏️** (canto superior direito do ficheiro) → **Edit**
3. Apague tudo (`Cmd+A` → `Delete`) e cole o código novo
4. Em baixo, clique em **Commit changes**
5. Em ~30 segundos o Vercel rebuilda e os utilizadores recebem a versão nova ao abrir a app

Os dados existentes **mantêm-se**.

---

## 🆘 Se algo correr mal

**"O Vercel diz erro de build"** → Provavelmente faltou copiar um ficheiro. Volte ao passo 3 e confirme que carregou TODA a estrutura (`package.json`, pastas `src/`, `public/`, etc.)

**"Os dados desapareceram"** → Restaure o último backup (Sistema → Backup → Selecionar ficheiro)

**"A app abre branca"** → Aguarde 1 minuto e refresque. Se persistir, o backup ainda está seguro — basta restaurar.

---

## 💰 Custos

- GitHub: **Gratuito**
- Vercel: **Gratuito** (até 100GB de tráfego/mês — chega para 100 utilizadores)
- Domínio próprio (opcional): **~€10/ano** se quiser `gestao.slidestone.pt`

**Total: 0€** se aceitar o endereço `*.vercel.app`.

---

*Slide & Stone SA · Construção Civil*
