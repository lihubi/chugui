import config from "./http/config.js"
export const timeFormat = (value, format) => {
    let date = new Date(value);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    let h = date.getHours();
    let min = date.getMinutes();
    let s = date.getSeconds();
    let result = "";
    if (format == undefined) {
        result = `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d} ${
        h < 10 ? "0" + h : h
      }:${min < 10 ? "0" + min : min}:${s < 10 ? "0" + s : s}`;
    }
    if (format == "yyyy-mm-dd") {
        result = `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d}`;
    }
    if (format == "yyyy-mm") {
        result = `${y}-${m < 10 ? "0" + m : m}`;
    } 
    if (format == "mm-dd") {
        result = ` ${mm < 10 ? "0" + mm : mm}:${ddmin < 10 ? "0" + dd : dd}`;
    }
    if (format == "hh:mm") {
        result = ` ${h < 10 ? "0" + h : h}:${min < 10 ? "0" + min : min}`;
    }
    if (format == "yyyy") {
        result = `${y}`;
    }
    return result;
};

export const formatMoney = (value) => {
  if (value) {
    value = Number(value);
    return '￥ ' + value.toFixed(2);
  }
};
 export const imgBase = (src) => {
   return config.staticDomainURL + src;
 };
 export const levelFilter = (level) => {
	 	if(level==1){
	 		return '专业';
	 	} else if(level==2){
	 		return '资深';
	 	} else if(level==3){
	 		return '高级';
	 	} else if(level==4){
	 		return '总监';
	 	}else{
	 		return level;
	 	}
 };