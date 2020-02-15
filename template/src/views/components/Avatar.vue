<template>
  <div class="avatar" :style="style">
    <img :src="src" v-if="src" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Avatar extends Vue {
  @Prop({ type: String, default: "" }) src!: string;
  @Prop({ type: String, default: "40px" }) size!: string;

  get style() {
    return {
      width: this.size,
      height: this.size
    };
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  border-radius: 50%;
  background-color: #cccccc;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>