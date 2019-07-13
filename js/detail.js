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
    //如果还有需要修改的添加到后面即可


    //点击加入购物车功能
    $('.addshopcar').on('click',function(){
        //1.把当前对应的商品信息加入购物车  2.本地存储
        //3.图片、名字、单价、数量、pID    4.只有数量需要去获取

        //先获取数量
        let number = parseInt($('.choose-number').val());
        //然后存储   因为会有多个值，所有一般采用数组的形式存，存储中可能会有新旧数据的叠加，所以还需判断
        let jsonStr = localStorage.getItem('shopCartData');
        let arr;
        if(jsonStr === null){
            arr =[];
        }else{
            arr = JSON.parse(jsonStr); 
        }

        //因为这时候出现一个商品点击两次会在购物车出现两次，不符合逻辑，应该把相同的叠加
        //判断当前商品的id,是否在localStorage数组里面，如果出现了就叠加数量

        // find 方法，如果找到了元素，就会返回该元素，但是如果没找到，会返回undefined
        let isExit = arr.find(e=>{
            return e.pID === id;
        });

        if(isExit !== undefined){
            //把数量叠加
            isExit.number+= number;
        }else{
            let good = {
                pID: obj.pID,
                name: obj.name,
                price: obj.price,
                imgSrc: obj.imgSrc,
                number: number,
            }
            //新增
            arr.push(good);
        }
        // 把数组变成json格式的字符串，存储到localStorage里面
        jsonStr = JSON.stringify(arr);
        localStorage.setItem('shopCartData',jsonStr);

        //点击之后 进行跳转
        location.href = 'cart.html';

        
    })
})