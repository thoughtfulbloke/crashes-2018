(function(){if(window.ARC&&window.ARC.Tools&&window.ARC.Tools.logger)return;window.ARC=window.ARC||{};window.ARC.Tools=window.ARC.Tools||{};var T=ARC.Tools;var i=0;var location=document.location.toString();if(!Date.now)Date.now=function now(){return(new Date).getTime()};var start=Date.now();T.Time={start:function(){return start},elapsed:function(){return Date.now()-start},toHuman:function(milli){if(milli<1E3)return milli+"ms";var string="";var remain=milli;var ms=remain%1E3;remain=(remain-ms)/1E3;
if(ms<10)ms="00"+ms;else if(ms<100)ms="0"+ms;var s=remain%60;remain=(remain-s)/60;string=s+"."+ms+"s";if(remain===0)return string;var min=remain%60;remain=(remain-min)/60;string=min+(min>1?" minutes ":" minute ")+string;if(remain===0)return string;var h=remain%24;remain=(remain-h)/24;string=h+(h>1?" hours ":" hour ")+string;if(remain===0)return string;var d=remain;string=d+(d>1?" days ":" day ")+string;return string}};var origConsole=window.console;var useConsole=!!location.match(/console=all/);var loggers=
[];function logger(namespace){if(!namespace||namespace==="")namespace="DEFAULT";var counter=0;var newname=namespace;while(loggers[newname]){counter=counter+1;newname=namespace+"_"+counter}this.namespace=newname;loggers[newname]=this;this.groupLevel=0;this.messages=[]}logger.prototype.originalConsole=origConsole;logger.prototype.loggers=function(){return loggers};logger.prototype.forceLogging=function(){useConsole=true};logger.prototype.forceStartTime=function(time){start=time};ARC.Tools.logger=logger;
function writelog(that,method,args){var argsArray=[];var savedArray=[];for(var i=0;i<args.length;i++){argsArray.push(args[i]);savedArray.push(args[i])}if(method.match(/^(log|info|warn|error|debug|trace|_exception)$/))if(argsArray.length>=2&&typeof argsArray[argsArray.length-1]=="function"){that.group.apply(that,argsArray.slice(0,argsArray.length-1));argsArray[argsArray.length-1]();that.groupEnd();return}argsArray.unshift("["+that.namespace+"]");var padding="";for(i=0;i<that.groupLevel;i++)padding=
padding+"    ";argsArray.unshift(padding);savedArray.unshift(padding);argsArray.push("("+T.Time.toHuman(T.Time.elapsed())+")");savedArray.push("("+T.Time.toHuman(T.Time.elapsed())+")");var forceConsole=window.localStorage&&window.localStorage.getItem&&(window.localStorage.getItem("console-show-"+that.namespace)||window.localStorage.getItem("console-show-"+that.namespace.toLowerCase()));var nameRegex=new RegExp("[?\x26]console\x3d"+that.namespace,"i");forceConsole=forceConsole||location.match(nameRegex);
var allString=true;for(i=0;i<argsArray.length;i++)if(typeof argsArray[i]!="string")allString=false;if(allString)argsArray=[argsArray.join(" ")];if((useConsole||forceConsole)&&origConsole&&origConsole[method])if(method=="group")try{origConsole.log.apply(origConsole,argsArray)}catch(e){origConsole.log(argsArray)}else try{origConsole[method].apply(origConsole,argsArray)}catch(e){origConsole[method](argsArray)}var flattened="";for(i=0;i<savedArray.length;i++)if(savedArray[i]===null)savedArray[i]="null";
else if(typeof savedArray[i]=="undefined")savedArray[i]="undefined";else savedArray[i]=savedArray[i].toString();that.messages.push(savedArray.join(" "));if(that.messages.length>100)that.messages.splice(0,1)}logger.prototype.text=function(){return this.messages.join("\n")};logger.prototype.getMessages=function(namespace){if(origConsole&&loggers[namespace])origConsole.log(loggers[namespace].text())};var logMethods=["log","info","warn","error","debug","trace","_exception"];function _logMethodsHelper(method){return function(){writelog(this,
method,arguments)}}for(i=0;i<logMethods.length;i++)logger.prototype[logMethods[i]]=_logMethodsHelper(logMethods[i]);logger.prototype.group=function(){writelog(this,"group",arguments);this.groupLevel=this.groupLevel+1};logger.prototype.groupEnd=function(){this.groupLevel=this.groupLevel-1};logger.prototype.groupCollapsed=logger.prototype.group;var otherMethods=["assert","count","dir","dirxml","table","time","timeEnd","timeStamp","profile","profileEnd"];function _otherMethodsHelper(method){return function(){if(useConsole&&
origConsole&&origConsole[method])try{origConsole[method].apply(origConsole,arguments)}catch(e){originalConsole[method](arguments)}}}for(i=0;i<otherMethods.length;i++)logger.prototype[otherMethods[i]]=_otherMethodsHelper(otherMethods[i]);if(!location.match(/[?&]console=orig/))window.console=new T.logger})();
(function(){if(window.ARC&&window.ARC.Tools&&window.ARC.Tools.timedToken)return;window.ARC=window.ARC||{};window.ARC.Tools=window.ARC.Tools||{};ARC.Tools.timedToken=function(config){var config=config||{unit:"minute",increment:1},unit=config.unit.slice(-1)=="s"?config.unit.slice(0,-1):config.unit,increment=config.increment,numberOfSeconds={"second":1,"minute":60,"hour":3600,"day":86400},date=new Date;var coeff=1E3*numberOfSeconds[unit]*increment;var rounded=(new Date(Math.round(date.getTime()/coeff)*
coeff)).getTime();return rounded}})();sbTracking={};sbCollapsedCookie="nav_collapsed";navigationReadyEvent="NAVIGATION_READY";function isWideScreen(){return window.innerWidth>=1269}$(window).on(navigationReadyEvent,function(){Sidebar.init()});
Sidebar={init:function(){if(isWideScreen()){var sbState=getCookie(sbCollapsedCookie)=="true"?"closed":"open";this.setCollapsibleState(sbState);sbTracking["navigation_state"]=sbState}},setCollapsibleState:function(state){var body=$("body");var nav=$("#nav");var navToggle=$("#nav-toggle");if(state=="open"){body.removeClass("nav-collapsed");nav.removeClass("compressed");nav.addClass("expanded");navToggle.removeClass("open-nav");navToggle.addClass("close-nav")}else if(state=="closed"){body.addClass("nav-collapsed");
nav.addClass("compressed");nav.removeClass("expanded");navToggle.addClass("open-nav");navToggle.removeClass("close-nav");body.addClass("fade-in");nav.addClass("fade-in");setTimeout(function(){body.removeClass("fade-in");nav.removeClass("fade-in")},450)}navToggle.on("click",function(){if($(this).hasClass("open-nav"));else if($(this).hasClass("close-nav"));})}};
var myPage=function(){var setPageCookie=function(name,value,days){var expires="",secure=window.location.protocol.toLowerCase()=="https:"?"; secure":"";if(days){var date=new Date;date.setTime(date.getTime()+days*24*60*60*1E3);expires="; expires\x3d"+date.toUTCString()}document.cookie=name+"\x3d"+encodeURIComponent(value)+expires+"; path\x3d/"+secure};var getPageCookie=function(ckName){var name=ckName+"\x3d",allCookies=document.cookie.split(";");for(var i=0;i<allCookies.length;i++){var ck=allCookies[i].trim();
if(ck.indexOf(name)==0)return decodeURIComponent(ck.substring(name.length,ck.length))}return""};var deletePageCookie=function(name){var date=new Date,secure=window.location.protocol.toLowerCase()=="https:"?"; secure":"";date.setTime(date.getTime()-24*60*60*1E3);document.cookie=name+"\x3d; expires\x3d"+date.toUTCString()+"; path\x3d/"+secure};var encodePageHTML=function(value){return $("\x3cdiv/\x3e").text(value).html()};return{setCookie:setPageCookie,getCookie:getPageCookie,deleteCookie:deletePageCookie,
htmlEncode:encodePageHTML}}();
var myAccount={consts:{BASE_URL:"/my-account/",SIGN_IN_URL:"/my-account/sign-in/",REGISTER_URL:"/my-account/register/",PROFILE_URL:"/my-account/profile/",DETAILS_URL:"/my-account/profile/details/",NEWSLETTERS_URL:"/my-account/profile/newsletters/",HELP_URL:"https://nzherald.custhelp.com/app/answers/list/c/18",PROFILE_API_URL:window.profileApiUrl?window.profileApiUrl:"https://profile.nzherald.co.nz/identity/public",PREFERENCES_API_URL:window.preferencesApiUrl?window.preferencesApiUrl:"http://id-dynamic.nzherald.co.nz/api",
AUTH_URL:"/auth/token",GET_PROFILE_URL:"/users/",CREATE_BOOKMARK_URL:"/SaveForLater/save/",GET_BOOKMARKS_URL:"/SaveForLater/get/",DELETE_BOOKMARK_URL:"/SaveForLater/delete/",REFERRER_COOKIE:"sirp",LEGACY_AUTH_COOKIE_DOMAIN:".nzherald.co.nz",AUTH_COOKIE:"syncData",BOOKMARK_COOKIE:"nzh_b_cache",WEATHER_COOKIE:"weatherModuleLocation",PROFILE_UPDATED_EVENT:"__profile_updated__",BOOKMARK_NAV_EVENT:"__bookmark_sidebar__",BOOKMARK_PAGE_EVENT:"__bookmark_page__"},init:function(){this.resetProfile();this.deleteLegacyAuthCookie();
var syncData=this.getSyncData();this.profile.uuid=syncData.uuid;this.profile.authToken=syncData.authToken;if(this.isSignedIn()){var self=this;$.ajax({method:"GET",url:this.consts.PROFILE_API_URL+this.consts.GET_PROFILE_URL+this.profile.uuid,headers:{"Authorization":"Bearer "+this.profile.authToken},success:function(data){self.profile.legacyId=data.hasOwnProperty("legacyId")&&data.legacyId?data.legacyId:self.profile.legacyId;self.profile.firstName=data.hasOwnProperty("firstName")?myPage.htmlEncode(data.firstName):
"";self.profile.lastName=data.hasOwnProperty("lastName")?myPage.htmlEncode(data.lastName):"";if(data.hasOwnProperty("attributes"))$.each(data.attributes,function(k,v){if(v.name=="weather_location"&&v.value)self.profile.weatherLocation=myPage.htmlEncode(v.value)})},complete:function(jqXHR){if(jqXHR.status==400||jqXHR.status==401)self.signOut();self.resolveProfilePromise()}})}else this.resolveProfilePromise()},resetProfile:function(){this.profile={uuid:"",legacyId:"",authToken:"",firstName:"",lastName:"",
weatherLocation:"",$deferred:$.Deferred()}},deleteLegacyAuthCookie:function(){var date=new Date;date.setTime(date.getTime()-24*60*60*1E3);document.cookie=this.consts.AUTH_COOKIE+"\x3d; expires\x3d"+date.toUTCString()+"; path\x3d/; domain\x3d"+this.consts.LEGACY_AUTH_COOKIE_DOMAIN},getSyncData:function(){var ret={uuid:"",authToken:""},syncData=myPage.getCookie(this.consts.AUTH_COOKIE);try{syncData=JSON.parse(window.atob(syncData));ret={uuid:syncData.uuid,authToken:syncData.authToken}}catch(e){}return ret},
getProfilePromise:function(){return this.profile.$deferred.promise()},resolveProfilePromise:function(){this.profile.$deferred.resolve()},profileCallback:function(cb){return this.getProfilePromise().done(cb)},setSignInReferrer:function(){if(window.location.pathname.indexOf(myAccount.consts.BASE_URL)!==0)myPage.setCookie(this.consts.REFERRER_COOKIE,window.location.href,1)},isSignedIn:function(){return this.profile.uuid&&this.profile.authToken},signOut:function(){this.deleteCookies();$.ajax({method:"DELETE",
url:this.consts.PROFILE_API_URL+this.consts.AUTH_URL,headers:{"Authorization":"Bearer "+this.profile.authToken}});this.resetProfile()},deleteCookies:function(){var cookiesToDelete=[this.consts.AUTH_COOKIE];$.each(cookiesToDelete,function(i,v){myPage.deleteCookie(v)})},createBookmark:function(contentType,contentId){return $.ajax({method:"POST",url:this.consts.PREFERENCES_API_URL+this.consts.CREATE_BOOKMARK_URL,headers:{"nzh-token":this.profile.authToken},data:{"object_id":contentId,"object_type_id":contentType},
dataType:"text"})},deleteBookmark:function(contentType,contentId){return $.ajax({method:"POST",url:this.consts.PREFERENCES_API_URL+this.consts.DELETE_BOOKMARK_URL,headers:{"nzh-token":this.profile.authToken},data:{"saved_id":contentId},dataType:"text"})},getBookmarks:function(contentType){if(contentType===undefined)contentType=0;return $.ajax({url:this.consts.PREFERENCES_API_URL+this.consts.GET_BOOKMARKS_URL,headers:{"nzh-token":this.profile.authToken}})}};myAccount.setSignInReferrer();myAccount.init();