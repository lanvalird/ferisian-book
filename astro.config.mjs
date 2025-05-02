import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog'
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
    title: 'Ferisian Book',
    customCss: ["./src/styles/main.css"],
    social: {
      // github: 'https://github.com/aculaOne/ferisian_book',
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
        // autogenerate: {
        //   directory: 'basics',
        // },
        translations: {
          'ru': "Основы",
          'fe': "Стайкы"
        },
        items: [{
          label: 'Алфавит',
          link: 'basics/alphabet',
          translations: {
            'ru': "Алфавит",
            'fe': "Алпвавiт"
          },
        },
        {
          label: 'Словарь',
          link: 'basics/dictionary',
          translations: {
            'ru': "Словарь",
            'fe': "Вордэлiст"
          },
          badge: { text: "~", variant: 'caution' },
        }, {
          label: 'Словообразование',
          link: 'basics/word_formation',
          translations: {
            'ru': "Словообразование",
            'fe': "Вордэпвормiс"
          },
        },
        {
          label: "Образование предложений",
          link: "basics/sentence_formation",
          translations: {
            'ru': "Образование предложений",
            'fe': "Сентесопвормiс"
          },
          badge: { text: "новое", variant: "success" }
        },
        ]
      },
      {
        label: 'История',
        autogenerate: {
          directory: 'history'
        },
        translations: {
          'ru': "История",
          'fe': "Сказмiл"
        },
        badge: { text: "(+)", variant: 'success' },
      }
    ],

    plugins: [starlightBlog({
      title: 'Блог',
    })],
  }), react()]
});