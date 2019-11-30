<template>
  <div>
    <Parent @click="broadscat()"></Parent>
  </div>
</template>

<script>
import Parent from "./Components/parent";
export default {
  components: {
    Parent
  },
  methods: {
    // 触发子组件中所有绑定的eat方法，无线层级
    broadscat() {
      this.$broadscat("eat");
    }
  }
};
</script>