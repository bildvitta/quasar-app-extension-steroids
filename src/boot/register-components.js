import AppBar from '../components/app-bar/AppBar.vue'
import AppMenu from '../components/app-menu/AppMenu.vue'
import Autocomplete from '../components/autocomplete/Autocomplete.vue'
import Avatar from '../components/avatar/Avatar.vue'
import BreakLine from '../components/break-line/BreakLine.vue'
import CheckboxGroup from '../components/checkbox-group/CheckboxGroup.vue'
import Copy from '../components/copy/Copy.vue'
import DatetimeInput from '../components/datetime-input/DatetimeInput.vue'
import Debugger from '../components/debugger/Debugger.vue'
import DecimalInput from '../components/decimal-input/DecimalInput.vue'
import Delete from '../components/delete/Delete.vue'
import DialogRouter from '../components/dialog-router/DialogRouter.vue'
import Field from '../components/field/Field.vue'
import Filters from '../components/filters/Filters.vue'
import FormGenerator from '../components/form-generator/FormGenerator.vue'
import FormView from '../components/form-view/FormView.vue'
import Input from '../components/input/Input.vue'
import ListView from '../components/list-view/ListView.vue'
import PageHeader from '../components/page-header/PageHeader.vue'
import Profile from '../components/profile/Profile.vue'
import Resizer from '../components/resizer/Resizer.vue'
import SingleView from '../components/single-view/SingleView.vue'
import Sortable from '../components/sortable/Sortable.vue'
import TableGenerator from '../components/table-generator/TableGenerator.vue'
import TabsGenerator from '../components/tabs-generator/TabsGenerator.vue'
import Uploader from '../components/uploader/Uploader.vue'

export default async ({ Vue }) => {
  Vue.component('qs-app-bar', AppBar)
  Vue.component('qs-app-menu', AppMenu)
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
  Vue.component('qs-list-view', ListView)
  Vue.component('qs-page-header', PageHeader)
  Vue.component('qs-profile', Profile)
  Vue.component('qs-resizer', Resizer)
  Vue.component('qs-single-view', SingleView)
  Vue.component('qs-sortable', Sortable)
  Vue.component('qs-table-generator', TableGenerator)
  Vue.component('qs-tabs-generator', TabsGenerator)
  Vue.component('qs-uploader', Uploader)
  Vue.component('qs-input', Input)
}