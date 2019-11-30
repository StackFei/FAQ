<template>
  <div>
    <p>sonChild:{{$attrd}}</p>
    <button @click="$listeners.click" @mouseup="$listeners.mouseup">修改</button>
  </div>
</template>

<script>
export default {
  mounted(){
    this.$nextTick(()=>{
      this.$bus.$emit('bus')
    })
  }
};
</script>