# Action Replace Labels

This is a GitHub Action to replace GitHub labels to an issue or a pull request.

## Inputs

| NAME            | DESCRIPTION                                                                                                                                                        | TYPE     | REQUIRED | DEFAULT                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | -------- | ------------------------------------------------------------------------------- |
| `github_token`  | A GitHub token.                                                                                                                                                    | `string` | `false`  | `${{ github.token }}`                                                           |
| `labels`        | The labels' name to be replace. Multiple labels must be separated by commas (,).                                                                                   | `string` | `true`   | `N/A`                                                                           |
| `ignore_labels` | This is a label excluded from replacement. These labels do not remove even if they are not included in the label. Multiple labels must be separated by commas (,). | `string` | `false`  | `N/A`                                                                           |
| `number`        | The number of the issue or pull request.                                                                                                                           | `number` | `false`  | `N/A`                                                                           |
| `repo`          | The owner and repository name. e.g.) `Codertocat/Hello-World`                                                                                                      | `string` | `false`  | `${{ github.event.issue.number }}` or `${{ github.event.pull_request.number }}` |

## Example

```yaml
name: Replace Labels

on:
  pull_request:
    types: opened

jobs:
  add_labels:
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v2

      - name: Replace Labels
        uses: yunho1017/action-replace-labels@v1.0.0
        with:
          labels: label1,label2,label3
          ignore_labels: DO NOT MERGE
```

## License

Copyright 2024 The Actions Ecosystem Authors.

Action Add Labels is released under the [Apache License 2.0](./LICENSE).
