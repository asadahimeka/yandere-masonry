import VirtualWaterfall from './VirtualWaterfall.vue'
export { VirtualWaterfall }
export default VirtualWaterfall

// 全局引入时，需要声明一下全局组件，不然没有提示
declare module 'vue' {
  export interface GlobalComponents {
    VirtualWaterfall: typeof VirtualWaterfall
  }
}
