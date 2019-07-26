export const rootUrl="https://huilong.mynatapp.cc";
export const urlObj = {
	imageUrl:"../../../../newsImgDir",
	//hotpotUrl:NewsServerUrl+"/NewsServlet?method=getNews&type=1&",
  hotpotUrl:"/news/getNews?type=1&",
	recomUrl:"/NewsServlet?method=getMyNews&",
	videoUrl:"video/getVideoForPage?",
	communityUrl:"/community/getCommunity?",
	registUrl:"/user/regist",
	loginUrl:"/user/login",
	meUrl:"/user/getUserInfo?",//获取用户信息
  sdkConfigUrl:"/wechat/sdkconfig?",//sdk配置
  getWxUserInfoUrl:"/wechat/getWxUserInfo?",
  addPublishCommentUrl:"/comment/addPublishComment",
  uploadPublishUrl:"/community/uploadPublish"
}
