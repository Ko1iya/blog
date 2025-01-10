import type { WebpackConfiguration } from 'webpack-dev-server';
import { buildDevServer } from './buildDevServer';
import { buildLoader } from './buildLoader';
import { buildPlugins } from './buildPlugins';
import { buildResolver } from './buildResolver';
import { BuildOptions } from './types/types';

export default function buildWebpack(env: BuildOptions): WebpackConfiguration {
  const isDev: boolean = env.mode !== 'production';

  return {
    mode: env.mode ?? 'development',
    entry: env.paths.entry,
    output: {
      path: env.paths.output,
      filename: '[name].[contenthash].js',
      publicPath: 'auto',
      clean: true,
    },
    devtool: isDev ? 'inline-source-map' : undefined,
    plugins: buildPlugins(env),
    module: {
      // Порядок имеет значение
      rules: buildLoader(env),
    },
    resolve: buildResolver(env),
    devServer: isDev ? buildDevServer(env) : undefined,
  };
}
