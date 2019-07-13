$(() => {
  //先把购物车的数据从本地存储中读取出来
  let jsonStr = localStorage.getItem('shopCartData');
  //判断jsonStr是否为null,是null的话就没有数据，反之则有，需要生成商品列表
  let arr;
  if (jsonStr !== null) {
    arr = JSON.parse(jsonStr);
    //遍历数组 生成结构
    let html ='';
    arr.forEach(e => {
      html += `<div class="item" data-id="${e.pID}">
            <div class="row">
              <div class="cell col-1 row">
                <div class="cell col-1">
                  <input type="checkbox" class="item-ck" checked="">
                </div>
                <div class="cell col-4">
                  <img src="${e.imgSrc}" alt="">
                </div>
              </div>
              <div class="cell col-4 row">
                <div class="item-name">${e.name}</div>
              </div>
              <div class="cell col-1 tc lh70">
                <span>￥</span>
                <em class="price">${e.price}</em>
              </div>
              <div class="cell col-1 tc lh70">
                <div class="item-count">
                  <a href="javascript:void(0);" class="reduce fl">-</a>
                  <input autocomplete="off" type="text" class="number fl" value="1">
                  <a href="javascript:void(0);" class="add fl">+</a>
                </div>
              </div>
              <div class="cell col-1 tc lh70">
                <span>￥</span>
                <em class="computed">${e.price * e.number}</em>
              </div>
              <div class="cell col-1">
                <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
              </div>
            </div>
          </div>`
    });
    //把生成的html字符串放到div里面
    $('.item-list').html(html);
    //把空空如也隐藏
    $(".empty-tip").hide();
    // 把表头+总计显示出来
    $('.cart-header').removeClass('hidden');
    $('.total-of').removeClass('hidden');
  }


})