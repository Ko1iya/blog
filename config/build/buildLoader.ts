import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/types';
// import ReactRefreshTypeScript from "react-refresh-typescript"
import buildBabelLoader from './babel/buildBabelLoader';

export function buildLoader(env: BuildOptions): ModuleOptions['rules'] {
  const isDev: boolean = env.mode !== 'production';

  const babelLoader = buildBabelLoader(env);

  const cssModulesLoader = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: isDev
          ? '[folder]-[local]--[hash:base64:8]'
          : '[hash:base64:8]',
      },
      importLoaders: 1,
    },
  };

  const scssLoader = {
    // ts-loader умеет работать с jsx, если его не было бы, тогда пришлось бы устанавливать babel-loader
    test: /\.((c|sa|sc)ss)$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS

      cssModulesLoader,
      // Compiles Sass to CSS
      'sass-loader',
    ],
  };

  // const tsLoader = {
  //   test: /\.tsx?$/,
  //   loader: "ts-loader",
  //   options: {
  //     transpileOnly: true,
  //     getCustomTransformers: () => ({
  //       before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
  //     }),
  //   },
  // }

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  const svgrLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: false,
                },
              },
            ],
          },
        },
      },
    ],
  };

  return [scssLoader, babelLoader, assetLoader, svgrLoader];
}
