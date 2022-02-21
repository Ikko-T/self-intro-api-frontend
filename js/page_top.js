jQuery(function () {
  var pagetop = $('#page_top');
  pagetop.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      //100pxスクロールしたら表示
      pagetop.fadeIn();
    } else {
      pagetop.fadeOut();
    }
  });
  pagetop.click(function () {
    $('body,html').animate(
      {
        scrollTop: 0,
      },
      200
    ); //0.2秒かけてトップへ移動
    return false;
  });
});
