<template>
    <li class="list-item" @click="itemClick">{{index}}.{{content}}</li>
</template>

<script>
    export default {
        props: ['content', 'index'],//对传过来的数据进行声明
        methods: {
//点击搜索列表详情
            itemClick() {
                this.$emit('itemClick') //匹配监听这个事件
            }
        },

    }
</script>


<style scoped lang="scss">
    .list-item {
        list-style: none;
        margin: 37px 20px 30px 0;
        padding: 0 0 10px 10px;
        border-bottom: 1px solid #8f8994;
    }

</style>
