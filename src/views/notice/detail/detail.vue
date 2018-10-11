<template>
    <div class="main-container">
        <article class="weui-article">
            <h1>{{title}}</h1>
            <p class="weui-media-box__desc">{{date}}</p>
            <section>
                {{content}}
            </section>
        </article>
    </div>
</template>

<script>
export default {
    name: 'notice-detail',
    data () {
        return {
            title: '2018年国庆节放假通知',
            date: '2018-9-28',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\
                consequat.'
        }
    },
    created () {
        let id = this.$route.query.id
        console.log(id)
    },
    methods: {

    }
}
</script>

<style scoped>
.weui-media-box__desc {
    font-size: 14px;
}
</style>
