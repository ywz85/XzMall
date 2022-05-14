// 整个项目的全局配置文件 例如：服务器地址，各个api地址
export const url ={
  base:'http://www.codeboy.com:9999/'  
}

// 接口：首页数据
url.indexData = url.base + 'data/product/index.php';
// 接口：商品列表/搜索
url.productList = url.base + 'data/product/list.php';
// 接口：品牌列表
url.brandList = url.base + 'data/product/brand.php';
// 接口：商品分类
url.productCategory = url.base + 'data/product/category.php';
// 接口：商品详情
url.productDetails = url.base + "data/product/details.php";
// 接口：用户注册
url.register = url.base +'data/user/register.php';
// 接口：用户登录
url.login = url.base +'data/user/login.php';
// 接口：用户档案
url.profile = url.base +'data/user/get_basic.php';
// 接口：退出登录
url.logout = url.base +'data/user/logout.php';
// 接口：当前用户会话信息
url.sessiondata = url.base + 'data/user/sessiondata';

