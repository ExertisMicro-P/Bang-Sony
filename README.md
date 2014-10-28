# Exertis Micro-P Sony Microsite

This project is based on the [Bang-Conect](https://github.com/ExertisMicro-P/Bang-Conect) (multi-page) framework.

Bang's test site: [http://sony.microp.bang-on.net/?project=sony](http://sony.microp.bang-on.net/?project=sony)

## TODO
* Get grunt to take care of deployments to test site (need to do better than a direct rsync, could leverage `ec2 deploy` script).
* Make better use of [bake](https://github.com/MathiasPaumgarten/grunt-bake) templating to DRY up the markup.
* Move inline styling into SCSS modules.
* Move styles from [_shame.scss](./src/scss/_shame.scss) to abstracted modules.

## Getting started

### Dependencies

* [grunt](http://gruntjs.com/installing-grunt) (and node)
* [bundler](http://bundler.io/) (and ruby)
* [Editorconfig](https://github.com/sindresorhus/editorconfig-sublime) sublime plugin

You'll also want the [livereload browser extension](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions).

### Setup

Clone the repo to your local machine:
```sh
git clone git@github.com:ExertisMicro-P/Bang-Sony.git
cd Bang-Sony
```

Install the node modules:
```sh
npm install
```

Install the ruby gems:
```sh
bundle install
```

## Development

**You should not be changing anything in the [multi-page](multi-page) or [sony](sony) directories directly.**

Our files can be found in the [src](src) directory. The files in `src` are then compiled by grunt (in combination with `micro-site`) to build the `sony` directory.

To avoid confusing files from the `sony` and `src` directories when making content changes, it's best to open only the `src` directly in your editor, e.g. `subl Bang-Sony/src`.

To start a local webserver with grunt listening for changes simply run `grunt`.

Running or `grunt` or `grunt watch` will listen for changes and do partial recompile of the `sony` microsite, but this is **not a complete build**. `grunt build` should be run before committing.

### Grunt tasks

* `grunt` - alias for `grunt watch` & `grunt server`
* `grunt watch` - watch the `src` directory for changes
* `grunt server` - run a local webserver and open a browser tab
* `grunt imagemin` - optimise images (this can be slow, so **not included** in `build` by default)
* `grunt build` - compile the `sony` microsite
* `grunt rebuild` - wipe the `sony` microsite before building (updates the `micro-site` framework).

## Updating the multi-page framework

The [multi-page](multi-page) framework should be kept up to date with the version in the [Bang-Conect](https://github.com/ExertisMicro-P/Bang-Conect) repository.

You can update the framework by pulling the latest version from [Bang-Conect](https://github.com/ExertisMicro-P/Bang-Conect) and copying the changes into the repo.

```sh
# make sure to clone the repo outside of this one
git clone git@github.com:ExertisMicro-P/Bang-Conect.git

rsync -r --delete Bang-Conect/multi-page Bang-Sony/
cd Bang-Sony
grunt rebuild
grunt server
```

You'll then need to test everything is still working as expected before committing the changes. It's best to commit a library update on it's own without additional changes, when possible.

## Deploying to test

Test site: [http://sony.microp.bang-on.net/?project=sony](http://sony.microp.bang-on.net/?project=sony)

1. Run `grunt build` (or `grunt rebuild`)
2. Commit and push changes
3. SSH to the test server
4. Run the `/data/microp/sony-microsite-test/deploy.sh` script
