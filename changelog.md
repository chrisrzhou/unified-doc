# Changelog

## 2020-05-17
`v1` refactor reorganizing packages to better separate areas of concerns and features.  Improved and simplified docs.

### Breaking
The old packages are **deprecated**:
- `@unified-doc/hast-util-annotate`
- `@unified-doc/hast-util-extract-text-offsets`
- `@unified-doc/processor`
- `@unified-doc/react-unified-doc`
- `@unified-doc/text-parse`

### Packages
- `unified-doc@1.0.0`:
  - Core package of unified document APIs.  APIs exposed:
    - `createProcessor`: Single entry point to create a unified processor to process `hast` trees with unified document APIs (e.g. annotations, sanitize, plugins).
    - `selectText`: A generic method that accepts a DOM element and `hast` tree so that text selection events can return an annotation object with source offsets calculated.
  - More unified document API methods will be exposed in this module in the future (e.g. text search).
- `unified-doc-parse-text@1.0.0`
  - Simple parser to parse content into `hast` tree with a single text node.
  - Future parsers will adopt the package name convention of `unified-doc-parse-<content-type>`.
- `unified-doc-react@1.0.0`
  - React renderer implementing `unified-doc` APIs.
  - Future renderers will adopt the package name convention of `unified-doc-<lib>` (e.g. `unified-doc-vue`).
- `unified-doc-util-annotate@1.0.0`
  - Hast util annotate implementing the core annotation algorithm based on the `unified-doc` annotation spec.
  - Future hast utils will adopt the package name convention of `unified-doc-util-<util-name>`.

## 2020-04-26

Official release! Check out the [docs][docs] to get started.

### Packages
- `hast-util-annotate@0.1.1`
- `hast-util-extract-text-offsets@0.1.1`
- `processor@0.1.1`
- `react-unified-doc@0.1.9`
- `text-parse@0.1.1`

Note that any versions preceding these official versions probably have failing builds.

<!-- Links -->

[docs]: https://unified-doc.netlify.com/
