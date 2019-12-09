const domains = {
  // Exklusiv
  'bildexklusiv.com.br': 'exklusiv',

  // Fegik
  'fegik.com.br': 'fegik',

  // Veraz
  'verazseguros.com.br': 'veraz',

  // Vitta
  'attivcorrespondente.com.br': 'vitta',
  'vendasvitta.com.br': 'vitta',
  'vittaconsorcio.com.br': 'vitta',
  'vittaresidencial.com.br': 'vitta'
}

const getCompany = user => {
  const email = user.email || ''
  const domain = email.split('@')[1]

  return domains[domain] || 'bild'
}

const isBild = user => getCompany(user) === 'bild'

const isVitta = user => getCompany(user) === 'vitta'

const isExklusiv = user => getCompany(user) === 'exklusiv'

const isFegik = user => getCompany(user) === 'fegik'

const isVeraz = user => getCompany(user) === 'veraz'

export {
  domains,
  getCompany,
  isBild,
  isVitta,
  isExklusiv,
  isFegik,
  isVeraz
}
