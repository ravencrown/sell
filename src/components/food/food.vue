<template lang="html">
    <div class="food" v-show="showFlag" transition="move">
        <div class="food-content">
            <div class="image-header">
                <img :src="food.image">
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            food: {
                type: Object
            }
        },
        data() {
            return {
                showFlag: false
            };
        },
        methods: {
            // 父组件是可以调用子组件的方法，但子组件是不能调用父组件的方法
            show() {
                // this.showFlag = true;
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .food
        position: fixed
        left: 0
        top: 0
        bottom: 48px
        z-index: 30
        width: 100%
        background-color: #fff
        &.move-transition
            transition: all .2s linear
            transform: translate3d(0, 0, 0)
        &.move-enter, &.move-leave
            transform: translate3d(100%, 0, 0)

</style>
