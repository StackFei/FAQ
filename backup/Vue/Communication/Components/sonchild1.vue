<template>
  <div>
    <p>sonChild:{{price}}</p>
    <button @click="sonChildChange()" @eat="eat">修改</button>
  </div>
</template>

<script>
export default {
  props: {
    price: {
      type: Number
    }
  },
  methods: {
    sonChildChange() {
    //   方法一 this.$emit("sonChildChange", 666);
    //   this.$parent.$emit("changePrcie", 666);
    //   方法二 无限次嵌套 避免$parent.$parent.$parent....
    this.$dispacth('changePrcie',666)
    },
    eat(){
        console.log('父组件触发的广播事件')
    }
  }
};
</script>