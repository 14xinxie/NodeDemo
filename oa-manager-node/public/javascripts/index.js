$('.rwpf.btn,.rwpful img').click(function () {
    $('.fn_tip').show();
})
$('.fn_tip .close').click(function () {
    $('.fn_tip').hide();
})


$('.download').each(function () {
    var that = $(this), url = that.attr('href');
    if (/\?/g.test(url)) {
        that.attr('href', that.attr('href') + "&n=" + new Date().getTime());
    } else { that.attr('href', that.attr('href') + "?n=" + new Date().getTime()); }

});