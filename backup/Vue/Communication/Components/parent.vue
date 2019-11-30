<template>
  <div>
    <!-- this.$on(changePrcie,changePrcie) -->
    <Son1 :price="price" @changePrcie="changePrcie"></Son1>
    <!-- 下面两种写法等价 :count.sync="count" -> son2(update:count方法)-->
    <Son2 :count="count" @update:count="newValue=> count = newValue"></Son2>
    <Son2 :count.sync="count"></Son2>
    <!-- 等价上面两种, 局限于穿单个值 -->
    <Son2 v-model="count"></Son2>
    <!-- 将多个属性多个方法一次性传到孙组件 -->
    <Son2 :price="price" :count="count" @click="eat" @mouseup="eat"></Son2>
    <!-- 直接通过真实dom元素获取 -->
    <Son2 ref="son2"></Son2>
  </div>
</template>

<script>
import Son1 from "./son1";
import Son2 from "./son2";
export default {
  data() {
    return {
      price: 100,
      count: 200
    };
  },
  mounted(){
      // 通过实例直接获取
      this.$refs.son2.show()

      // eventsBus
      this.$bus.$on("bus",()=>{console.log('bus')})
  },
  components: {
    Son1,
    Son2
  },
  methods: {
    eat(){
        console.log('hahahah')
    },
    changePrcie(newPrice) {
      this.price = newPrice;
    }
  }
};
</script>