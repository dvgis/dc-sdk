/**
 * @Author: Caven
 * @Date: 2020-05-09 23:01:21
 */

/**
 * Using other custom plug-ins in DC
 * @param DC
 * @returns this
 */
export function initUse(DC) {
  DC.use = function(plugin, lib) {
    const installedPlugins =
      this._installedPlugins || (this._installedPlugins = {})
    if (this._installedPlugins[plugin.name]) {
      return this
    }
    // additional parameters
    const args = []
    if (lib) {
      args.push(lib)
    }
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins[plugin.name] = plugin
    return this
  }
}
