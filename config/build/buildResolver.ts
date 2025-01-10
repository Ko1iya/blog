import { Configuration } from "webpack"
import { BuildOptions } from "./types/types"

export function buildResolver(env: BuildOptions): Configuration["resolve"] {
  return {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": env.paths.src,
    },
  }
}
