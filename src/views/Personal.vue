<template>
    <div>
        <div class="top" ref="top">
            <div class="header">
                <img class="header-img" @load="setTop" src="../../src/assets/logo/111.png">
        </div>
            <div class="middle">
                <div class="head" @click="headClick">
                    <div class="header_left">
                        <div class="head-portrait">
                            <img class="portrait" :src="user_header">
                        </div>
                        <div class="right">
                            <div class="nickname">
                                <div class="nick">昵称:</div>
                                <div class="name" v-html="user_name"></div>
                            </div>
                            <div class="individuality-signature">
                                <div class="individuality">个性签名:</div>
                                <div class="signature" v-html="user_sign"></div>
                            </div>
                        </div>
                    </div>
                    <div class="setUp_right">
                        <p class="setUp">设置</p>
                    </div>
                </div>
                <div class="middle-right">
                    <p class="exit" @click="getExit">退出登录</p>
                </div>
            </div>
        </div>
        <div class="history"
            :style="{top:historyTop+'px'}"
        >
            <div class="title-txt">历史梦境</div>
            <history-list class="history-txt" v-on:itemsClick="historyClcik(item)"
                          v-for="(item, index) of list"
                          :key="index"
                          :content="item"
                          :index="index+1"
            >
            </history-list>
        </div>

        <div class="my-page">
            <div class="lists-t">
                <div class="list-icon" @click="pageClick">
                    <img class="img-h" src="../../src/assets/icon/shouye.png">
                    <span>首页</span>
                </div>
                <div class="list-icon" @click="MyClick">
                    <img class="img-h" src="../../src/assets/icon/people@2x.png">
                    <span>我的</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import HistoryList from '../components/HistoryList' //引入局部组件
    import qs from 'qs'//终端安装npm install qs 并引入
    export default {
        name: "Personal",
        components: {
            Toast,
            'history-list': HistoryList
        },
        data() {
            return {
                user_name: '',
                user_sign: '',
                user_header: '',
                list: [],
                historyTop:0,

            }
        },

        methods: {
            //获取浏览器窗口变化的高度
            setTop(){
               let height = this.$refs.top.offsetHeight;
                //console.log(height)
                this.historyTop = height;
            },

    //点击修改个人中心
            headClick() {
                let token = window.sessionStorage.getItem('token');
                //console.log(token);
                this.$router.push('/SetUp')
            },

            //获取个人资料
            getDetailed() {
                let token = window.sessionStorage.getItem('token');
                let data = {
                    user_token: token,
                };
                this.$http.post('/api/public/index/user', qs.stringify(data)).then((res) => {
                    let data = res.data;
                    if (data.status === 200) {
                        let lin = data.data;
                        this.user_name = lin.user_name;
                        this.user_sign = lin.user_sign;
                        this.user_header = lin.user_headimg;
                        this.list = lin.record;

                    } else {
                        //this.$router.push('/login');
                        this.$router.push({
                            name: 'Login',
                            query: {
                                red: '/personal'
                            }
                        });
                        Toast({
                            message: res.data.message,
                            position: 'bottom',
                            duration: 5000
                        });
                    }
                })
            },
            //历史梦境点击跳转详情
            historyClcik(item) {
                this.$router.push({
                    name: 'Detail',
                    query: {
                        mid: item.mid,
                    }
                })
            },

            //退出登录
            getExit(){
                let token = window.sessionStorage.getItem('token');
                let data = {
                    user_token: token,
                };
                this.$http.post('/api/public/index/login/unlogin',qs.stringify(data)).then((res)=>{
                    let data = res.data;
                    console.log(data);
                    if(data.status===200){
                        window.sessionStorage.removeItem('userName');
                        window.sessionStorage.removeItem('token');
                        Toast({
                            message: '退出成功',
                            position: 'bottom',
                            duration: 5000
                        });
                        setTimeout(()=>{
                            this.$router.push('/')
                        },1000);

                    }else{
                        Toast({
                            message: res.data.message,
                            position: 'bottom',
                            duration: 5000
                        });
                    }

                })
            },

            //跳转首页
            pageClick() {
                //window.sessionStorage.getItem('token');
                this.$router.push('/');
            },
            //跳转个人中心
            MyClick() {
                //window.sessionStorage.getItem('token');
                this.$router.push('/Personal');
            }
        },

        mounted() {
            this.getDetailed();
            let _this_=this;
           //监听浏览器
           window.addEventListener('resize', function() {
               _this_.setTop();
            })

        },
    }
</script>

<style scoped lang="scss">
    $s-w: 100%;
    $s-h: 100%;
    $s-margin: auto;
    $s-bor: 2px solid #bfd6da;
    .top {
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
    }

    .header {
        width: $s-w;
        margin: $s-margin;
        .header-img {
            width: $s-w;
        }
    }

    $h-d: flex;
    $h-f: 1;
    .middle {
        display: $h-d;
        border-bottom: 1px solid #999;
        .head {
            width: 70%;
            .header_left {
                display: $h-d;
                padding: 10px 0 0 0;
                margin-left: 10px;
                .head-portrait {
                    flex: $h-f;
                    width: $s-w;
                    height: $s-h;
                    .portrait {
                        width: 40px;
                        height: 40px;
                        border-radius: 25px;
                        border: 1px solid #da668b;
                    }
                }
                .right {
                    padding-left: 10px;
                    .nickname {
                        display: $h-d;
                        color: #1f1f1f;
                        font-size: 18px;
                        padding: 0 5px;
                        .nick {
                            color: #222023;
                            font-weight: bold;
                        }
                        .name {
                            padding-left: 5px;
                            font-size: 16px;
                        }
                    }
                    .individuality-signature {
                        display: $h-d;
                        font-size: 18px;
                        color: #030303;
                        padding: 10px 5px;
                        .signature {
                            padding-left: 5px;
                            font-size: 14px;
                            flex: 1;
                            line-height: 20px;
                            display: block;
                            width: 200px;
                            word-break: keep-all; /* 不换行 */
                            white-space: nowrap; /* 不换行 */
                            overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
                            text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...)*/
                        }
                    }
                }
            }
            .setUp_right {
                width: 78px;
                position:relative;
                padding-left:20px;
                text-align: center;
                .setUp {
                    margin: 0 0 15px 0;
                    font-size: 18px;
                    color: #fff;
                    background: #568760;
                    padding: 3px;
                    border-radius: 5px;
                }
            }
        }
        .middle-right {
            flex: 1;
            width: 20%;
            text-align:center;
            position:relative;
            padding-left:5px;
            .exit {
                position:absolute;
                bottom:15px;
                margin:0;
                font-size: 18px;
                color: #1e743e;
                background: #fff;
                border: 1px solid #9a939f;
                padding: 2px;
                border-radius: 5px;
            }
        }
    }

    /*历史梦境*/
    .history {
        position: fixed;
        top: 310px;
        left: 0;
        right: 0;
        bottom: 51px;
        overflow-y: scroll;
        .title-txt {
            color: #568760;
            font-size: 30px;
            padding: 5px 0;
            text-align: center;
            font-style: italic;
        }
        .history-txt {
            margin: 5px 20px 0 30px;
        }
    }

    $p-d: flex;
    $p-a: center;
    $p-w: 25px;
    $p-h: 25px;
    $p-c: #1e1e1e;
    $p-l: 20px;
    $p-f: 16px;
    /*首页我的*/
    .my-page {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: $s-w;
        background: #fff;
        z-index: 200;
        .lists-t {
            display: $p-d;
            justify-content: space-around;
            border-top: 1px solid #9a939f;
            height: 50px;
            align-items: $p-a;
            .list-icon {
                display: $p-d;
                flex-direction: column;
                align-items: $p-a;
                text-decoration: none;
                span {
                    color: $p-c;
                    line-height: $p-l;
                    font-size: $p-f;
                }
                .img-h {
                    width: $p-w;
                    height: $p-h;
                }
            }
        }
    }
</style>