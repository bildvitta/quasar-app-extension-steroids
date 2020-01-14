import Avatar from '../components/Avatar.vue'
import AppBar from '../components/AppBar.vue'
import AppMenu from '../components/AppMenu.vue'
import BreakLine from '../components/BreakLine.vue'
import CheckboxGroup from '../components/CheckboxGroup.vue'
import DatetimeInput from '../components/DatetimeInput.vue'
import Debugger from '../components/Debugger.vue'
import DecimalInput from '../components/DecimalInput.vue'
import Field from '../components/Field.vue'
import FormGenerator from '../components/FormGenerator.vue'
import FormView from '../components/FormView.vue'
import ListView from '../components/ListView.vue'
import PageHeader from '../components/PageHeader.vue'
import Profile from '../components/Profile.vue'
import Resizer from '../components/Resizer.vue'
import SingleView from '../components/SingleView.vue'
import Uploader from '../components/Uploader.vue'

export default async ({ Vue }) => {
  Vue.component('qs-avatar', Avatar)
  Vue.component('qs-app-bar', AppBar)
  Vue.component('qs-app-menu', AppMenu)
  Vue.component('qs-break-line', BreakLine)
  Vue.component('qs-debugger', Debugger)
  Vue.component('qs-checkbox-group', CheckboxGroup)
  Vue.component('qs-datetime-input', DatetimeInput)
  Vue.component('qs-decimal-input', DecimalInput)
  Vue.component('qs-field', Field)
  Vue.component('qs-form-generator', FormGenerator)
  Vue.component('qs-form-view', FormView)
  Vue.component('qs-list-view', ListView)
  Vue.component('qs-page-header', PageHeader)
  Vue.component('qs-profile', Profile)
  Vue.component('qs-resizer', Resizer)
  Vue.component('qs-single-view', SingleView)
  Vue.component('qs-uploader', Uploader)
}