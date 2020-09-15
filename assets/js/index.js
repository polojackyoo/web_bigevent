function getContent() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        },
    })
}
getContent()
function renderAvatar(res) {
    var name = res.nickname || res.username
    $('#welcome').html(`欢迎${name}`)
    if (res.user_pic !== null) {
        $('.layui-nav-img').attr('src', res.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var num = name[0].toUpperCase() // 转大写
        $('.text-avatar').html(num).show()
    }
}
var layer = layui.layer
$('#btnLogout').on('click', function () {
    // console.log(111);
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
        // 1. 清空本地存储中的 token
        localStorage.removeItem('token')
        // 2. 重新跳转到登录页面
        location.href = './login.html'
        // 关闭 confirm 询问框
        layer.close(index)
    })
})