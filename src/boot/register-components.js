import AppBar from '../components/AppBar.vue'
import AppMenu from '../components/AppMenu.vue'
import AppsMenu from '../components/AppsMenu.vue'
import Autocomplete from '../components/Autocomplete.vue'
import Avatar from '../components/Avatar.vue'
import BreakLine from '../components/BreakLine.vue'
import CheckboxGroup from '../components/CheckboxGroup.vue'
import Copy from '../components/Copy.vue'
import DatetimeInput from '../components/DatetimeInput.vue'
import Debugger from '../components/Debugger.vue'
import DecimalInput from '../components/DecimalInput.vue'
import Delete from '../components/Delete.vue'
import DialogRouter from '../components/DialogRouter.vue'
import Field from '../components/Field.vue'
import Filters from '../components/Filters.vue'
import FormGenerator from '../components/FormGenerator.vue'
import FormView from '../components/FormView.vue'
import Input from '../components/Input.vue'
import ListView from '../components/ListView.vue'
import PageHeader from '../components/PageHeader.vue'
import PasswordInput from '../components/PasswordInput.vue'
import PasswordStrengthChecker from '../components/PasswordStrengthChecker.vue'
import Profile from '../components/Profile.vue'
import Resizer from '../components/Resizer.vue'
import SingleView from '../components/SingleView.vue'
import Sortable from '../components/Sortable.vue'
import TableGenerator from '../components/TableGenerator.vue'
import TabsGenerator from '../components/TabsGenerator.vue'
import Uploader from '../components/Uploader.vue'

export default async ({ Vue }) => {
  Vue.component('qs-app-bar', AppBar)
  Vue.component('qs-app-menu', AppMenu)
  Vue.component('qs-apps-menu', AppsMenu)
  Vue.component('qs-autocomplete', Autocomplete)
  Vue.component('qs-avatar', Avatar)
  Vue.component('qs-break-line', BreakLine)
  Vue.component('qs-checkbox-group', CheckboxGroup)
  Vue.component('qs-copy', Copy)
  Vue.component('qs-datetime-input', DatetimeInput)
  Vue.component('qs-debugger', Debugger)
  Vue.component('qs-decimal-input', DecimalInput)
  Vue.component('qs-delete', Delete)
  Vue.component('qs-dialog-router', DialogRouter)
  Vue.component('qs-field', Field)
  Vue.component('qs-filters', Filters)
  Vue.component('qs-form-generator', FormGenerator)
  Vue.component('qs-form-view', FormView)
  Vue.component('qs-input', Input)
  Vue.component('qs-list-view', ListView)
  Vue.component('qs-page-header', PageHeader)
  Vue.component('qs-password-input', PasswordInput)
  Vue.component('qs-password-strength-checker', PasswordStrengthChecker)
  Vue.component('qs-profile', Profile)
  Vue.component('qs-resizer', Resizer)
  Vue.component('qs-single-view', SingleView)
  Vue.component('qs-sortable', Sortable)
  Vue.component('qs-table-generator', TableGenerator)
  Vue.component('qs-tabs-generator', TabsGenerator)
  Vue.component('qs-uploader', Uploader)
}