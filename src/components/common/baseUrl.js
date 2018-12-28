const NewsServerUrl="/NewsServer";//跟地址
const myUrl = {
	projectUrl:"http://192.168.1.194:8080/NewsServer",
	//hotpotUrl:NewsServerUrl+"/NewsServlet?method=getNews&type=1&",
  hotpotUrl:"/news/getNews?type=1&",
	recomUrl:NewsServerUrl+"/NewsServlet?method=getMyNews&",
	videoUrl:"video/getVideo?",
	communityUrl:NewsServerUrl+"/CommunityServlet?method=getCommunity&",
	registUrl:"/user/regist",//注册请求
	loginUrl:"/user/login",//登录请求
	meUrl:"/user/getUserInfo?",//获取用户信息
}
export default myUrl;
