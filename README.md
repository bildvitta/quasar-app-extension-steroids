![Quasar Steroids](https://github.com/bildvitta/quasar-app-extension-steroids/raw/master/docs/steroids.png)

Este repositório contém métodos, componentes e estilos que auxiliarão na construção de uma aplicação C.R.U.D. utilizando **Vue** e **Quasar**. Foi inicialmente projetada para ser utilizada em conformidade com os padrões do [Django REST framework](https://www.django-rest-framework.org/), mas pode ser adaptada em qualquer _back-end_ desde que mantenha os padrões de origem e retorno.

## Conteúdo

- **Boot:**
  - Authentication
  - Axios defaults
  - Axios request/response transformers
  - Brand colors
  - Error pages
  - Force HTTPS
  - Router history
- **Components:**
  - AppBar
  - AppMenu
  - Autocomplete
  - Avatar
  - BreakLine
  - CheckboxGroup
  - Copy
  - DatetimeInput
  - Debugger
  - DecimalInput
  - Delete
  - DialogRouter
  - Field
  - Filters
  - FormGenerator
  - FormView
  - Input
  - ListView
  - PageHeader
  - Profile
  - Resizer
  - SingleView
  - Sortable
  - TableGenerator
  - TabsGenerator
  - Uploader
- **Directives:**
  - v-test
- **Filters:**
  - asset
  - booleanLabel
  - date
  - dateTime
  - humanDate
  - humanize
  - money
  - optionLabel
  - parseValue
  - percent
  - time
- **Library:**
  - company
  - greatestCommonDivisor
  - hasPermissions
  - storeModule
- **Styles**
  - Colors
  - Container
  - Line height
  - Opacity
  - Text

## Variáveis de ambiente

| Variável | Descrição |
|:-|:-|
| `BUCKET_URL` | Endereço de hospedagem dos _assets_. |
| `SERVER_BASE_URL` | Endereço base de acesso ao servidor. |

## Instalação

Para instalar esta extensão do Quasar, basta utilizar a linha de comando.

```
$ quasar ext add @bildvitta/steroids --scope=@github
```

**Atenção:** certifique-se de ter se conectado no escopo `@github` no NPM com sua [chave privada](https://help.github.com/pt/github/managing-packages-with-github-packages/configuring-npm-for-use-with-github-packages) no lugar da senha.

```
$ npm login --scope=@github --registry=https://npm.pkg.github.com/
```

Lembre de sempre armazenar sua chave privada em local seguro.

Também é necessário criar um arquivo na raiz da sua aplicação com o nome `.npmrc` e o conteúdo:

```
@bildvitta:registry=https://npm.pkg.github.com/
```

## Desinstalação

Remover a extensão é tão simples quando instalar, porém é **preciso ter cuidado**, pois isso poderá fazer com que a sua aplicação deixe de funcionar.

```
$ quasar ext remove @bildvitta/steroids --scope=@github
```

## Desenvolvendo

Clone este repositório, abra-o no terminal e digite:

```
$ npm link
```

Após isto, abra no terminal o projeto que deseja utilizar para teste dos recursos e digite:

```
$ npm link @bildvitta/quasar-app-extension-steroids
```

## Publicando uma nova versão

Primeiro, altere a versão no arquivo `package.json` e depois execute:

```
$ npm publish
```

## To Do

- [x] Axios.
- [x] Rotas.
- [x] Autenticação.
- [x] Componentes "Views".
- [ ] Documentação.
- [x] Publicar pacote.

Para a versão 2.0.0, a ideia é desmembrar a extensão em duas ou três, permitindo que o "steroids" seja utilizado em qualquer projeto (isto é, isolando configurações de cores/marca e autenticação via ActiveDirectory).