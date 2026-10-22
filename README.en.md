# DeepSeek Harness Video Background

Adds a looping video background and a translucent composer to the DeepSeek Harness workspace. The plugin activates only after the boot splash has gone and the workspace is present. It does not modify `app.asar` or replace the Harness plugin loader.

## Behavior

- Plays the bundled video muted, looped, centered, and cover-fitted.
- Stays hidden and paused while the native splash or `dsh-550c-boot` is active.
- Loads media only after the workspace appears. A stronger frosted composer blurs text underneath it; a softer reading pane gives answers solid contrast while preserving the video's colors and shapes.
- Uses separate light and dark surface palettes, leaving Harness settings dialogs on their native theme.
- Pauses while the document is hidden.
- Removes its layer on media failure, leaving the original UI usable.
- Serves MP4 media with HTTP byte-range support.

## Install

After the package is published, open **Settings → Plugins → Add plugin** in Harness Desktop and enter:

```text
dsh-cutesnowgirl-background@latest
```

For a non-Desktop profile:

```bash
dsh plugin --profile <profile-name> add dsh-cutesnowgirl-background@latest
```

The Desktop-owned `desktop` profile should be changed through the in-app plugin manager, not overwritten with the CLI.

## Marketplace listing

The community `dshmarket` catalog is curated through [awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin). Publish the repository and npm package, add the `dsh-plugin` GitHub topic, verify the bundle install, then submit a catalog PR. A listing is community curation, not an official DeepSeek endorsement.

## Development

Node.js 20 or newer is required.

```bash
npm test
npm run check
npm run pack:check
```

## License and media

The plugin code is available under the [MIT License](LICENSE). `assets/background.mp4` is a separate media asset and is not automatically relicensed under MIT. The maintainer must confirm redistribution rights before publishing the repository or npm package.
