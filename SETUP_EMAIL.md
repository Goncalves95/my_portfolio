# 📧 Configuração do Sistema de Email (Resend)

## 🚀 Passos para Configurar o Envio de Emails

### 1. Criar Conta Resend
1. Aceda a [https://resend.com](https://resend.com)
2. Crie uma conta gratuita
3. Verifique o seu email

### 2. Obter API Key
1. No dashboard do Resend, vá para **API Keys**
2. Clique em **Create API Key**
3. Dê um nome (ex: "Portfolio Contact Form")
4. Copie a API Key gerada

### 3. Configurar Environment Variable
1. Crie o ficheiro `.env.local` na raiz do projeto:
```bash
# Copie o ficheiro exemplo
cp .env.local.example .env.local
```

2. Edite o `.env.local` e adicione a sua API Key:
```env
RESEND_APIKey=re_aSdFgHjKlMnOpQrStUvWxYz123456789
```

### 4. Instalar Dependências
```bash
npm install
```
ou
```bash
yarn install
```

### 5. Testar o Sistema
1. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

2. Aceda a `/contact` e preencha o formulário
3. O email será enviado para: `fernandojcg22@gmail.com`

## 📋 Características Implementadas

### ✅ Funcionalidades do Formulário
- **Validação de Campos**: Nome, email e mensagem obrigatórios
- **Validação de Email**: Formato de email válido
- **Feedback Visual**: Mensagens de sucesso/erro
- **Estado de Carregamento**: Botão "Sending..." durante envio
- **Reset Automático**: Limpa formulário após envio bem-sucedido

### ✅ Características do Email
- **Design Profissional**: Template HTML com cores do portfolio
- **Informações Completas**: Nome, email, telefone, serviço, mensagem
- **Reply-To**: Responder diretamente para o email do remetente
- **Timestamp**: Data e hora do envio (fuso de Zurique)

### ✅ Segurança
- **Environment Variables**: API key protegida
- **Validação Server-Side**: Verificação de dados no backend
- **Rate Limiting**: Proteção contra spam (implementada pelo Resend)

## 🎨 Exemplo de Email Recebido

O email enviado terá este aspeto:

```
Nova Mensagem de Contacto
Portfolio Fernando Gonçalves

Informações do Contacto
Nome: João Silva
Email: joao.silva@email.com
Telefone: +351 912 345 678
Serviço: Web Development

Mensagem:
[Conteúdo da mensagem aqui...]

Esta mensagem foi enviada através do formulário de contacto do portfolio
Data: 26/04/2026, 10:50:00
```

## 🔧 Configuração para Produção (Vercel)

1. No dashboard Vercel do seu projeto:
2. Vá para **Settings → Environment Variables**
3. Adicione:
   - **Name**: `RESEND_API_KEY`
   - **Value**: A sua API Key do Resend
4. Re-deploy o projeto

## 📈 Limites do Plano Gratuito
- **3.000 emails/mês** (plano gratuito)
- **100 emails/dia** (limite diário)
- Upgrade disponível para maiores volumes

## 🚨 Troubleshooting

### Email não chega:
1. Verifique a API Key no `.env.local`
2. Confirme que o email `fernandojcg22@gmail.com` está correto
3. Verifique a pasta de spam

### Erro ao enviar:
1. Confirme que instalou as dependências: `npm install`
2. Verifique os logs do console para detalhes do erro
3. Teste com valores válidos no formulário

### Problemas com Vercel:
1. Verifique as environment variables no dashboard
2. Confirme que fez re-deploy após adicionar a API Key
3. Verifique os logs da função serverless

## 🎯 Benefícios
- **Profissional**: Template de email personalizado
- **Seguro**: API key protegida e validação robusta
- **Confiável**: Serviço Resend (mesma empresa do Vercel)
- **Escalável**: Funciona em desenvolvimento e produção
- **Responsivo**: Feedback visual para o utilizador
