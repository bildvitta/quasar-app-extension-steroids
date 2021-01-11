# Changelog

## 2.0.7 (07-01-2021)

- features:
  - qs-dialog
  - qs-btn-actions

- changed:
  - qs-page-header (changed breadcrumbs history)
  - qs-app-bar (layout changes in q-menu)
  - qs-delete (removed this.$dialog and added `qs-dialog`)
  - qs-form-view (removed this.$dialog and added `qs-dialog`)
  - qs-search-box (changed icon color in q-input and label when has no results)
  - qs-select-list (added link with new props: `to` and `toIdentifier`)
  - qs-table-generator (layout changes, `headerClasses` now has `text-primary` as default)
  - qs-tabs-generator (layout changes and new prop `icons` added)

## 2.0.6 (16-02-2020)

- features:
  - qs-label
  - qs-transfer
  - added event as props

- changed:
  - qs-box
  - qs-tabs-generator

## 2.0.5 (12-02-2020)

- features:
  - add new type number to field
  - new filters to handle document masks etc
  - new ways to send columns to form-generator and grid-generator

- changed:
  - lodash version to ---> >=4.17.19 (vulnerability changes)
  - breadcrumbs font-size in mobile and removed default root
  - fixed qs-select-list bug

## 2.0.4 (11-25-2020)

- features:
  - qs-select-list
  - modal in form-view when leave page with unsaved changes
  - qs-grid-generator
  - qs-btn
  - qs-settings-menu

- changed:
  - template actions in qs-form-view
  - change header click area to return to home
  - text-weight in breadccrumbs

## 2.0.3 (11-05-2020)

- fetures:
  - qs-search-box
  - qs-box
  - added new prop fieldsProps to qs-form-generator
  - added new prop fieldProps to qs-field
  - added new prop iconColor to qs-password-input
  - added new prop bottomSlots to qs-password-input

## 2.0.2 (10-28-2020)

- features:
  - qs-app-menu added new prop `itemClass`

- changed:
  - qs-password-input removed prop `bottomsSlots` and added `hideStrengthChecker`

## 2.0.1 (10-28-2020)

- features:
  - new prop `scrollAreaClass` for qs-app-menu

- changed:
  - qs-table-generate fixed bug in body-cell-[name] template
  - qs-input fixed mask for company document and document

## 2.0.0 (10-23-2020)

- features:
  - qs-apps-menu

- changed:
  - notify icon in qs-app-bar
  - qs-apps-menu in qs-app-bar
