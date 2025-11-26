# Decorações e Ícones - Tema Pastel Fofo

## PNGs Necessários

### 1. Flor Decorativa
**Nome do arquivo:** `flower.png`  
**Formato:** PNG  
**Tamanho:** 24x24px  
**Prompt base:** Uma florzinha simples e kawaii em estilo cartoon, com pétalas arredondadas em tons pastel rosa e lilás, centro amarelo suave, sem caule, formato circular para encaixar em elementos decorativos.

### 2. Estrela Decorativa
**Nome do arquivo:** `star.png`  
**Formato:** PNG  
**Tamanho:** 24x24px  
**Prompt base:** Estrela de 5 pontas kawaii em estilo cartoon, preenchida com gradiente pastel de azul para roxo, contorno suave, formato arredondado nas pontas.

### 3. Nota Musical Decorativa
**Nome do arquivo:** `music.png`  
**Formato:** PNG  
**Tamanho:** 24x24px  
**Prompt base:** Nota musical (semicolcheia) em estilo cartoon fofo, cor pastel mint, com linhas curvas suaves e formato arredondado.

### 4. Coração Decorativo
**Nome do arquivo:** `heart.png`  
**Formato:** PNG  
**Tamanho:** 24x24px  
**Prompt base:** Coração fofo em estilo cartoon, preenchido com gradiente de rosa para vermelho pastel, contorno suave e arredondado.

### 5. Nuvem Moldura
**Nome do arquivo:** `cloud.png`  
**Formato:** PNG  
**Tamanho:** 200x80px (flexível)  
**Prompt base:** Forma de nuvem kawaii com bordas onduladas suaves, preenchimento transparente, contorno em rosa pastel de 4px, para usar como moldura decorativa.

### 6. Onda Moldura
**Nome do arquivo:** `line.png`  
**Formato:** PNG  
**Tamanho:** 200x80px (flexível)  
**Prompt base:** Forma ondulada suave estilo onda do mar, preenchimento transparente, contorno em lilás pastel de 6px, para usar como moldura decorativa alongada.

## Localização dos Arquivos
Todos os PNGs devem ser colocados em: `public/icons/kwaitheme/`

## Como Usar nos Componentes
```tsx
// Exemplo de uso em botões
<img src="/icons/kwaitheme/flower.png" className="absolute -top-1 -left-1 w-4 h-4 animate-pulse" />

// Exemplo de uso em molduras
<div className="fofo-cloud">
  <img src="/icons/kwaitheme/cloud.png" className="absolute inset-0 w-full h-full" />
  Conteúdo aqui
</div>
```

## Notas Técnicas
- Todos os PNGs devem ter fundo transparente
- Cores devem usar os tons pastel definidos: #F4B6D9, #DCC7FF, #D6F1FF, #E3FFE8, #FFF2B8
- Estilo deve ser cartoon/kawaii com formas arredondadas
- Sem elementos complexos, manter simplicidade para bom desempenho