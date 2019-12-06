if (process.env.PROD) {
  const href = window.location.href

  if (!href.indexOf('http://')) {
    window.location.href = href.replace('http://', 'https://')
  }
}
