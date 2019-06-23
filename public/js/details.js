$(function(){
  if (location.search!=="") {
   var lid=location.search.split("=")[1]
  $.ajax({
    url:"http://localhost:3000/details",
    type:"get",
    data:{lid},
    datatype:"json",
    success:function(result){
     console.log(result);
     //先将三大块数据结构出来
     var {product,specs,pics}=result;
     var{title,subtitle,price,promise}=product;
     //1.填充右上角基本信息
     $("#title").html(title);
     $("#subtitle").html(subtitle);
     $("#price").html(`￥${price.toFixed(2)}`);
     $("#promise").html(promise);
     //2.填充右侧规格列表
     //先声明一个空字符串
     var html="";
    //遍历specs数组中的对象 每遍历一个就拼接一个
    for(var sp of specs){
      html +=`<a class="btn btn-sm btn-outline-secondary ${product.lid==sp.lid?'active':''}" href="product_details.html?lid=${sp.lid}">${sp.spec}</a>`
    }
    $("#specs").html(html);
     //3.放大镜效果
     //3.1填充图片
     //3.1.1填充小图片列表
      var html = '';
      for (var p of pics) {
        html += `<li class="float-left p-1">
         <img src="${p.sm}" data-md="${p.md}" data-lg="${p.lg}">
               </li>`
      }
      var $ulImgs = $("#ul-imgs");
      // console.log($UlImgs);
      //因为宽不够 要临时根据图片的张数计算ul的宽：张数*图片宽
      var LIWIDTH = 62;
      $ulImgs.html(html)
        .css("width", pics.length * LIWIDTH);
    //3.1.2填充一张中图片
      var $mImg = $("#mimg")
      $mImg.attr("src", pics[0].md)
     //3.2点击箭头,移动小图片
      var times=0;
      var $btnLeft=$("#btnLeft");
      var $btnRight = $("#btnRihgt");
      //每单击一次右按钮，times+1 left-top=-times*LIWIDTH
       $btnRight.click(function () {
         if (!$btnRight.is(".disabled")){
         times++;
         $ulImgs.css("margin-left",-times*LIWIDTH);
         //如果右边按钮能点击 左边按钮一定启用
          $btnLeft.removeClass("disabled");
           //如果times次数等于PICS总次数-4，就开启disabled 不能再点击
           if (times == pics.length- 4) {
         $btnRight.addClass("disabled")
           }
         }
       })
    
      $btnLeft.click(function () {
        //如果没有disable属性才可以点击按钮
        if (!$btnLeft.is(".disabled")) {
        times--;
        $ulImgs.css("margin-left", -times * LIWIDTH);
          $btnRight.removeClass("disabled");
          //当点击次数为0时，就禁用左边的按钮
          if (times==0) {
            $btnLeft.addClass("disabled");
          }
        }
      })
      //3.3事件进入小图片，切换中图片
      //事件委托，为父元素绑定鼠标进入事件，但是只有进入img时，才触发
      $ulImgs.on("mouseenter", "li>img", function(){
        //获得当前图片
        //获得当前图片的data-md属性
        $mImg.attr("src", $(this).attr("data-md"))
      //将data-md属性赋值给$mImg的src
      });
     //3.4鼠标进入中图片，显示遮罩层，当鼠标移出时隐藏遮盖层 并跟随鼠标移动
     var $mask=$("#mask");
      $mImg.mouseenter(function(){
       $mask.removeClass("d-none");
      })
      .mouseleave(function () {
        $mask.addClass("d-none");
      })
      
     //3.5鼠标进入中图片，显示大图片，大图片背景图片跟随着鼠标移动
     
    } 
  })
  }
})