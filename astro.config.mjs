import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
    title: 'Ferisian Book',
    customCss: ["./src/styles/main.css"],
    social: {
      // github: 'https://github.com/withastro/starlight',
    },
    defaultLocale: 'ru',
    locales: {
      ru: {
        label: 'Русский',
        lang: 'ru'
      },
      fe: {
        label: 'Пверiйснö',
        lang: 'fe'
      }
    },
    sidebar: [
      {
        label: 'Интро',
        translations: {
          'ru': "Интро",
          'fe': "Старт"
        },
        items: [
          {
            label: 'Интро',
            link: 'intro',
            translations: {
              'ru': "Интро",
              'fe': "Старт"
            },
          },
        ]
      },
      {
        label: 'Основы',
        autogenerate: {
          directory: 'basics'
        },
        translations: {
          'ru': "Основы",
          'fe': "Стайкы"
        }
      },
      {
        label: 'История',
        autogenerate: {
          directory: 'history'
        },
        translations: {
          'ru': "История",
          'fe': "Сказмiл"
        }
      }
    ]
  }), react()]
});