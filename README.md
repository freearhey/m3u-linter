# m3u-linter

A linter to check formatting of M3U files.

## Installation

```sh
npm install -g m3u-linter
```

## Usage

#### Check single file:

```sh
m3u-linter path-to-playlist/example.m3u
```

#### Check all files in the folder:

```sh
m3u-linter some-folder/*.m3u
```

Arguments:

- `-c, --config`: path to config file (default: ./m3u-linter.config.json)

#### m3u-linter.config.json

```json
{
  "files": ["playlist1.m3u", "playlist2.m3u"],
  "rules": {
    "no-empty-lines": true,
    "require-header": true,
    "attribute-quotes": true,
    "require-info": true,
    "require-title": true,
    "no-trailing-spaces": true,
    "no-whitespace-before-title": true,
    "no-multi-spaces": true,
    "no-extra-comma": true,
    "space-before-paren": true,
    "no-dash": true,
    "require-link": true
  }
}
```

## Contribution

If you find a bug or want to contribute to the code or documentation, you can help by submitting an [issue](https://github.com/freearhey/m3u-linter/issues) or a [pull request](https://github.com/freearhey/m3u-linter/pulls).

## License

[MIT](http://opensource.org/licenses/MIT)
