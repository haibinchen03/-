<template>
    <div>
        <div class="header">
            <img class="header-img" src="../../src/assets/logo/111.png">
        </div>
        <ul class="wrappers"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10"
        >
            <search-list v-on:itemClick="detailClick(item)"
                         v-for="(item, index) of list"
                         :key="index"
                         :content="item.title"
                         :index="index+1"
            > </search-list>
        </ul>

    </div>
</template>

<script>
    import SearchList from '../components/SearchList' //引入局部组件
    import {Toast, InfiniteScroll} from 'mint-ui';
    import qs from 'qs'//终端安装npm install qs 并引入
    export default {
        name: "lister",
        components: {
            Toast,
            InfiniteScroll,
            'search-list': SearchList, //对局部组件声明
        },
        data(){
            return{
                loading: false,
                list:[],
                current_page: 1,
                per_page: 20,
                last_page: 0,
            }
        },
        //接收参数并计算
        computed: {
            cid() {
                return this.$route.query.cid
            },
        },
        methods:{
            getLister(){
                let token = window.sessionStorage.getItem('token');
                let data = {
                    cid: this.cid,
                    page: this.current_page,
                    per_page: this.per_page,
                    user_token:token
                };
                if(this.current_page ===  this.last_page){
                    return
                }
                this.$http.post('/api/public/index/category/cg', qs.stringify(data)).then((res) => {
                    let data = res.data;
                    if (data.status === 200) {
                        let listInfo = data.data;
                        let list = listInfo.data;
                        this.last_page = listInfo.last_page;
                        this.list = this.list.concat(list);
                        this.current_page++;
                        this.loading = false;
                    }else {
                        Toast({
                            message: res.data.message,
                            position: 'bottom',
                            duration: 5000
                        });
                    }
                })
            },
            loadMore() {
                this.loading = true;
                this.getLister();
            },

            detailClick(item){
                this.$router.push({
                    name: 'Detail',
                    query: {
                        mid: item.mid,
                    }
                })
            }
        },

        mounted() {
            //this.getLister()
        }

    }
</script>

<style scoped lang="scss">
    $s-w: 100%;
    $s-h: 100%;
    $s-margin: auto;
    $s-bor: 2px solid #bfd6da;
    .header {
        width: $s-w;
        height: 180px;
        margin: $s-margin;
        padding-bottom: 10px;
        border-bottom: $s-bor;
        .header-img {
            width: $s-w;
            height: $s-h;
        }
    }
</style>