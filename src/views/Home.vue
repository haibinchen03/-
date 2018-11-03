<template>
    <div class="home">
        <div class="swiper-container" style="width: 100%; margin:0 auto;">
            <div class="swiper-wrapper">
                <div class="swiper-slide"><img src="../../src/assets/banner/cantoushi@2x.png" alt=""></div>
                <div class="swiper-slide"><img src="../../src/assets/banner/Group@2x.png" alt=""></div>
                <div class="swiper-slide"><img src="../../src/assets/banner/tounaofengpao@2x.png" alt=""></div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
            <div>
            </div>
        </div>
        <div class="query" @click="searchClick" runat="server">
            <div class="query-input">
                <input class="content"/>
            </div>
            <div class="query-submit">
                <div class="submit">梦境查询</div>
            </div>
        </div>
        <ul class="classification">
            <li class="list-item" @click="listClick(key)"
                v-for="(item, key) in lists"
                :key="key">
                <div class="name">
                    <img class="image" :src="image[key-1]">
                    <p class="txt">{{item}}</p>
                </div>
            </li>
        </ul>
        <div class="hot">
            <div class="text-title">
                <span class="line"></span>
                <span class="title">热门梦境</span>
                <span class="line"></span>
            </div>
            <div class="hot-list">
                <div class="list-txt" @click="hotClick(item)"
                     v-for="(item, index) of list"
                     :key="index"
                     :content="item"
                >
                    <div class="hot-img">
                        <img class="list-img" :src="imgArr[index]">
                    </div>
                    <div class="hot-txt">
                        <h3 class="hot-title">{{item.title}}</h3>
                        <div class="hot-text">{{item.content}}</div>
                    </div>
                </div>
            </div>
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
    // @ is an alias to /src
    import 'swiper/dist/css/swiper.min.css';
    import Swiper from 'swiper'
    import {Toast} from 'mint-ui'
    import qs from 'qs'//终端安装npm install qs 并引入
    export default {
        name: 'Hone',
        components: {
            Toast,
        },

        data() {
            return {
                image: [require('../../src/assets/icon/icon@1x_0.png'), require('../../src/assets/icon/icon@1x_1.png'), require('../../src/assets/icon/icon@1x_2.png'), require('../../src/assets/icon/icon@1x_3.png'), require('../../src/assets/icon/icon@1x_4.png'), require('../../src/assets/icon/icon@1x_5.png'), require('../../src/assets/icon/icon@1x_6.png'), require('../../src/assets/icon/icon@1x_7.png'), require('../../src/assets/icon/icon@1x_8.png'), require('../../src/assets/icon/icon@1x_9.png')],
                lists: [],
                list: [],
                imgArr: [],

            }
        },
        //轮播图
        mounted() {
            console.log('123',document.querySelector('.swiper-container'));
            let mySwiper = new Swiper('.swiper-container', {
                autoplay: true,
                loop: true,
                direction: 'horizontal',
                paginationClickable: true,
                speed: 600,
                observer: true,
                observeParents: true,
                grabCursor: true,

                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    bulletActiveClass: 'my-bullet-active',
                }
            });
            mySwiper.el.onmouseover = function () {
                mySwiper.autoplay.stop();
            };
            mySwiper.el.onmouseout = function () {
                mySwiper.autoplay.start();
            };
            this.getList();
            this.getHotList()
        },
        methods: {
            //搜索框跳转搜索页
            searchClick() {
                //获取token
                let token = window.sessionStorage.getItem('token');
                console.log('本地token', token);
                this.$router.push('/Search');//跳转搜索页
            },
            //随机数抽取方法
            randomImg() {
                let count = 50;
                let originalArray = new Array;//原数组
                //给原数组originalArray赋值
                for (let i = 0; i < count; i++) {
                    originalArray[i] = i + 1;
                }
                let indexs = getArrayItems(originalArray, 1);

                function getArrayItems(arr, num) {
                    //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
                    let temp_array = new Array();
                    for (let index in arr) {
                        temp_array.push(arr[index]);
                    }
                    //取出的数值项,保存在此数组
                    let return_array = new Array();
                    for (let i = 0; i < num; i++) {
                        //判断如果数组还有可以取出的元素,以防下标越界
                        if (temp_array.length > 0) {
                            //在数组中产生一个随机索引
                            let arrIndex = Math.floor(Math.random() * temp_array.length);
                            //将此随机索引的对应的数组元素值复制出来
                            return_array[i] = temp_array[arrIndex];
                            //然后删掉此索引的数组元素,这时候temp_array变为新的数组
                            temp_array.splice(arrIndex, 1);
                        } else {
                            //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
                            break;
                        }
                    }
                    return return_array[0];
                }

                return indexs;
            },
            //获取类别列表
            getList() {
                let token = window.sessionStorage.getItem('token');
                //console.log('1', token);
                let data = {
                    user_token: token
                };
                this.$http.post('/api/public/index/category', qs.stringify(data)).then((res) => {
                    let data = res.data;
                    if (data.status === 200) {
                        this.lists = data.data;
                    } else {
                        Toast({
                            message: res.data.message,
                            position: 'bottom',
                            duration: 5000
                        });
                    }
                })
            },
            //获取热门列表
            getHotList() {
                let token = window.sessionStorage.getItem('token');
                let data = {
                    user_token: token
                };
                this.$http.post('/api/public/index/index/getrank', qs.stringify(data)).then((res) => {
                    let data = res.data;
                    if (data.status === 200) {
                        this.list = data.data.data;
                        let len = data.data.data.length;
                        this.imgArr = [];
                        for (let i = 0; i < len; ++i) {
                            let index = this.randomImg();
                            let content = data.data.data[i].content;
                            let text = content.replace(/[*]/g, '');
                             this.list[i].content = text;
                            this.imgArr.push(require('../../src/assets/imgs/' + index + '.png'))
                        }
                        //console.log(this.list);
                    } else {
                        Toast({
                            message: res.data.message,
                            position: 'bottom',
                            duration: 5000
                        });
                    }
                })
            },
            //点击跳入分类列表
            //跳转页面带参数
            listClick(key) {
                console.log('1', key);
                this.$router.push({
                    name: 'Lister',
                    query: {
                        cid: key,
                    }
                })
            },
            //热门跳转详情页
            hotClick(item) {
                this.$router.push({
                    name: 'Detail',
                    query: {
                        mid: item.mid,
                    }
                })
            },
            //跳转首页
            pageClick() {
                window.sessionStorage.getItem('token');
                this.$router.push('/');
            },
            //跳转个人中心
            MyClick() {
                window.sessionStorage.getItem('token');
                this.$router.push('/personal');
            }
        },
    }
</script>
<style scoped lang="scss">
    $s-width: 100%;
    $s-w: 100%;
    $s-h: 100%;
    $s-bg: #fff;
    $s-color: #999;
    $s-center: center;
    $s-padding: 5px;
    $s-ds: inline-block;
    $s-dsp: flex;
    $h-m: 0 10px;


    /*头部*/
    img {
        width: $s-width;
        height: auto;
    }

    /*搜索框*/
    .query {
        text-align: $s-center;
        margin: 10px 20px;
        display: $s-dsp;
        height: 29px;
        line-height: 29px;
        .query-input {
            flex: 1;
            .content {
                width: $s-w;
                height: $s-h;
                background-color: $s-bg;
                padding: 0;
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

    /*列表*/
    .classification {
        display: $s-dsp;
        padding-left: 0;
        flex-wrap: wrap;
        margin-bottom: 5px;

        .list-item {
            list-style: none;
            flex: 0 0 20%;
            .name {
                text-align: $s-center;
                .image {
                    width: 30px;
                    height: 30px;
                }
                .txt {
                    font-size: 14px;
                    margin: 5px 0 5px 0;
                }
                .hot-list {
                    margin: 0 10px;
                }
            }
        }
    }

    /*热门*/
    .hot {
        margin: 0 0 52px 0;
        .text-title {
            height: 40px;
            line-height: 40px;
            text-align: $s-center;
            .line {
                display: $s-ds;
                width: 120px;
                border-top: 1px solid #999999;
            }
            .title {
                font-size: 16px;
                color: #999999;
                vertical-align: -5px;
            }
        }
        .hot-list {
            margin: $h-m;
            .list-txt {
                display: flex;
                .hot-img {
                    .list-img {
                        width: 50px;
                        height: 50px;
                        border-radius: 30px;
                        margin-top: 20px;
                    }
                }
                .hot-txt {
                    margin: $h-m;
                    border-bottom: 1px solid #999999;
                    padding-bottom: 10px;
                    .hot-title {
                        font-size: 18px;
                        color: #131313;
                        font-weight: bold;
                        margin: 10px 0 10px 0;
                    }
                    .hot-text {
                        font-size: 14px;
                        padding: 0 5px;
                        line-height: 22px;
                        color: #1f1f1f;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        word-break: break-all;
                    }
                }
            }
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