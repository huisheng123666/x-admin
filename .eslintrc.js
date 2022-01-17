module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', '@vue/standard'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    semi: 0,
    'space-before-function-paren': 0,
    'prefer-promise-reject-errors': 0,
    'vue/multi-word-component-names': 0,
    'eol-last': 0
    // quotes: 0
  },
  globals: {
    defineProps: true,
    defineEmits: true,
    particlesJS: true
  }
}
