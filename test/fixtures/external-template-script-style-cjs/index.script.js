const { ref, defineComponent, computed } = require('vue');

exports = module.exports = defineComponent({
  name: 'ExternalTemplateScriptStyleCjs',

  props: {
    foo: {
      type: String,
      required: true,
    },

    bar: {
      type: Number,
      default: 0,
    },
  },

  emits: {
    change(id) {
      return id > 0;
    },

    update(value) {
      return value !== '';
    },
  },

  setup() {
    const msg = ref("setup: External Template Script Style (cjs)'");
    const count = ref(0);
    const double = computed(() => count.value * 2);
    return { msg, count, double };
  },
});
