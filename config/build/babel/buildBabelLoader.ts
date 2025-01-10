import { BuildOptions } from "../types/types"

function buildBabelLoader(env: BuildOptions) {
  const isDev: boolean = env.mode !== "production"

  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-typescript",
          [
            "@babel/preset-react",
            {
              runtime: isDev ? "automatic" : "classic",
            },
          ],
        ],
      },
    },
  }
}

export default buildBabelLoader
