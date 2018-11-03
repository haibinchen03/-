<template>
    <div>
        <div class="header">
            <img class="header-img" src="../../src/assets/logo/111.png">
        </div>
        <div class="query" runat="server">
            <div class="query-input">
                <input class="content" placeholder="请输入梦境关键词" v-model="keywords"/>
            </div>
            <div class="query-submit">
                <div class="submit" @click="searchListClick">梦境查询</div>
            </div>
        </div>
        <ul class="wrapper">
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
    import {Toast} from 'mint-ui';
    import qs from 'qs'//终端安装npm install qs 并引入
    export default {
        name: "Search",

        components: {
            Toast,
            'search-list': SearchList, //对局部组件声明
        },

        data() {
            return {
                keywords: '',
                list: []

            }
        },
        methods: {

            //点击搜索
            searchListClick() {
                if (this.keywords === '') {
                    Toast({
                        message: '搜索不能为空',
                        position: 'bottom',
                        duration: 5000
                    });
                } else {
                    let token = window.sessionStorage.getItem('token');
                    console.log(token);
                    let data = {
                        keywords: this.keywords,
                        user_token:token
                    };
                    this.$http.post('/api/public/index/search?keywords=', qs.stringify(data)).then((res) => {
                        //console.log('res',res);
                        let data = res.data;
                        if (data.status === 200) {
                            let keys = res.data.data.data;
                            //console.log('结果', keys);
                            this.list = keys;
                            this.keywords = '';
                            console.log('值', keys);
                        }else{
                            Toast({
                                message: res.data.message,
                                position: 'bottom',
                                duration: 5000
                            });
                        }
                    })
                }

            },
            //点击详情页
            //通过路由传参
            detailClick(item){
                this.$router.push({
                    name: 'Detail',
                    query: {
                        mid: item.mid,
                    }
                })

            }

        }

    }


</script>

<style scoped lang="scss">
    $s-w: 100%;
    $s-h: 100%;
    $s-margin: auto;
    $s-bor: 2px solid #bfd6da;
    $s-bg: #fff;
    $s-color: #999;
    $s-center: center;
    $s-padding: 5px;
    $s-ds: inline-block;
    .header {
        width: $s-w;
        height: 180px;
        margin: $s-margin;
        padding-bottom: 10px;
        border-bottom: $s-bor;
        .header-img {
            width: $s-w;
        }
    }
    .query {
        text-align: $s-center;
        margin: 10px 20px;
        display: flex;
        height: 29px;
        line-height: 29px;
        .query-input {
            flex: 1;
            .content {
                width: $s-w;
                height: $s-h;
                background-color: $s-bg;
                padding: 0 ;
                outline: none;
                color: $s-color;
                border: 2px solid #97d4da;
                border-radius: 15px;
            }
        }
        .query-submit {
            flex: 0 0 80px;
            margin-left: 15px;
            .submit {
                height: $s-h;
                border: 1px solid #ff6470;
                border-radius: 5px;
                color: #83b8bd;
            }
        }
    }
    .wrapper{

    }
</style>