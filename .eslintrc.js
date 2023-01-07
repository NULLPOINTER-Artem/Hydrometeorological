module.exports = {
  root: true,

  env: {
    browser: true,
    node: true
  },

  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-strongly-recommended',
  ],

  plugins: [],

  // add your custom rules here
  rules: {
    'vue/custom-event-name-casing': 'off',
    'vue/component-definition-name-casing': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/no-mutating-props': 'off',
    'vue/one-component-per-file': 'off',

    'no-console': 'off',
    'no-debugger': 'off',
    'object-shorthand': 'off',
    'no-multiple-empty-lines': ['error', {
      max: 2
    }],

    'padded-blocks': ['error', {
      blocks: 'never'
    }],

    'vue/max-attributes-per-line': ['error', {
      singleline: { max: 5 },
      multiline: { max: 1 }
    }],
    "vue/no-unused-components": "off",
    "no-unused-vars": "off"
  }
}
