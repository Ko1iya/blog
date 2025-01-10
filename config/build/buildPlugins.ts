import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { Configuration, DefinePlugin, ProvidePlugin } from 'webpack';
import { BuildOptions } from './types/types';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export function buildPlugins(env: BuildOptions): Configuration['plugins'] {
  const isDev: boolean = env.mode !== 'production';
  const isProd = !isDev;

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      template: env.paths.html,
      public: path.resolve(__dirname, env.paths.public, 'favicon.ico'),
      favicon: path.resolve(__dirname, env.paths.public, 'favicon.ico'),
    }),
    new DefinePlugin({
      PRODUCTION: JSON.stringify(isDev),
    }),
    new ProvidePlugin({
      React: 'react',
    }),
  ];

  if (isDev) {
    plugins.push(
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          memoryLimit: 8100,
        },
      }),
    );
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  if (isProd) {
    plugins.push(new MiniCssExtractPlugin());
    // plugins.push(new BundleAnalyzerPlugin())
    plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(env.paths.public, 'Locales'),
            to: path.resolve(env.paths.output, 'Locales'),
          },
        ],
      }),
    );
  }

  return plugins;
}
