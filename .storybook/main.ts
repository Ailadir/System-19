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
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: async (config) => {
    // TypeScript support with Babel
    config.module?.rules?.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
          },
        },
      ],
    });

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
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              includePaths: [
                path.resolve(__dirname, '../'),
                path.resolve(__dirname, '../styles/styles'),
              ],
              loadPaths: [
                path.resolve(__dirname, '../'),
                path.resolve(__dirname, '../styles/styles'),
              ],
            },
            // Add webpack importer to support webpack aliases in SCSS
            webpackImporter: true,
          },
        },
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
      // Map src/shared to the root styles directory for SCSS imports compatibility
      'src/shared/styles': path.resolve(__dirname, '../styles/styles'),
      '@/shared/styles': path.resolve(__dirname, '../styles/styles'),
      // Mock Next.js modules for Storybook
      'next/navigation': path.resolve(__dirname, './mocks/next-navigation.js'),
      'next/router': path.resolve(__dirname, './mocks/next-router.js'),
      'next/image': path.resolve(__dirname, './mocks/next-image.js'),
      'next/link': path.resolve(__dirname, './mocks/next-link.js'),
      // Mock app dependencies
      '@/app/providers/ServerUserContext': path.resolve(__dirname, './mocks/app-dependencies.ts'),
      '@/shared/store/userStore': path.resolve(__dirname, './mocks/app-dependencies.ts'),
      '@/shared/store': path.resolve(__dirname, './mocks/app-dependencies.ts'),
      '@/shared/utils/profileHelpers': path.resolve(__dirname, './mocks/app-dependencies.ts'),
      '@/shared/utils/apiHelpers': path.resolve(__dirname, './mocks/app-dependencies.ts'),
      '@/shared/utils/searchHelpers': path.resolve(__dirname, './mocks/app-dependencies.ts'),
      '@/shared/utils/routerHelpers': path.resolve(__dirname, './mocks/app-dependencies.ts'),
      '@/shared/utils/cityHelpers': path.resolve(__dirname, './mocks/app-dependencies.ts'),
      '@/shared/utils/toast': path.resolve(__dirname, './mocks/app-dependencies.ts'),
      '@/shared/types/catalog': path.resolve(__dirname, './mocks/app-dependencies.ts'),
    };

    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, '../'),
      path.resolve(__dirname, '../styles'),
      'node_modules',
    ];

    return config;
  },
};

export default config;
