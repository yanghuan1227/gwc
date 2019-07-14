$(() => {
  //先把购物车的数据从本地存储中读取出来
  let jsonStr = localStorage.getItem('shopCartData');
  //判断jsonStr是否为null,是null的话就没有数据，反之则有，需要生成商品列表
  let arr;
  if (jsonStr !== null) {
    arr = JSON.parse(jsonStr);
    //遍历数组 生成结构
    let html = '';
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

  //计算总和和总价
  function sumPrice() {
    // 算出总计里面的总数量和总价
    // 根据选中的多选框，得到选中的商品的id
    let totalCount = 0;
    let totalMoney = 0;
    $('.item-list input[type=checkbox]:checked').each((i, e) => {
      let id = parseInt($(e).parents('.item').attr('data-id'));
      arr.forEach(e => {
        if (id === e.pID) {
          //勾选在本地存储中的数据
          totalCount += e.number;
          totalMoney += e.number * e.price;
        };
      });
    });
    //修改数量和总价
    $('.selected').text(totalCount);
    $('.total-money').text(totalMoney);
  }
  sumPrice();

  //实现全选和全不选
  $('.pick-all').on('click', function () {
    // 看看自己当前的状态
    let status = $(this).prop('checked');
    // 设置每个商品都和自己一样
    $('.item-ck').prop('checked', status);
    // 还要把上下两个全选都同步
    $('.pick-all').prop('checked', status);
    sumPrice();
  })

  //用委托来实现
  $('.item-ck').on('click', function () {
    // 判断是否全选 - 如果选中的个数和所有的个数是一致的，就是全选了
    let isAll = $('.item-ck').length === $('.item-ck:checked').length;
    $('.pick-all').prop('checked', isAll);
    sumPrice();
  })

  //使用委托的方式加减
  $('.item-list').on('click', '.add', function () {
    // 点击加号，把对应的输入框的文字进行+1
    // 得到旧的数据
    let oldVal = parseInt($(this).siblings('input').val());
    oldVal++;
    if (oldVal > 1) {
      $(this).siblings('.reduce').removeClass('disabled');
    }
    //设置回去
    $(this).siblings('input').val(oldVal);
    // 把本地存储里面的数据，更新
    // 判断依据是 点击的按钮对应的商品的id

    let id = parseInt($(this).parents('.item').attr('data-id'));
    let obj = arr.find(e => {
      return e.pID === id;
    });
    //更新对应的数据
    obj.number = oldVal;
    //覆盖回本地数据
    let jsonStr = JSON.stringify(arr);
    localStorage.setItem('shopCartData',jsonStr);
    //重新计算总和和总价
    sumPrice();
    //采用 jq对象.children() 只能获取子代元素

    $(this).parents('.item').find('.computed').text(obj.price *obj.number);
  })
});