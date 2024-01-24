import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vitepress'

const description = process.env.npm_package_description

export default defineConfig({
  title: [process.env.npm_package_name, description].join(' - '),
  description,
  vite: {
    plugins: [
      vueJsx(),
    ],
  },
})
