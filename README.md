# setup-elixir

[![](https://github.com/StanleyGoldman/setup-gitversion/workflows/Test/badge.svg)](https://github.com/actions/setup-elixir/actions)
[![](https://github.com/StanleyGoldman/setup-gitversion/workflows/Licensed/badge.svg)](https://github.com/actions/setup-elixir/actions)

This actions sets up GitVersion for use in Actions by:

- Installing GitVersion

**Note** Currently, this action currently only supports Actions' `ubuntu-` runtimes.

## Usage

See [action.yml](action.yml).

### Basic example

```yaml
on: push

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1.0.0
      - uses: actions/setup-setup-dotnet@v1
      - uses: actions/setup-gitversion@v1.0.0
        with:
          gitversion-version: 22.x
      - run: GitVersion
```

## License

The scripts and documentation in this project are released under the [MIT license](LICENSE.md).

## Contributing

Check out [this doc](CONTRIBUTING.md).

## Current Status

This action is in active development.
