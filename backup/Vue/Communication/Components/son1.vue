<template>
  <div>
    <p>son:{{price}}</p>
    <button @click="sonChange()">修改</button>
    <!-- 恶心的写法 -->
    <!-- <sonChild :price="price" @sonChildChange="sonChildChange"></sonChild> -->
    <!-- 修改 直接让孙组件触发父组件以及绑定的方法 $parent(changePrcie)-->
    <sonChild :price="price"></sonChild>
  </div>
</template>

<script>
import sonChild from "./sonchild1";
export default {
  components: {
    sonChild
  },
  props: {
    price: {
      type: Number
    }
  },
  methods: {
    sonChange() {
      this.$emit("changePrcie", 666);
    },
    // 恶心的写法
    // sonChildChange(newPrice){
    //     this.$emit("changePrcie", newPrice);
    // }
  }
};
</script>