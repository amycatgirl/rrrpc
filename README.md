# rrRPC

A hacky way of bringing your Discord RPC to Revolt

Installation instructions below, pre-built plugin on `target/plugin.json` and/or GitHub Releases

> [!NOTE]
> You **MUST** have arRPC running before installing the plugin. It does not reconnect to the websocket once connection is lost/hasn't been stablished.
> This feature will come at a later date.

---

# Revite Plugin Boilerplate

> ## Beware that plugins *will* break whenever the [client rewrite](https://github.com/revoltchat/frontend) is generaly available.
> Alongside the client rewrite, plugins will probably have a different format, as opposed to json. A discussion related to the
> topic is available [here.](https://github.com/revoltchat/frontend/issues/252)

Boilerplate for manifest V1 revite plugins. Originally [revite-ts-plugin-boilerplate](https://github.com/sussycatgirl/revite-ts-plugin-boilerplate),
adapted for Vanilla JS.

## Instructions

A nix shell is available with this repo, to use it, run `nix-shell`, the shell comes with all the things necesary for development.

If you don't want to use `nix`, you need to have `node` and `pnpm ` installed. Instalation through `corepack` is highly recommended.

### Building

To build, use the following command.


```bash
pnpm build

# Or if you want an unminified build
# pnpm build:dev
```

### Installing

Installing a plugin is pretty easy. You need to enable the [Experimental Plugin API] experiment in the Experiments settings tab, then open console and
follow the instructions:

1. Copy the built plugin in the `target/plugin.json` file
2. Open DevTools <kbd>Control + Shift + i</kbd> and click the "Console" tab
3. Type the following, replacing `...` with the contents of the previously copied file:
```js
state.plugins.add(...)
```
4. You should see that your status has changed to your discord RPC!
