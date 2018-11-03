<template>
    <div>
        <div class="header">
            <img class="header-img" src="../../src/assets/logo/111.png">
        </div>
        <div class="middle">
            <h2 class="middle_title" v-html="title"></h2>
            <p class="middle_reading" v-html="reading"></p>
            <p class="middle_className" v-html="className"></p>
            <div class="middle_text">
                <p v-for="
                (text, index) in contents"
                   :key="index"
                >{{text}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import qs from 'qs'//终端安装npm install qs 并引入
    export default {
        name: "detail",
        components: {
            Toast
        },
        data() {
            return {
                title: '',
                reading: '',
                className: '',
                contents: [],
            }
        },
        //接收参数并计算
        computed: {
            mid() {
                return this.$route.query.mid
            },
        },

        methods: {
            getDetail() {
                let token = window.sessionStorage.getItem('token');
                let data = {
                    mid: this.mid,
                    user_token:token
                };
                this.$http.post('/api/public/index/detail', qs.stringify(data)).then((res) => {
                    //console.log('Detail', res);
                    let data = res.data;
                    //console.log(data);
                    if (data.status === 200) {
                        this.title = data.data.lx;
                        this.className = data.data.title;
                        this.reading = data.data.mid;
                        this.contents = data.data.content
                    }else {
                        Toast({
                            message: res.data.message,
                            position: 'bottom',
                            duration: 5000
                        });
                    }
                })
            }
        },
        mounted() {
            this.getDetail()
        }

    }
</script>

<style scoped lang="scss">
    $s-w: 100%;
    $s-h: 100%;
    $s-margin: auto;
    $s-bor: 2px solid #bfd6da;
    $s-p: 0 0 6px 10px;
    $s-bor: 1px solid #8f8994;
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

    .middle {
        padding: $s-p;
        .middle_title {
            font-size: 25px;
            color: #1f1f1f;
            padding-left: 5px;
            font-style: italic;
            margin: 10px 0 10px 0;
        }
        .middle_reading{
            font-size: 18px;
            padding: $s-p;
            border-bottom: $s-bor;
            margin: 0 25px 0 0;
        }
        .middle_className{
            font-size: 20px;
            padding: $s-p;
            border-bottom: $s-bor;
            margin: 22px 25px 0 0;
        }
        .middle_text{
            font-size: 16px;
            padding:0 15px;
            line-height:22px
        }
    }
</style>