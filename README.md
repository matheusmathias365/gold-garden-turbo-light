# 🕵️ Operação Phishing

> **Você já ia clicar. Agora você treina.**

**Operação Phishing** é um jogo-treino online de conscientização em cibersegurança, desenvolvido para ensinar, de forma interativa, como reconhecer tentativas de **phishing** em diferentes canais: SMS, e-mail, PIX, QR Code e voz.

A proposta é simples:

**Uma mensagem. Um clique. Um golpe.**

Aqui, você aprende a identificar a armadilha **sem construir, executar ou distribuir nenhum golpe real.**

> 🎮 Jogo diretamente no navegador
> 🔒 Sem cadastro
> 📵 Sem envio de dados
> 🧪 Simulação 100% educacional

---

## ⚠️ Aviso legal e educacional

Este projeto é um **material de treinamento exclusivamente educacional**.

Seu conteúdo não apoia, não ensina, não incentiva e não autoriza qualquer prática ilegal ou criminosa.

**Phishing é crime.** Qualquer tentativa de utilizar os conhecimentos ou materiais deste projeto para realizar ataques, fraudes ou obter dados de terceiros será de responsabilidade exclusiva de quem praticar a conduta.

Entre as condutas relacionadas ao tema estão:

* **Fraude eletrônica** — Código Penal, art. 171, § 2º-A, incluído pela Lei nº 14.155/2021.
* **Invasão de dispositivo informático** — Código Penal, art. 154-A, incluído pela Lei nº 12.737/2012.

> **Operação Phishing não é um órgão oficial e não possui vínculo com a Polícia Federal ou qualquer instituição governamental.**
>
> Trata-se de uma **simulação educacional de cibersegurança**.

---

## 🎯 O que é o Operação Phishing?

Você assume o papel de um agente em treinamento e precisa investigar situações simuladas de phishing.

No quartel, quatro arquivos apresentam diferentes vetores de ataque. Cada missão trabalha uma habilidade específica de identificação e prevenção.

Ao concluir uma série, um **certificado digital em PNG (formato 9:16)** é gerado diretamente na tela, contendo o seu *callsign*.

O certificado pode ser salvo e compartilhado.

### Regra principal

> **Reconhecer a armadilha. Nunca montá-la.**

O projeto não fornece:

* páginas falsas de bancos reais;
* kits de phishing;
* ferramentas de ataque;
* instruções para clonagem de voz;
* mecanismos para captura de credenciais;
* métodos para execução de fraudes.

---

# 🗂️ Quartel — Arquivos de treinamento

| Caso     | Série             | Treina      | Conteúdo                                                                   |
| -------- | ----------------- | ----------- | -------------------------------------------------------------------------- |
| **#001** | Operação Phishing | 👁️ O olho  | Briefing, laboratório A–F, terminal SOC, 5 desafios e protocolo pós-clique |
| **#002** | Plantão SOC       | ⚡ A pressa  | Turno de 90 segundos, fila de recados e classificação de mensagens         |
| **#003** | O QR              | 🔎 O código | Cardápio, pedágio e PIX simulados; análise de destino e contexto           |
| **#004** | A Voz             | 📞 O canal  | Áudios simulados de chefe, familiar, banco, RH e diretor                   |

Cada arquivo aborda um vetor diferente e trabalha a capacidade de **parar, verificar e decidir antes de clicar ou executar uma ação**.

---

# 🎮 Como jogar

1. Abra o site pelo navegador, no computador ou celular.
2. Escolha um **callsign** ou continue anonimamente.
3. Leia e aceite o aviso de uso educacional.
4. A introdução visual é parte da experiência e pode ser ignorada.
5. Escolha um arquivo no quartel.
6. Analise as pistas apresentadas durante a missão.
7. Identifique a ameaça e arquive o caso.
8. O progresso só é registrado após o arquivamento.
9. Ao concluir a série, o certificado digital é gerado na tela.

> **Nada precisa ser enviado para concluir uma missão.**

---

# 🛡️ O que este jogo não faz

Para manter o projeto estritamente educacional e seguro:

* ❌ Não ensina a criar páginas falsas.
* ❌ Não fornece kits de phishing.
* ❌ Não ensina clonagem de voz.
* ❌ Não utiliza logotipos reais de instituições financeiras.
* ❌ Não solicita CPF, senha, cartão ou PIX verdadeiro.
* ❌ Não coleta IP, câmera, microfone ou localização.
* ❌ Não envia dados pessoais para servidores.
* ❌ Não envia certificados físicos.
* ❌ Não envia e-mails automaticamente.

A introdução contendo frases como **“seus dados foram ranqueados”** faz parte da narrativa e é apenas uma simulação.

> **Na vida real, dados podem ser utilizados como matéria-prima para golpes. Aqui, nenhum dado é vendido ou utilizado para essa finalidade.**

---

# 🔐 Privacidade

O projeto foi desenvolvido com foco em **privacidade e processamento local**.

* Não é necessário criar uma conta.
* Não há cadastro de usuário.
* O *callsign* permanece no navegador do dispositivo.
* O progresso é armazenado localmente.
* Câmera, microfone e GPS não são utilizados.
* Não há coleta de dados pessoais para execução das missões.
* Os QR Codes utilizados no treinamento não direcionam para sites reais.

### Armazenamento local

O progresso e as informações necessárias para a experiência permanecem no **navegador do próprio dispositivo**.

---

# 💻 Executando localmente

## Requisitos

* [Node.js](https://nodejs.org/) **22 ou superior**
* npm

## Instalação

```bash
git clone https://github.com/SEU-USUARIO/operacao-phishing.git
cd operacao-phishing
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Depois, abra no navegador o endereço informado pelo terminal.

Por padrão, o projeto utiliza:

```text
http://localhost:8080
```

## Scripts disponíveis

```bash
npm run build
```

Gera o build de produção.

```bash
npm run typecheck
```

Executa a verificação de tipos do TypeScript.

```bash
npm test
```

Executa os testes automatizados dos casos e das rotinas de sanitização.

---

# 🧰 Stack

O projeto utiliza:

* **React**
* **TypeScript**
* **TanStack Router / Start**
* **Vite**
* **Tailwind CSS v4**
* **Zustand**

### Arquitetura de experiência

O projeto combina uma interface de jogo com elementos de treinamento em segurança:

**Dossiê SOC · Terminal CRT · Investigação · Simulação · Aprendizado**

A experiência visual utiliza uma estética de **arquivo confidencial / centro de operações de segurança**, com interface escura, verde fosforescente, elementos de terminal e referências visuais de investigação.

Todo o conteúdo é apresentado em **PT-BR**.

---

# 🎓 Certificado

Ao concluir uma série, o jogador recebe um certificado digital correspondente à operação realizada.

O certificado:

* é gerado na própria interface;
* utiliza formato **PNG 9:16**;
* inclui o *callsign* informado pelo jogador;
* pode ser salvo pelo usuário;
* pode ser compartilhado em redes sociais.

O certificado representa **conclusão de uma experiência educacional**, não uma certificação profissional ou oficial em cibersegurança.

---

# 📚 Objetivo educacional

O objetivo do projeto é desenvolver hábitos simples que podem evitar incidentes reais:

> **Pare. Observe. Verifique. Só então decida.**

O treinamento busca reforçar a identificação de sinais como:

* urgência artificial;
* pressão emocional;
* remetentes suspeitos;
* links inesperados;
* QR Codes desconhecidos;
* solicitações financeiras;
* alteração de canais de contato;
* pedidos de informação sensível;
* mensagens que tentam impedir a verificação.

---

# 🤝 Contribuição

Contribuições voltadas à **educação, acessibilidade, usabilidade, correções e segurança do projeto** são bem-vindas.

Ao contribuir, mantenha a proposta original:

> **Ensinar a reconhecer ataques — não ensinar a executá-los.**

Sugestões e melhorias devem preservar o caráter exclusivamente educacional da plataforma.

---

# 📜 Licença e uso

Consulte o arquivo de licença deste repositório para conhecer as condições de uso e distribuição do projeto.

O conteúdo educacional não deve ser utilizado para realizar ataques, fraudes, engenharia social ou qualquer atividade ilícita.

---

# 👤 Créditos

**Operação Phishing**

Projeto criado para **conscientização e treinamento em cibersegurança**.

Divulgação: **@mathiasmfernandes**

---

> **Use. Treine. Compartilhe o conhecimento.**
>
> **Não use isto para atacar ninguém.**

