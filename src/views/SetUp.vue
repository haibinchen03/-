<template>
    <div>
        <div class="header">
            <img class="header-img" src="../../src/assets/logo/111.png">
        </div>
        <div class="head">
            <div class="header_left">
                <div class="head-portrait">
                    <img class="portrait" :src="user_header" @click="uploadHeadImg">
                    <input accept="image/*" type="file" class="hiddenInput" @change="handleFile" ref="myIp"
                           style="display: none">
                </div>
                <div class="right">
                    <div class="nickname">
                        <div class="nick">昵称:</div>
                        <input class="name" id="names" type="text" v-model="user_name">
                    </div>
                    <div class="individuality-signature">
                        <div id="click" class="individuality">个性签名:</div>
                        <input id="t" class="signature" type="text" v-model="user_sign">
                    </div>
                </div>
            </div>
            <div class="setUp_right">
                <div class="setUp-on" @click="setUp">确认</div>
            </div>
        </div>
    </div>

</template>

<script>
    import {Toast} from 'mint-ui';
    import qs from 'qs'//终端安装npm install qs 并引入
    import VueCropper from 'vue-cropper';

    export default {
        name: "set-up",
        components: {
            Toast,
            VueCropper
        },
        data() {
            return {
                user_name: '',
                user_sign: '',
                user_header: '',
                imgData: {
                    accept: 'image/gif, image/jpeg, image/png, image/jpg',
                }

            }
        },

        methods: {
            //获取个人资料
            getDetailed() {
                let token = window.sessionStorage.getItem('token');
                let data = {
                    user_token: token
                };
                this.$http.post('/api/public/index/user', qs.stringify(data)).then((res) => {
                    let data = res.data;
                    if (data.status === 200) {
                        let lin = data.data;
                        this.user_name = lin.user_name;
                        this.user_sign = lin.user_sign;
                        this.user_header = lin.user_headimg;

                    } else {
                        //this.$router.push('/Login');

                        this.$router.push({
                            name: 'Login',
                            query: {
                                red:'/setUp',
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

            //点击打开图片上传
            uploadHeadImg() {
                this.$el.querySelector('.hiddenInput').click();

            },
// 将头像显示
            handleFile(event) {
                let img = event.target.files[0];
                let type = img.type;//文件的类型，判断是否是图片
                let size = img.size;//文件的大小，判断图片的大小
                if (this.imgData.accept.indexOf(type) === -1) {
                    Toast({
                        message: '请选择我们支持的图片格式！',
                        position: 'bottom',
                        duration: 5000
                    });
                    return false;
                }
                if (size > 3145728) {
                    Toast({
                        message: '请选择3M以内的图片！',
                        position: 'bottom',
                        duration: 5000
                    });
                    return false;
                }
                this.getObjectURL(img);
                this.user_header = this.getObjectURL(img);
                let form = new FormData();
                form.append('file', img, img.name);
            },

            //建立可存取到file的url
            getObjectURL(file) {
                let url = null;
                if (window.createObjectURL != undefined) {  //basic
                    url = window.URL.createObjectURL(file);
                } else if (window.URL != undefined) {  // mozilla(firefox)
                    url = window.URL.createObjectURL(file);
                } else if (window.webkitURL != undefined) { // webkit or chrome
                    url = window.webkitURL.createObjectURL(file);
                }
                return url;
            },
            //点击保存
            setUp() {
                //判断设置昵称字数不能超出12字
                let length = 12;
                //判断设置个性签名的字数不能超出28字
                let index = 28;
                let content_len = this.user_name.length;
                let my_len = length - content_len;
                let content = this.user_sign.length;
                let content_lens = index - content;
                window.sessionStorage.getItem('token');
                if (this.user_name === '') {
                    Toast({
                        message: '昵称不能为空!',
                        position: 'bottom',
                        duration: 5000
                    });
                    return false;
                } else if (my_len <= 0) {
                    Toast({
                        message: '设置的昵称字数超出,请重新设置',
                        position: 'bottom',
                        duration: 5000
                    });
                    return false;
                } else if (content_lens <= 0) {
                    Toast({
                        message: '设置签名字数超出,请重新设置',
                        position: 'bottom',
                        duration: 5000
                    });
                    return false
                } else {
                    let data = new FormData();

                    let imgFile = this.$refs.myIp.files[0];
                    data.append('user_headimg', imgFile);
                    data.append('user_token', window.sessionStorage.getItem('token'));
                    data.append('user_sign', this.user_sign);
                    data.append('user_name', this.user_name);
                    this.$http.post('/api/public/index/user/save', data).then((res) => {
                        //console.log(res);
                        if (res.data.status === 200) {
                            Toast({
                                message: '修改成功',
                                position: 'bottom',
                                duration: 5000
                            });
                            setTimeout(() => {
                                window.sessionStorage.getItem('token');
                                this.$router.push('/Personal')
                            }, 1000);
                        } else {
                            this.$router.push({
                                name: 'Login',
                                query: {
                                    red:'/setUp',
                                }
                            });
                            Toast({
                                message: res.data.message,
                                position: 'bottom',
                                duration: 5000
                            });
                        }
                    });
                }

            },
        },

        mounted() {
            this.getDetailed()
        },
    };


</script>

<style scoped lang="scss">
    /*头部*/
    $s-w: 100%;
    $s-h: 100%;
    $s-margin: auto;
    .header {
        width: $s-w;
        height: 180px;
        margin: $s-margin;
        padding-bottom: 10px;
        .header-img {
            width: $s-w;
            height: $s-h;
        }
    }

    .head {
        margin: 10px;
        .header_left {
            text-align: center;
            .head-portrait {
                width: $s-w;
                .portrait {
                    border-radius: 40px;
                    border: 1px solid #da668b;
                    width: 80px;
                    height: 80px;
                }
            }
            .right {
                padding: 10px 0;
                .nickname {
                    padding: 20px 0;
                    .nick {
                        font-size: 30px;
                    }
                    .name {
                        width: 60%;
                        height: 35px;
                        padding: 0;
                        font-size: 14px;
                        background-color: #fff;
                        outline: none;
                        color: #1f1f1f;
                        border: 1px solid #97d4da;
                        border-radius: 10px;
                    }
                }
                .individuality-signature {
                    font-size: 30px;
                    .signature {
                        width: 80%;
                        height: 35px;
                        padding: 0;
                        font-size: 14px;
                        background-color: #fff;
                        outline: none;
                        color: #1f1f1f;
                        border: 1px solid #97d4da;
                        border-radius: 10px;
                    }
                }
            }
        }
        .setUp-on {
            width: 50%;
            text-align: center;
            height: 40px;
            line-height: 40px;
            font-size: 15px;
            border-radius: 10px;
            border: 1px solid #97d4da;
            background-color: #97d4da;
            color: #fff;
            margin: 30px auto 30px;

        }
    }
</style>