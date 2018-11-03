<template>
    <div>
        <div class="logo-img">
            <img class="img" src="../../src/assets/logo/logo.png">
        </div>
        <mt-field label="用户名" placeholder="请输入用户名" v-model="phone"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <mt-field label="验证码" v-model="captcha">
            <img :src="show_captcha" class="btn-code" v-show="show" @click="codeClick">
        </mt-field>
        <div class="btn-login">
            <mt-button class="button" @click.native="loginClick">登录</mt-button>
        </div>
        <div class="btn-reg">
            <mt-button class="button" @click.native="regClick">注册</mt-button>
        </div>
        <div class="btn-return">
            <mt-button class="button" @click.native="getHome">返回首页</mt-button>
        </div>

    </div>
</template>
<script>
    import {Field, Button, Toast} from 'mint-ui';
    //第一种后台请求导入方法
    //import http from 'axios';
    import qs from 'qs'//终端安装npm install qs 并引入


    export default {
        name: 'Login',
        components: {
            Field,
            Button,
            Toast
        },
        //数据
        data() {
            return {
                phone: '',
                password: '',
                captcha: '',
                show: true,
                show_captcha: 'http://192.168.0.188:8083/public/index/register/show_captcha'
            }
        },
        //计算属性
        computed:{
            red(){
                return this.$route.query.red;
            }
        },

        //方法
        methods: {
            loginClick() {
                console.log(this.red);
                if (this.phone === "" || this.password === "" || this.captcha === '') {
                    Toast({
                        message: '登录不能为空',
                        position: 'bottom',
                        duration: 5000
                    });
                } else {
                    let data = {
                        phone: this.phone,
                        password: this.password,
                        captcha: this.captcha,
                    };
                    //axios请求接口 qs转义
                    //第二种方法this.$http请求
                   this.$http.post('/api/public/index/login/login', qs.stringify(data)).then((res) => {
                        console.log(res);
                        if (res.data.status === 200) {
                            //保存token至本地
                            window.sessionStorage.setItem('userName', data.phone);
                            window.sessionStorage.setItem('token', res.data.data.token);
                            let token = res.data.data.token;
                            console.log('本地数据',token);
                            setTimeout(() => {
                                this.$router.push(this.red);
                            }, 1000);
                            Toast({
                                message: '登录成功',
                                position: 'bottom',
                                duration: 5000
                            });

                        } else {
                            this.$router.push('/');
                            Toast({
                                message: res.data.message,
                                position: 'bottom',
                                duration: 5000
                            });
                        }
                    })
                }

            },

            regClick() {
                console.log(this.$http);
                if (this.phone === "" || this.password === "" || this.captcha === '') {
                    Toast({
                        message: '注册不能为空',
                        position: 'bottom',
                        duration: 5000
                    });
                } else {
                    let data = {
                        phone: this.phone,
                        password: this.password,
                        captcha: this.captcha,
                    };
                    //axios请求接口 qs转义
                    //或者this.$http请求
                    this.$http.post('/api/public/index/register/register', qs.stringify(data)).then((res) => {
                        console.log(res);
                        if (res.data.status === 200) {
                            Toast({
                                message: '注册成功',
                                position: 'bottom',
                                duration: 5000
                            });
                        } else {
                            Toast({
                                message: res.data.message,
                                position: 'bottom',
                                duration: 5000
                            });
                        }
                    })
                }
            },
            getHome(){
              this.$router.push('/');
            },
            codeClick() {
                //绑定图片，切换
                /*this.show_captcha = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536753721538&di=a47719bde81b8496f569285bf1d942ee&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D3104647894%2C1504837562%26fm%3D214%26gp%3D0.jpg';
                console.log(this.show_captcha);
                let show_captcha = 'http://192.168.0.188:8083/public/index/register/show_captcha';
                setTimeout(() => {
                    this.show_captcha = show_captcha;
                    console.log(this.show_captcha);
                }, 200);*/
                this.show_captcha = this.show_captcha + ' ';
            }
        }
    }
</script>
<style scoped lang="scss">
    $logo-img-width: 180px;
    $logo-img-height: 180px;
    $img-width: 100%;
    $img-height: 100%;
    $btn-text-align: center;
    $btn-margin: 10px;
    $bt-padding: 23px 90px;
    $bt-text-decoration: none;

    $bt-cursor: pointer;
    $bt-border-radius: 15px;
    $bt-line-height: 4px;
    $bt-font-size: 25px;

    .logo-img {
        width: $logo-img-width;
        height: $logo-img-height;
        margin: auto;
        padding: 30px;

        .img {
            width: $img-width;
            height: $img-height;
            border-radius: 15px;
            border: 1px solid #738866;
        }
    }

    .btn-code {
        margin-left: 10px;
        width: 100px;
        height: 35px;
        border: 1px solid #ddd;
    }

    .btn-login {
        text-align: $btn-text-align;
        margin: $btn-margin;
        .button {
            padding: $bt-padding;
            color: #fff;
            text-decoration: $bt-text-decoration;
            background-color: #24874a;
            cursor: $bt-cursor;
            border-radius: $bt-border-radius;
            text-align: $btn-text-align;
            line-height: $bt-line-height;
            font-size: $bt-font-size;
        }
    }

    .btn-reg {
        text-align: $btn-text-align;
        margin: $btn-margin;
        .button {
            padding: $bt-padding;
            color: #1e743e;
            text-decoration: $bt-text-decoration;
            background-color: #fff;
            cursor: $bt-cursor;
            border-radius: $bt-border-radius;
            line-height: $bt-line-height;
            font-size: $bt-font-size;
        }
    }
    .btn-return{
        text-align: $btn-text-align;
        margin: $btn-margin;
        .button {
            padding: 23px 68px;
            color: #1e743e;
            text-decoration: $bt-text-decoration;
            background-color: #fff;
            cursor: $bt-cursor;
            border-radius: $bt-border-radius;
            line-height: $bt-line-height;
            font-size: $bt-font-size;
        }
    }
</style>