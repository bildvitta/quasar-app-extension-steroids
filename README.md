# Steroids

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
  - Avatar
  - BreakLine
  - DatetimeInput
  - DecimalInput
  - Field
  - PageHeader
  - Profile
  - Resizer
  - Uploader
- **Directives:**
  - v-test
- **Filters:**
  - asset
  - date
  - dateTime
  - humanDate
  - money
  - percent
- **Library:**
  - company
  - greatestCommonDivisor
  - storeModule

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

## To Do

- [x] Axios.
- [x] Rotas.
- [x] Autenticação.
- [ ] Componentes "Views".
- [ ] Documentação.
- [x] Publicar pacote.
