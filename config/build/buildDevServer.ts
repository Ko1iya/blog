import type { Configuration as DevServerConfiguration } from "webpack-dev-server"
import { BuildOptions } from "./types/types"

export function buildDevServer(env: BuildOptions): DevServerConfiguration {
  return {
    port: env.port ?? 3000,
    open: true,
    // деплой статики решается по другому, у ulbi есть видео
    historyApiFallback: true,
    hot: true,
  }
}
