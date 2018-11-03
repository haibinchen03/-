<template>
    <div class="cation" @click="itemsClick">
        <p class="category">{{index}}.{{content.lx}}</p>
        <p class="title-t">{{content.title}}</p>
    </div>
</template>

<script>
    export default {
        props: ['content', 'index'],//对传过来的数据进行声明
        name: "history-list",

        //方法
        methods:{
            itemsClick(){
                this.$emit('itemsClick') //匹配监听这个事件
            }
        },
    }
</script>

<style scoped lang="scss">
    .cation{
        margin-left: 10px;
        border-bottom: 1px solid #999;
        &:last-child{
             border-bottom: 0;
         }
        .category{
            font-style: italic;
            font-size: 20px;
            margin: 8px 0 8px 0;
        }
        .title-t{
            margin: 8px 0 8px 15px;
            font-size: 14px;
        }
    }

</style>