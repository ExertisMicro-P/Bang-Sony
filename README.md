# Exertis Micro-P Sony Microsite

This project is based on the [Bang-Conect](https://github.com/ExertisMicro-P/Bang-Conect) (multi-page) framework.

Bang's test site: [http://sony.microp.bang-on.net/?project=sony](http://sony.microp.bang-on.net/?project=sony)

## TODO
* Get grunt to take care of deployments to test site (need to do better than a direct rsync, could leverage `ec2 deploy` script).
* Make better use of [bake](https://github.com/MathiasPaumgarten/grunt-bake) templating to DRY up the markup.
* Move inline styling into SCSS modules.
* Move styles from [_shame.scss](./src/scss/_shame.scss) to abstracted modules.

## Getting started

You need [grunt](http://gruntjs.com/), go [install](http://gruntjs.com/installing-grunt) that if you haven't got it already.

Ensure you have the [Editorconfig](https://github.com/sindresorhus/editorconfig-sublime) sublime plugin installed and enabled.

You'll also want the [livereload browser extension](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions).

Clone the repo.

```sh
git clone git@github.com:ExertisMicro-P/Bang-Sony.git
```

Install the node modules.

```sh
cd Bang-Sony
npm install
```

## Development

**You should not be changing anything in the [multi-page](multi-page) or [sony](sony) directories directly.**

Our files can be found in the [src](src) directory. The files in `src` are then compiled by grunt (in combination with `micro-site`) to build the `sony` directory.

To start a local webserver with grunt listening for changes simply run `grunt`.

Running or `grunt` or `grunt watch` will listen for changes and do partial recompile of the `sony` microsite, but this is **not a complete build**. `grunt build` should be run before committing.

### Grunt tasks
* `grunt` - alias for `grunt watch` & `grunt server`
* `grunt watch` - watch the `src` directory for changes
* `grunt server` - run a local webserver and open a browser tab
* `grunt imagemin` - optimise images (this can be slow, so **not included** in `build` by default)
* `grunt build` - compile the `sony` microsite
* `grunt rebuild` - wipe the `sony` microsite before building (updates the `micro-site` framework).

## Deploying to test

Test site: [http://sony.microp.bang-on.net/?project=sony](http://sony.microp.bang-on.net/?project=sony)

1. Run `grunt build` (or `grunt rebuild`)
2. Commit and push changes
3. SSH to the test server
4. Run the `/data/microp/sony-microsite-test/deploy.sh` script
