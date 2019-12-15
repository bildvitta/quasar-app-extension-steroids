export default async ({ Vue }) => {
  const brandColors = {
    bild: '#ed7203',
    exklusiv: '#3e3a35',
    fegik: '#132f4d',
    veraz: '#e66d2d',
    vitta: '#006cbb'
  }

  Vue.prototype.$brandColors = brandColors
}
