
/**
 * 使用JSON解析获取到的天气信息
 */
var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20%3D%202151330&format=json';
// 从远程地址获取JSON:

//使用该方法需先安装Jquery，然后再引用
$.getJSON(url,function(data){

     // 获取结果:
     var city = data.query.results.channel.location.city;
     var forecast = data.query.results.channel.item.forecast;
     var result = {
         city: city,
         forecast: forecast
     };
     console.log(JSON.stringify(result, null, '  '));
});