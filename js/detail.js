$(()=>{
    //先获取location.search中商品的id
    let id = parseInt(location.search.substring(4));
    // 根据id到数据里面，获取对应的数据，展示在页面上
    let obj = phoneData.find(e=>{
    // find函数要求传入的参数是一个函数，函数的要求是返回一个条件，find方法返回的是满足条件的数组里面的某一个元素
        return e.pID === id;
    });
    $('.sku-name').text(obj.name);
    $('.preview-img >img').attr('src',obj.imgSrc);
    $('.summary-price em').text('￥'+ obj.price);
})