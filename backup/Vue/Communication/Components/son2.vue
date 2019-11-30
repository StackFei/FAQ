
<template>
  <div>
    <p>son:{{count}}</p>
    <button @click="sonChange()">修改</button>
    <!-- 一次性接受所有的属性/方法集合 -->
    {{$attrs}}{{$listeners}}
    <sonChild v-bind="$attrs" v-on="$listeners"></sonChild>
  </div>
</template>

<script>
import sonChild from "./sonchild2";
export default {
  components: {
    sonChild
  },
  props: {
    count: {
      type: Number
    }
  },
  methods: {
    sonChange() {
      // parent 必须使用 :count.sync="count"
      this.$emit("update:count", 666);
    },
  }
};
</script>