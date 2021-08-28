// @ts-check

const description = process.env.npm_package_description

/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  title: [process.env.npm_package_name, description].join(' - '),
  description,
}

module.exports = config
