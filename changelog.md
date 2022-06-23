# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 2.4.0 - 2022-06-23
### Added
- Added `qs-dialog-router` class in `DialogRouter` and a `data-dialog-router` attribute in `PageHeader` to control back button display.

### Changed
- Removed `headerClasses` from `TableGenerator` so table title is not primary color

## 2.3.0 - 2022-06-16
### Added
- `AppBar` added notification and validation props to control notification button display.
- `AppBar` added useEditProfile props and validations to control edit profile button display.

## 2.2.0 - 2022-05-24
### Added
- Creation of slots `top-filter` and `bottom-filter` in `QsFilter` to allow for customizing the layout of the filters.

## 2.1.0 - 2022-04-19
### Added
- `AppMenu` added class to not show the scroll.

## 2.0.10 - 2022-04-05
### Changed
- `QsResizer` changed baseURL `'https://d17ouzaofz81f3.cloudfront.net/'` to `'https://image-resize.nave.dev/'`

## 2.0.9 - 2021-11-30
### Added
- Added a props for position reversal of `QsFilters` search.

## 2.0.8 - 2021-11-12
### Added
- Adding an emit to get the selected field in the `FormGenerator`.
- Changelog update

## 2.0.7 - 2021-01-07
### Added
- `qs-dialog`
- `qs-btn-actions`

### Changed
- qs-page-header (changed breadcrumbs history)
- qs-app-bar (layout changes in q-menu)
- qs-delete (removed this.$dialog and added `qs-dialog`)
- qs-form-view (removed this.$dialog and added `qs-dialog`)
- qs-search-box (changed icon color in q-input and label when has no results)
- qs-select-list (added link with new props `to` and `toIdentifier`)
- qs-table-generator (layout changes, `headerClasses` now has `text-primary` as default)
- qs-tabs-generator (layout changes and new prop `icons` added)

## 2.0.6 - 2020-02-16
### Added
- qs-label
- qs-transfer
- added event as props

### Changed
- qs-box
- qs-tabs-generator

## 2.0.5 - 2020-02-12
### Added
- add new type number to field
- new filters to handle document masks etc
- new ways to send columns to form-generator and grid-generator

### Changed
- lodash version to ---> >=4.17.19 (vulnerability changes)
- breadcrumbs font-size in mobile and removed default root
- fixed qs-select-list bug

## 2.0.4 - 2020-11-25
### Added
- qs-select-list
- modal in form-view when leave page with unsaved changes
- qs-grid-generator
- qs-btn
- qs-settings-menu

### Changed
- template actions in qs-form-view
- change header click area to return to home
- text-weight in breadccrumbs

## 2.0.3 (11-05-2020) - 2020-11-05
### Fetures
- qs-search-box
- qs-box
- added new prop fieldsProps to qs-form-generator
- added new prop fieldProps to qs-field
- added new prop iconColor to qs-password-input
- added new prop bottomSlots to qs-password-input

## 2.0.2 - 2020-10-28
### Added
- qs-app-menu added new prop `itemClass`

### Changed
- qs-password-input removed prop `bottomsSlots` and added `hideStrengthChecker`

## 2.0.1 - 2020-10-28
### Added
- new prop `scrollAreaClass` for qs-app-menu

### Changed
- qs-table-generate fixed bug in body-cell-[name] template
- qs-input fixed mask for company document and document

## 2.0.0 - 2020-10-23
### Added
- qs-apps-menu

### Changed
- notify icon in qs-app-bar
- qs-apps-menu in qs-app-bar
