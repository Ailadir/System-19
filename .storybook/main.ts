import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../components/**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {},
  webpackFinal: async (config) => {
    // SCSS support with CSS Modules
    config.module?.rules?.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              auto: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
        },
        'sass-loader',
      ],
      include: path.resolve(__dirname, '../'),
    });

    // SVG support with @svgr/webpack
    const fileLoaderRule = config.module?.rules?.find(
      (rule) => typeof rule === 'object' && rule.test instanceof RegExp && rule.test.test('.svg')
    );

    if (fileLoaderRule && typeof fileLoaderRule === 'object') {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    config.module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Resolve aliases
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../'),
    };

    return config;
  },
};

export default config;
