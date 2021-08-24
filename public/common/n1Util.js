 function inputCheckSpecial(str){
	 
     var strobj = str;
     re = /[~!@\#$%^&*\()\=+_']/gi;
     if(re.test(strobj)){
         return true;
     }
     return false;
 }

 function checkEngNumSpec(formVar, txt) {
	  var strVar = formVar.value.toLowerCase() ;
	  bFlagNum = false;
	  bFlagEng = false;
	  bFlagSpec = false;
	  
	  for(var i = 0; i < strVar.length; i++) {
			 var chr = strVar.substr(i,1);
			
			 if(chr >= '0' &&  chr <= '9')   {
			    bFlagNum = true;     
			 } 
	  }
	  
	  for(var i = 0; i < strVar.length; i++) {
			 var chr = strVar.substr(i,1);
			
			 if(chr >= 'a' && chr <= 'z')   {
			    bFlagEng = true;     
			 } 
	  }  
	  
	  bFlagSpec = inputCheckSpecial(strVar);
	  
	  if ( bFlagNum && bFlagEng && bFlagSpec ) {
	    return true;   
	  } else {
		alert(txt);
		formVar.focus();
	    return false;
	  }  
}

   function download(vFileNo)
    {
       window.location.href="/common/file/download?file_no=" + vFileNo;
    }

   function fConvertHtml(vFileNo)
   {  
	  winOption = " scrollbars=1,resizable=1 ";
   
	  popupWin("/common/fileview.do?file_no=" +vFileNo, 'fileView', 800, 600, winOption) ;    
   }   
   
	function onlysu(){
			if(event.keyCode<48 ||event.keyCode>57) {
				event.returnValue=false;
			}
	}

	function onlysu2(){
		
		  if ( event.keyCode == 45 )
		  { 
		     event.returnValue=true;
		     return;
		  }
		  
			if(event.keyCode<48 ||event.keyCode>57) {
				event.returnValue=false;
			}
	}
	
	function nextFocus(sFormName,sNow,sNext) {
			var sForm = 'document.'+ sFormName +'.'
			var oNow = eval(sForm + sNow);
		
			if (typeof oNow == 'object')
			{
				if ( oNow.value.length == oNow.maxLength)
				{
					var oNext = eval(sForm + sNext);
		
					if ((typeof oNext) == 'object')
						oNext.focus();
				}
			}
		}

// 숫자와 알파벳만 등록되도록 체크
function validString09AZCheck (strFrmName, strFieldName, strFieldNickName) {

  var ValidString="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var strCheckObj = eval("document."+strFrmName+"."+strFieldName);

  for (i=0; i<strCheckObj.value.length; i++) {
    if(ValidString.indexOf(strCheckObj.value.substring(i,i+1))<0) {
      alert(strFieldNickName+" 항목에 허용할 수 없는 문자가 입력되었습니다.\n"+strFieldNickName+" 항목은 영문자와 숫자로만 등록하실 수 있습니다.");
      strCheckObj.value="";
      strCheckObj.focus();
      return false;
    }
  }
  return true;        
}

 
function removeCharSet(val, str) {
    //ex) remove_char_set(minid, "-");
    cnt = val.length;
    retValue = "";
    for(i=0; i < cnt; i++){
        if(val.charAt(i) != str){
             retValue = retValue + val.charAt(i);
        }
    }
    
    return retValue;
}

//*********************************************************
// 주민등록번호 체크
//*********************************************************
function checkRegNum(jumin){
	ch1= jumin.charAt(0);
	ch2= jumin.charAt(1);
	ch3= jumin.charAt(2);
	ch4= jumin.charAt(3);
	ch5= jumin.charAt(4);
	ch6= jumin.charAt(5);
	ch7= jumin.charAt(6);
	ch8= jumin.charAt(7);
	ch9= jumin.charAt(8);
	ch10= jumin.charAt(9);
	ch11= jumin.charAt(10);
	ch12= jumin.charAt(11);
	ch13= jumin.charAt(12);
	kflag = 2;
	chtot =0;
	ch_buf = ch1 * kflag;
	chtot = chtot + ch_buf;
	kflag++;
	ch_buf = ch2 * kflag;
	chtot = chtot + ch_buf;
	kflag++;
	ch_buf = ch3 * kflag;
	chtot = chtot + ch_buf;
	kflag++;
	ch_buf = ch4 * kflag;
	chtot = chtot + ch_buf;
	kflag++;
	ch_buf = ch5 * kflag;
	chtot = chtot + ch_buf;
	kflag++;
	ch_buf = ch6 * kflag;
	chtot = chtot + ch_buf;
	kflag++;
	ch_buf = ch7 * kflag;
	chtot = chtot + ch_buf;
	kflag++;
	ch_buf = ch8 * kflag;
	chtot = chtot + ch_buf;
	kflag=2;
	ch_buf = ch9 * kflag;
	chtot = chtot + ch_buf;
	kflag++;
	ch_buf = ch10 * kflag;
	chtot = chtot + ch_buf;
	kflag++;
	ch_buf = ch11 * kflag;
	chtot = chtot + ch_buf;
	kflag++;
	ch_buf = ch12 * kflag;
	chtot = chtot + ch_buf;
	chtot = chtot % 11;
	last = 11 - chtot;
	if(last == 10)
	last = 0;
	if(last == 11)
	last = 1;
	if(last == ch13)
	return true;
	else
	return false;
} 

/*
*기능:필드값길이 계산
*@param text:길이를 계산하려는 필드값
*@return 문자열의 길이
*/
function charBytesChk(text){
    //ex)cnt = charBytesChk(document.test.id.value);
    byteCnt = 0;

    for(i=0; i<text.length; i++){
        strEsc = escape(text.charAt(i)).length;
        if(strEsc > 4){
            byteCnt += 2;       //한글 2byte
        }else{
            byteCnt += 1;          //기타 1byte
        }
    }
    return byteCnt;     //계산된 문자열 길이
}

/*
*기능:필드값길이 계산
*@param text:길이를 계산하려는 필드값
*@return 문자열의 길이
*/
function hangulExist(text){
    //ex)cnt = charBytesChk(document.test.id.value);
    bFlag = false;

    for(i=0; i<text.length; i++){
        strEsc = escape(text.charAt(i)).length;
        if(strEsc > 4){
            bFlag = true;
        }
    }
    return bFlag;     //계산된 문자열 길이
}


/*
*기능:필드형식에 따른 입력필드 byte계산 **검증거쳐야 함
*@param obj:객체명, len:허용최대길이, type:입력허용된타입
*@return 문자열의 bytes값
*/
function charLengthChk(obj, len, type){
	str = obj.value;
	code = true;		//입력값이 바른지..
	byteCnt = 0;		//바이트 값..
	typeflag = 0;		//허용문자 타입 플레그	a:한글포함 e:영문포함 s:일부특수문자 포함 n:모든문자
	txt = "";

	for(i=0; i < str.length; i++){
		strEsc = escape(str.charAt(i)).length;
		str1 = str.charAt(i);

		if(strEsc > 4){
			byteCnt += 2;					//한글 2바이트
			if(type == "e" || type == "s"){
				code = false;
				typeflag = 1;
			}
		}else if(strEsc == 1){
			if(str1 >= 0 && str1 <= 9){
				byteCnt ++;				//숫자 1바이트
			}else if(str1 == "@" || str1 == "*" || str1 == "_" || str1 == "-" || str1 == "+" || str1 == "." || str1 == "/"){
				byteCnt ++;
				if(type != "s"){
					code = false;				//escape 1바이트특수문자
				}
			}else{
				byteCnt ++;				//영문 1바이트
			}
		}else{
			byteCnt ++;
			code = false;	 				//기타 특수문자.
		}

		if(code == false && type != "n"){
			msg = "허용된 문자가 아닙니다...";
			if(typeflag == 1){
				msg += "\n\n입력 필드에 한글이 포함되어 있습니다.";
			}
			alert(msg);
			obj.value = txt;
			break;
		}

		if(byteCnt > len){
			alert("입력 자리수 초과 입니다. \n\n"+len+"bytes 까지 입력 가능합니다.");
			obj.value = txt;
			break;
		}else{
			txt += str1;
		}
	}
	return false;
}


/* 위와 유사한 입력 바이트 체크 함수.*/
//name : 객체이름, len: 최대길이, gb: 입력여부체크
function chkTxarea(name, len, gb) {
	var form = document.forms[0];
	var obj = eval("form."+ name);
	var j = 0;
	var k = 0;
	var tempStr;
	var tempStr2;

	obj.value = ltrim(obj.value);
	for(var i = 0; i < obj.value.length; i++  )	{
	  tempStr = obj.value.charCodeAt(i);
	  tempStr2 = tempStr.toString();
	  if(tempStr2.length >= 5) {
		j++;		//한글
	  } else {
		k++;		//영문
	  }
	}

	var ln = k+(j*2);

	if(gb=="D" && ln == 0) {
		alert("내용을 입력하세요.");
		obj.focus();
		obj.select();
		return false;
	}
	if(ln > len) {
			alert(len+"Byte 이내로 입력하세요. (현재 "+ ln +" Byte)");
			obj.focus();
			obj.select();
			return false;
	} else
		return true;
}

//문자열의 바이트 길이 구하기
function getByteLength(s,b,i,c){
    for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?3:c>>7?2:1);
    return b;
}


/*
*기능:날짜형식변경(20010101 - 2001/01/01, 200101 - 2001-01..)
*@param date_type:변경하고자하는 날짜필드값
*@return 정상:변경된 날짜값, 그이외엔:"원래값"
*/
function dateFormat(date_val, stradd){
    if(date_val.length == 6 && stradd.length == 1){         //년월
        date_val = date_val.substring(0,4)+stradd+date_val.substring(4,6);
    }else if(date_val.length == 8 && stradd.length == 1){   //년월일
        date_val = date_val.substring(0,4)+stradd+date_val.substring(4,6)+stradd+date_val.substring(6,8);
    }
    return date_val
}


/*
*기능:팝업창 중앙에 띄우기
*@param fileName:팝업대상파일, window_Name:팝업윈도우명, windowW:윈도우넓이, windowH:윈도우높이, property:속성
*@return none
*/
function pop_center_window(fileName,window_Name, windowW,windowH,property){
    windowX = Math.ceil( (window.screen.width - windowW) / 2 );
    windowY = Math.ceil( (window.screen.height - windowH) / 2 );
    var url = fileName;
    if(property=='' || property == null){
        window.open(url,window_Name,"width="+windowW+",height="+windowH+",left="+windowX+",top="+windowY);
    }else{
        window.open(url,window_Name,property+",width="+windowW+",height="+windowH+",left="+windowX+",top="+windowY);
    }
}


/*
*기능:조회일자 범위 및 메시지
*@param fromDate:시작일자, toDate:종료일자, message:범위순서가 틀릴경우 메시지
*@return none
*/
function date_compare_message(fromDate, toDate, message){
    if(fromDate > toDate) {
        alert(message);
        return false;
    }else{
        return true;
    }
}


/*
*기능:조회일자 범위
*@param fromDate:시작일자, toDate:종료일자
*@return none
*/
function date_compare(fromDate, toDate){
    if(fromDate > toDate) {
        alert("검색범위가 올바르지 않습니다");
        return false;
    }else{
        return true;
    }
}


/*
*기능:뒤로가기버튼 방지
*@param
*@return none
*/
function back_prevent(){
    history.go(1);
}


/*
*기능:입력길이제한
*@param field:필드명, maxlimit:제한길이
*@return none
*/
function textCounter(field, maxlimit) {
    if (field.value.length > maxlimit) {
        var textValue = field.value.substring(0, maxlimit);
        field.value = "";
        alert("입력제한 : "+maxlimit+"자 까지 입력할 수 있습니다.");
        field.value = textValue;
    }
}


/*
*기능:숫자만입력
*@param
*@return none
*/
function keyNumber(){
    if ((event.keyCode<48) || (event.keyCode>57))
        event.returnValue=false;
    return true;
}


/*
*기능:숫자와 영문만입력
*@param
*@return none
*/
function keyNumber2() {
    if ((event.keyCode<48) || (event.keyCode>57 && event.keyCode<97) || (event.keyCode>122))
        event.returnValue=false;
    return true;
}


/*
*기능:한글만입력
*@param
*@return none
*/
function keyNumber3() {
    if ((event.keyCode>31) && (event.keyCode<128))
        event.returnValue=false;
    return true;
}


/*
*기능:숫자만입력
*@param
*@return none
*/
function keyNumberCurrency(){
    if ( ((event.keyCode<48) || (event.keyCode>57)) && (event.keyCode != 46) )
        event.returnValue=false;
    return true;
}


/*
*기능:특수문자포함여부 체크
*@param
*@return true:정상, false:포함된문자 있음
*/
function char_check() {
    var event_code = event.keyCode;
    switch(event_code) {
        case 34:
            event.returnValue=false;
            break;
        case 39:
            event.returnValue=false;
            break;
        case 44:
            event.returnValue=false;
            break;
        case 60:
            event.returnValue=false;
            break;
        case 62:
            event.returnValue=false;
            break;
    }
    return true;
}


/*
*기능:날짜포맷의 오류검증
*@param
*@return none
*/
function isDate(obj, bFocus){
    var m3 = obj.value;

    if (m3.length == 0)
        return  true;

    if (m3.length != 8 && m3.length != 10){
        alert("날짜입력 오류입니다.");
        obj.value = "";
        if ( bFocus )
           obj.focus();
        return false;
    }

    if (m3.length == 10)
        m3 = strDateUnFormat(m3);

    year = m3.substring(0,4);
    m1   = m3.substring(4,5);
    m2   = m3.substring(5,6);
    d1   = m3.substring(6,7);
    d2   = m3.substring(7,8);

    if(m1=='0')
        month = m2;
    else
        month = m1 + m2;

    if( (month==1)||(month==3)||(month==5)||(month==7)||(month==8)||(month==10)||(month==12))
        day = 31;
    else if( (month==4)||(month==6)||(month==9)||(month==11))
        day = 30;
    else if(month==2){
        if ((((year % 4)==0) && ((year % 100)!=0)) || ((year % 400)==0))
            day = 29;
        else
            day = 28;
    }

    if(d1=='0')
        date = d2;
    else
        date = d1 + d2;

    if( (year < 1900) || (year > 2050) || (month < 1) || (month > 12) || (date < 1) || (date > day)){
        alert("날짜입력 오류입니다.");
        obj.value = "";
        if ( bFocus )
           obj.focus();
        return false;
    }

    // 성공
    return true;
}


/*
*기능 : 팝업창생성2
*@param  페이지url, 팝업창이름, width, height, scroll여부
*@return none
*/
function PopWin(url,popname,w,h,scroll){
    var win= null;

    var winl = (screen.width-w)/2;
    var wint = (screen.height-h)/2;
    var settings ='toolbar=no,status=no,location=no,directories=no,';
    settings +='height='+h+',';
    settings +='width='+w+',';
    settings +='top='+wint+',';
    settings +='left='+winl+',';
    settings +='scrollbars='+scroll+',';
    settings +='resizable=yes';
    win=window.open(url,popname,settings);
    if(parseInt(navigator.appVersion) >= 4){win.window.focus();}
}


/*
* 처리내용 : 날짜 입력포맷 체크
* @param obj:날짜필드 객체
* @return
*/
function date_check(obj){
    i=obj.value.length-1;
    if(obj.value.length==0) return;

    // backspace 의 Ascii 값이 8이다.
    if(event.keyCode == "8") {
      if(i==3 || i==6) {
            obj.value=obj.value.substring(0,i);
      }
      return;
    }

    if (obj.value == null || obj.value.replace(/ /gi,"") == "") {
        alert('반드시 정해진 형식대로 입력하세요 1');
        obj.value=obj.value.substring(0,i);
    }

    if(i!=4 && i!=7){
        if(obj.value.substring(i,i+1) > '9' || obj.value.substring(i,i+1) < '0'){
          alert('반드시 정해진 형식대로 입력하세요 2');
          obj.value=obj.value.substring(0,i);
          return;
        }
    }

    if(obj.value.length==4 && event.keyCode != "8")
        obj.value=obj.value+"-";

    if(obj.value.length==7 && event.keyCode != "8")
        obj.value=obj.value+"-";

    prevlen=obj.value.length;
}

 

/*
* 처리내용 : trim공백제거
* @param text:공백을 제거할 문자열
* @return 공백을 제거한 문자열
*/
function trim(text){
	if(text != null){
	    cnt = text.length;
	    obj = new Array(cnt);
	    for(i = 0; i < cnt; i++){
	        obj[i] = text.charAt(i);
	    }
	    obj = obj.reverse();
	    retValue = "";
	    for(i = 0; i < cnt; i++){
	        if(obj[i] != " ") break;
	        if(obj[i] == " ") obj[i] = "";
	    }
	    obj = obj.reverse();
	    for(i = 0; i < cnt; i++){
	        retValue = retValue + obj[i].toString();
	    }
	}else{//null이면
		retValue = "";
	}
    return retValue;
}


/*
* 처리내용 : comma제거 - remove_char_set()함수를 이용하는게 효과적
* @param text:,를 제거할 문자열
* @return comma를 제거한 문자열
*/
function remove_comma(text){
    cnt = text.value.length;
    retValue = "";
    for(i=0; i < cnt; i++){
        if(text.value.charAt(i) != ','){
             retValue = retValue + text.value.charAt(i);
        }
    }
    text.value = retValue;
}

function remove_comma2(text){
	cnt = text.length;
  retValue = "";
  
  for(i=0; i < cnt; i++){
  	if(text.charAt(i) != ',') retValue = retValue + text.charAt(i);
  }

  return retValue;
}

function add_comma(num) {
 	num = num+"";
 	point = num.length%3
 	len = num.length;

 	str = num.substring(0,point);
 	while( point < len){
  	if( str != "" ) str += ",";
  	str += num.substring( point , point+3);
  	point +=3;
 	}
 	return str;
}

/*
* 처리내용 : 날짜더하기
* @param inFlag:날짜형식구분, inAdd:증가값, inDate:대상날짜
* @return 더해진 날짜
*/
function getDateAdd(inFlag, inAdd, inDate){
   
    retValue = "";
    tmpDate  = inDate;
    //tmpDate  = remove_char_ret(inDate, "-");
    intYear = eval(tmpDate.substring(0, 4));
    intMon  = eval(tmpDate.substring(4, 6)) - 1;
    intDay  = eval(tmpDate.substring(6));
    date = new Date(intYear, intMon, intDay);
    inFlag = inFlag.toUpperCase();
    if(inFlag == "YY")        date = new Date(intYear + inAdd, intMon, intDay);
    else if(inFlag == "YYYY") date = new Date(intYear + inAdd, intMon, intDay);
    else if(inFlag == "MM")   date = new Date(intYear, intMon + inAdd, intDay);
    else if(inFlag == "DD")   date = new Date(intYear, intMon, intDay + inAdd);
    else{
      retValue = inDate;
      return retValue;
    }
    
    strYear = date.getYear().toString();
    strMon  = (date.getMonth() + 1).toString();
    if(date.getMonth() + 1 < 10) strMon = "0" + strMon;
    strDay  = (date.getDate()).toString();
    if(date.getDate() < 10) strDay = "0" + strDay;
  //  retValue = strYear + "-" + strMon + "-" + strDay;
    retValue = strYear + strMon + strDay;
    return retValue;
}


/*
* 처리내용 : 해당날짜의 요일
* @param yyyy:년, mm:월, dd:일
* @return 입력된 년월일에 대한 해당요
*/
function getNowWeek(yyyy, mm, dd){ // 1월 --> 0
    ret_value = 0;
    c_now = new Date(yyyy, mm, dd);
    ret_value = c_now.getDay();
    return ret_value;
}


/*
* 처리내용 : 날짜정보
* @param inFlag:년월일, inDate:대상날짜..
* @return 입력된 년월일에 대한 해당요
*/
function getDatePart(inFlag, inDate){
    inDate = remove_char_ret(inDate, "-");
    inFlag = inFlag.toUpperCase();
    if(inFlag == "YY" || inFlag == "YYYY"){ // 년도
          retValue = eval(inDate.substring(0, 4));
    }
    else if(inFlag == "MM"){ // 월
        retValue = eval(inDate.substring(4, 6));
    }
    else if(inFlag == "DD"){ // 일
        retValue = eval(inDate.substring(6));
    }
    else if(inFlag == "DY"){ // 해당년도의 몇번재 날...
        retValue = this.getDayOfYear(inDate);
    }
    else if(inFlag == "WK"){ // 몇번째 주...
        firstDayWeek = 0; // 1월 1일의 요일
        sumDay       = 0; // 총일수
        firstDayWeek     = getNowWeek(eval(inDate.substring(0, 4)), 0, 1);
        sumDay           = getDayOfYear(inDate);
        retValue = parseInt(((eval(sumDay) + eval(firstDayWeek) - 1) / 7)) + 1;
    }
    else if(inFlag == "DW"){ // 요일
        retValue = getNowWeek(eval(inDate.substring(0, 4))
                            , eval(inDate.substring(4, 6)) - 1
                            , eval(inDate.substring(6)));
    }
    return retValue;
}


/*
* 처리내용 : 현재년도까지의 총일수 계산
* @param inDate:기준년월일
* @return 기간내 총일수계산값
*/
function getSumDay(inDate){
    retValue   = 0;
    intLeapCnt = 0;
    preDay     = 0;
    currDay    = 0;
    currLeap = false;
    intYear = eval(inDate.substring(0, 4));
    intMon  = eval(inDate.substring(4, 6));
    intDay  = eval(inDate.substring(6));
    for(i = 1; i < intYear; i++){ // 전년도까지의 윤년 체크
        if(i %   4 == 0) intLeapCnt++;
        if(i % 100 == 0) intLeapCnt--;
        if(i % 400 == 0) intLeapCnt++;
    }
    preDay = ((intYear - 1) * 365) + intLeapCnt; // 전년도까지 일수
    if(intYear %   4 == 0) currLeap = true  ; // 현재년도 윤년계산
    if(intYear % 100 == 0) currLeap = false ;
    if(intYear % 400 == 0) currLeap = true  ;
    for(i = 1; i < intMon; i++){ // 전월까지 일수 계산
        if(i ==  1) currDay += 31;
        if(i ==  2){ if(currLeap == true) currDay += 29; else currDay += 28; }
        if(i ==  3) currDay += 31;
        if(i ==  4) currDay += 30;
        if(i ==  5) currDay += 31;
        if(i ==  6) currDay += 30;
        if(i ==  7) currDay += 31;
        if(i ==  8) currDay += 31;
        if(i ==  9) currDay += 30;
        if(i == 10) currDay += 31;
        if(i == 11) currDay += 30;
        if(i == 12) currDay += 31;
    }
    currDay += intDay ; // 현재년의 전월까지와 현월의 일수 합
    retValue = preDay + currDay ; //전년까지의 일수와 현재년의 일수 합
    return retValue;
}


/*
* 처리내용 : 현재년도의 총일수 계산
* @param inDate:기준년월일
* @return 총일수계산값
*/
function getDayOfYear(inDate){
    retValue   = 0;
    intLeapCnt = 0;
    currDay    = 0;
    currLeap = false;

    intYear = eval(inDate.substring(0, 4));
    intMon  = eval(inDate.substring(4, 6));
    intDay  = eval(inDate.substring(6));

    if(intYear %   4 == 0) currLeap = true  ; // 현재년도 윤년계산
    if(intYear % 100 == 0) currLeap = false ;
    if(intYear % 400 == 0) currLeap = true  ;

    for(i = 1; i < intMon; i++){ // 전월까지 일수 계산
        if(i ==  1) currDay += 31;
        if(i ==  2){ if(currLeap == true) currDay += 29; else currDay += 28; }
        if(i ==  3) currDay += 31;
        if(i ==  4) currDay += 30;
        if(i ==  5) currDay += 31;
        if(i ==  6) currDay += 30;
        if(i ==  7) currDay += 31;
        if(i ==  8) currDay += 31;
        if(i ==  9) currDay += 30;
        if(i == 10) currDay += 31;
        if(i == 11) currDay += 30;
        if(i == 12) currDay += 31;
    }
    currDay += intDay ; // 현재년의 전월까지와 현월의 일수 합
    retValue = currDay ; //전년까지의 일수와 현재년의 일수 합
    return retValue;
}


/*
* 처리내용 : 팝업 윈도우 생성
* @param inDate:기준년월일
* @return 총일수계산값
*/
var wname;
function makePopup(ppage, pname, pwidth, pheight, type){
    //이부분에 팝업 타입을 정의 하세요..
    if(type == 1){
        type = "directories=no, menubar=no, toolbars=no, resizable=no";
    }else if(type == 2){
	    type = "directories=yes, menubar=no, toolbars=no, resizable=no";
    }else if(type == 3){
	    type = "directories=yes, menubar=yes, toolbars=yes, resizable=yes";
    }else{
        type = "menubar=no, toolbars=no, resizable=yes";
    }

    type = type + ' width='+pwidth+', height='+pheight;
	/*
	obj = window.wname;
	if(obj == null){

		wname = window.open(ppage, pname, type);
	}
	*/

	obj = window.wname;
	//alert("window.wname="+obj);

	if(obj == null){
		wname = window.open(ppage, pname, type);
	}

	wname.focus();
}

//*********************************************************
// 새로운 창 열기
//
//  1.URL 2.새윈도우명 4.넓이 5.높이, 6. 옵션
//*********************************************************
 
function popupWin(winURL, winName, winWidth, winHeight, winOption) {

	var l = 16, t = 16; 	// 윈도우 위치(x, y)
	var props = "";
 	
	if (winOption == "") {
		props += "toolbar=0,location=0,directories=0,status=0,menubar=0,";	//윈도우 옵션
		props += "scrollbars=1,resizable=0,copyhistory=0,";
	} else {
		props = winOption;
	}

	props += "width=" + winWidth + ",height=" + winHeight;

	if (window.screen && window.screen.availWidth) {

		l = Math.floor(((screen.availWidth - winWidth)/2) + 5);
		t = Math.floor((screen.availHeight - winHeight)/2);
		if (l < 0) l = 0;
		if (t < 0) t = 0;
		props += ",left=" + l + ",top=" + t;
	}

	var aWinObj = window.open(winURL, winName, props);
	aWinObj.focus();

}
 
function popupMainWin(winURL, winName, winWidth, winHeight, winOption) {

	var l = 16, t = 16; 	// 윈도우 위치(x, y)
	var props = "";
 	
	if (winOption == "") {
		props += "toolbar=0,location=0,directories=0,status=0,menubar=0,";	//윈도우 옵션
		props += "scrollbars=1,resizable=0,copyhistory=0,";
	} else {
		props = winOption;
	}

	props += "width=" + winWidth + ",height=" + winHeight;

	var aWinObj = window.open(winURL, winName, props);
	//aWinObj.focus();

}
 

/*
* 처리내용 : 문자열에 특정 문자가 포함되었는지 체크
* @param 문자열
* @return 문자열 포함갯수
*/
function chkCharAt(str, fnd){
	var cnt = 0;
	for(i=0; i<str.length; i++){
		if(str.charAt(i) == fnd){
			++cnt;
		}
	}
	return cnt;
}

 
/*
*기능:숫자와 + , - 만입력
*@param text:입력된 키값
*@return true:숫자, false:숫자 이외의값
*/
function num_val2(text){
    //ex onKeydown="javascript:num_val(agentid.value)
    //ex onKeyDown="javascript:num_val();"
    if((event.keyCode >= 96 && event.keyCode <= 105) || (event.keyCode >= 48 && event.keyCode <= 57) ||
        event.keyCode == 8  || event.keyCode == 46  || event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39 ||
        event.keyCode == 32  || event.keyCode == 13  || event.keyCode == 17  || event.keyCode == 9  || event.keyCode == 27 || event.keyCode == 109 ||
        event.keyCode == 107 || event.keyCode == 189 || event.keyCode == 16 ||event.keyCode == 187){ // 키패드사용
        //return true;
    }else{
        event.returnValue = false;
    }

}


/*
*기능:특정 문자 변환
*@param text:원본 문자
*@param oldstr:찾는문자
*@param newstr:대체하는 문자
*@return 변환된 문자열
*/
function replace(text, oldstr, newstr){
    cnt = text.length;
    retValue = "";
    for(i=0; i < cnt; i++){
        if(text.charAt(i) == oldstr){
            retValue += newstr;
        }else{
            retValue += text.charAt(i);
        }
    }
    return retValue;
}

/*
*기능:숫자로만 구성되었는지 체크
*@param str:검색문자열
*@return 숫자이면 true, 아니면 false
*/
function checkNumber(str){
	var flag = true;
	for(i=0; i< str.length; i++){
		if(str.charAt(i) < '0' || str.charAt(i) > '9'){
			flag = false;
			break;
		}
	}
	return flag;
}

/*
*기능:특정 문자열에서 해당 문자열 변환
*@param text:원본 문자열
*@param oldstr:찾는문자열
*@param newstr:대체하는 문자열
*@return 변환된 문자열
*/
function replacestr(text, oldstr, newstr){
    oldlen = oldstr.length;
    cnt = text.length;
    retValue = "";
    for(i=0; i < cnt; i++){
        if(text.substr(i, oldlen) == oldstr){
            retValue += newstr;
            i+=oldlen-1;
        }else{
            retValue += text.charAt(i);
        }
        //alert("retValue="+retValue+"##"+"i="+i);
    }
    return retValue;
}


/*
*기능 : 리턴키 체크 리턴키면 true, 아니면 false
* @param key event
* @return
*/
function isEnterKey(){
    if(event.keyCode == 13)
        return true;
    else
        return false;
}

/*
*기능 : 숫자인지 체크
* @param key event
* @return
*/
function onlyNumber(obj)
{
	key =obj.event.keyCode;
	//alert('key = '+key);
	if ( key == 13  || key == 9 )
	{   // 엔터,TAB
		return true;
	}
	if(obj.event.shiftKey == true){
		obj.event.returnValue = false;
		return true;
    	}
	if (key == 91 || key == 92 || key == 93 || key == 229 || key == 21 || key == 25 || key == 19 ) return true;

	if (key >= 112 && key <= 123) {       // function key
		obj.event.returnValue = true;
		return true;
	}

	if ((key == 40) || (key == 38 )) {    // 위, 아래 화살표
		obj.event.returnValue = true;
		return true;
	}

	if (( key > 95) && ( key < 106 )) {   // 우측 키패드 숫자 key
		obj.event.returnValue = true;
		return true;
	}

	if (( key > 47) && ( key < 58 )) {    // 키보드 상단 숫자 key
		obj.event.returnValue = true;
		return true;
	}
	if (( key == 37)||( key == 39 )||( key == 46)||( key == 8 )) {  // 좌,우 화살표,DEL,BACKS,-
		obj.event.returnValue = true;
		return true;
	}
	if (obj.event.altKey || obj.event.shiftKey || obj.event.ctrlKey)
	{
		obj.event.returnValue = true;
		return true;
	}
	if (( key > 36) && ( key < 41 ))
	{    // 좌,상,우,하 화살표
		obj.event.returnValue = true;
		return true;
	}
	if (( key > 32) && ( key < 37 ))
	{    // Page-Up, Page-Down, End, Home
		obj.event.returnValue = true;
		return true;
	}
	if (( key == 45) || ( key == 46 ) || ( key == 144 ))
	{    // Insert,Delete,NumLock
		obj.event.returnValue = true;
		return true;
	}
	if (( key == 46)||( key == 8 )||( key == 17)||( key == 18 )||( key == 20)||( key == 27 ))
	{  // DEL,BACKS,Ctrl,Alt,CapsLock,Esc
		obj.event.returnValue = true;
		return true;
	}
	obj.event.returnValue=false;
	//alert('숫자만 입력 가능합니다.');
	return false;
}

/*
*기능 : 날짜변환
* @param key event
* @return
*/
function convertDate(obj)
{
if (!chk_Number(obj.value)) return false;
	str = obj.value;
	len=obj.value.length;
    switch(len)  {
		case 4:
			str = str + "-";
			obj.value = str;
			break;
       	case 7:
			str = str + "-";
			obj.value = str;
			break;
	}
}

/*
*기능 : 숫자체크
* @param key event
* @return
*/
function chk_Number(str)
{
  RefString = "-1234567890";
  DecimalPoints = 0;
  for (var i=0; i<str.length; i++)
  {
	  TempChar = str.substring(i, i+1);
	  if (RefString.indexOf(TempChar,0) == -1) { return false; }
  }
  return true;
}

/*
*기능 : - 제거
* @param key event
* @return
*/
function delete_Char(source,char)
{
	//alert("s="+source+ "char="+char);
	if (typeof(source) == "string")
	{
		//alert("s1");
		return replace(source,char,'');
	}
	else if (typeof(source) == "object")
	{
		//alert("s2");
		source.value = replace(source.value,char,'');
	}
	else
	{
		//alert("s3");
		alert("지원하지 않는 형태입니다.");
	}
}

/*
*기능 : 대체
* @param key event
* @return
*/
function replace(str,regular_expression,replacement_string)
{
	var re = new RegExp(regular_expression,"ig");
	return str.replace(re,replacement_string);
 	return str;
}

/*
*기능 : trim
* @param key event
* @return
*/
function trim(str)
{
  var rV;

  rV = ltrim(str);
  rV = rtrim(rV);
  return (rV);
}

/*
*기능 : 오른쪽트림
* @param key event
* @return
*/
function rtrim(str)
{
  var index;
  var ch = " ";

  if (chk_Blank(str)) return (str);
  for (index = str.length - 1; index >= 0; index--)
    if (str.charAt(index) != ch) break;
  return (str.substring(0, index + 1));
}

/*
*기능 : 년체크
* @param key event
* @return
*/
function chk_Year(str)
{
	var year;
	var to;
	today = new Date();
	to    = today.getYear() + 100;
	to    += "";
	if (to.length == 2) to = (parseInt(to, 10) + 1900) + "";

	str   = trim(str);
	year  = get_Year(str);
	//alert("year="+year);
	return (chk_Between(year, "1901", to));
}

/*
*기능 : 년도구하기
* @param key event
* @return
*/
function get_Year(str)
{
	str = delete_Char(str,'-');
	str = trim(str);
	return (str.substr(0, 4));
}

/*
*기능 : 왼쪽트림
* @param key event
* @return
*/
function ltrim(str)
{
  var index;
  var len;
  var ch = " ";

  if (chk_Blank(str)) return (str);
  len = str.length;
  for (index = 0; index < str.length; index++, len--)
    if (str.charAt(index) != ch) break;
  return (str.substring(index, index + len));
}

/*
*기능 : 블랭크체크
* @param key event
* @return
*/
function chk_Blank(str)
{
  var rV = false;

  if ((str == "") || (str == null) || (str == "null")) rV = true;
  return rV;
}

/*
*기능 : 월구하기
* @param key event
* @return
*/
function get_Month(str)
{
	str = delete_Char(str,'-');
	str = trim(str);
	return (str.substr(4, 2));
}

/*
*기능 : 일자구하기
* @param key event
* @return
*/
function get_Day(str)
{
	str = delete_Char(str,'-');
	str = trim(str);
	return (str.substr(6, 2));
}

/*
*기능 : 마지막날짜 구하기
* @param key event
* @return
*/
function get_LastDay(str)
{

  var maxday = new Array("31", "28", "31", "30", "31", "30",
                         "31", "31", "30", "31", "30", "31");
  var month = get_Month(str);
  var day   = maxday[parseInt(month, 10) - 1];

  if (chk_LeapYear(str))
    if (month == "02") day = "29";

  return (day);
}

/*
*기능 : 윤년
* @param key event
* @return
*/
function chk_LeapYear(str)
{
  var year;

  str = trim(str);
  year = parseInt(get_Year(str), 10);
  if ( (year%4   == 0) &&
      ((year%100 != 0) || (year%400 == 0)) ) return (true);
  return (false);
}

/*
*기능 : 월 체크
* @param key event
* @return
*/
function chk_Month(str)
{
  var month;
  str   = trim(str);
  month = get_Month(str);
  return (chk_Between(month, "01", "12"));
}

/*
*기능 : 일체크
* @param key event
* @return
*/
function chk_Day(str)
{
  //var str = obj.value;
  var day;
  str      = trim(str);
  var last_day = get_LastDay(str);
  //alert("last_day="+last_day);
  day      = get_Day(str);
  //alert(chk_Between(day, "01", last_day));
  return (chk_Between(day, "01", last_day));

}

/*
*기능 : 정해진 구간에 들어가는지 체크
* @param key event
* @return
*/
function chk_Between(str, from, to)
{
  if ((str < from) || (str > to)) return (false);
  return (true);
}

/*
*기능 : valid체크
* @param key event
* @return
*/
function valDate(obj,gu){
	convert_Date(obj);
	if(gu== "1"){
    	if(obj.value.indexOf("-") == -1){
    	    if(obj.value.length > 0){
    	        alert("일자를 정확히 입력해 주십시요");
    	        obj.value = "";
    	        obj.focus();
    	        return false;
    	    }
    	}
    }else if(gu== "2"){
    	if(obj.value.indexOf("-") == -1){
    	    if(obj.value.length > 0){
    	        alert("일자를 정확히 입력해 주십시요");
    	        obj.value = "";
    	        obj.focus();
    	        return false;
    	    }
    	}
    }
}

/*
*기능 : 온키업시 날짜변환
* @param key event
* @return
*/
function convert_Date(obj)
{
	obj.value = delete_Char(obj.value,'-');

	switch(obj.value.length)
	{
		case 0 :
				return;
				break;
		case 6 :
				if (parseInt(obj.value.substring(0,2),10)  > 80 )
				{
					obj.value = "19"+obj.value;
				}
				else
				{
					obj.value = "20"+obj.value;
				}
				break;
		case 8 :
				break;
		default :
				obj.focus();
				return;
				break;
	}
	var realDate = chk_Date(obj.value);
	if (!realDate)
	{
		obj.focus();
		return;
	}

	str = obj.value;
	str = str.substring(0,4) + "-" + str.substring(4,6) + "-" + str.substring(6);
	obj.value = str;
}

/*
*기능 : 시작일과 종료일 날짜를 비교한다.
* @param daybef,dayaft
* @return true,false
*/
function CompareDte(daybef,dayaft) {

		daybef = daybef.replace("-","");
		daybef = daybef.replace("-","");//replace를 두번해야 - 2개 다 없어짐

		dayaft = dayaft.replace("-","");
		dayaft = dayaft.replace("-","");//replace를 두번해야 - 2개 다 없어짐

		daybef = new Date(daybef.substr(0,4), daybef.substr(4,2), daybef.substr(6,2));//희망일자 (년도,월,일)
		dayaft = new Date(dayaft.substr(0,4), dayaft.substr(4,2), dayaft.substr(6,2));//희망일자 (년도,월,일)

		daybef = daybef.getTime(); //1970년 1월 1일 00 시 00 분 00 초를 기준으로 한 시간으로 바꾸어줌
		dayaft = dayaft.getTime(); //1970년 1월 1일 00 시 00 분 00 초를 기준으로 한 시간으로 바꾸어줌

		count = daybef - dayaft;
		count = Math.floor(count/(24*3600*1000));

	    if(daybef != "" && dayaft != "" && count>0 )
		{
			return false ;
		}
		return true;
}


//*********************************************************
// 텍스트 입력폼 체크
//*********************************************************
function checkReadonlyEmpty(formVar, text)
{        
	if (trim(formVar.value).length < 1) {
		alert("" + text + "");
		formVar.value="";
		return false;
	} 
	return true;
} 

//*********************************************************
// 텍스트 입력폼 체크
//*********************************************************
function checkEmpty(formVar, text)
{        
	if (trim(formVar.value).length < 1) {
		alert("" + text + "");
		formVar.value="";
		formVar.focus();
		return false;
	} 
	return true;
}


function checkEmptyArray(vObj, vMsg) {

    if (vObj.length != undefined) {
       for(iLoop=0; iLoop < vObj.length; iLoop++ ) {
           if (!checkEmpty(vObj[iLoop], vMsg)) return false;
       }
      
    } else {
        if (!checkEmpty(vObj, vMsg)) return false;
    }
    
    return true;
}

//null 체크
function fn_isNull(str) {
    if (str == null) return true;
    if (str == "NaN") return true;
    if (new String(str).valueOf() == "undefined") return true;   
    var chkStr = new String(str);
    if (chkStr.valueOf() == "undefined") return true;
    if (chkStr == null) return true;   
    if (chkStr.toString().length == 0) return true;  
    return false;
}

//null 체크 후 원하는 값으로 치환
function fn_nvl(str, cStr) {
    
	if(fn_isNull(str)) {
		str = cStr;
		
		if(fn_isNull(cStr)) {
			str = "";
		}
	}
    
    return str;
}

//*********************************************************
// 텍스트 입력폼 길이 체크
//*********************************************************
function checkLength(formVar, text, textlen)
{
	if (charBytesChk(formVar.value) < textlen) {
		alert("" + text + "  길이는 " + textlen + "자리 입니다!");
		formVar.focus();
		return false;
	}
	return true;
}

function checkLength2(formVar, text, textlen1, textlen2)
{
	if (charBytesChk(formVar.value) < textlen1 || charBytesChk(formVar.value) > textlen2) {
		alert("" + text + "는 " + textlen1 + "~" + textlen2 + "자 까지 가능합니다.");
		formVar.focus();
		return false;
	}
	return true;
}
 
function fileUpCheck(vObj) {

    if (vObj.length !=undefined) {
 
       for(iLoop=0; iLoop < vObj.length; iLoop++ ) {
           if (!fileTypeCheck(vObj[iLoop])) return false;
       }
      
    } else {
        if (!fileTypeCheck(vObj)) return false;
    }
    
    return true;
}

function fileUpImageCheck(vObj) {

    if (vObj.length !=undefined) {
 
       for(iLoop=0; iLoop < vObj.length; iLoop++ ) {
           if (!fileImageTypeCheck(vObj[iLoop])) {
               vObj[iLoop].focus();
               return false;
           }    
       }
      
    } else {
        if (!fileImageTypeCheck(vObj)) {
            vObj.focus();   
            return false;
        }    
    }
    
    return true;
}
 
// swf 도록 파일 체크
function fileUpSwfCheck(vObj) {

    if (vObj.length !=undefined) {
 
       for(iLoop=0; iLoop < vObj.length; iLoop++ ) {
           if (!fileSwfTypeCheck(vObj[iLoop])) {
               vObj[iLoop].focus();
               return false;
           }    
       }
      
    } else {
        if (!fileSwfTypeCheck(vObj)) {
            vObj.focus();   
            return false;
        }    
    }
    
    return true;
}

function fileTypeCheck(vObj) {
    var vVal = vObj.value;
    
    if (trim(vVal).length < 1) return true;
    
     vFile = vVal.slice(vVal.lastIndexOf("\\") + 1);
    
//      if (hangulExist(vFile) )  {
//          alert("파일명에 한글이 포함되어 있습니다.\n\n한글로 된 파일명은 Upload 할 수 없습니다.");
//          return false;
//      }
         
    vVal = vVal.toUpperCase();	
    
    //if ( vVal.indexOf(".ALZ")  > 0) { return true; }
    if ( vVal.indexOf(".PDF")  > 0) { return true; }
    else if( vVal.indexOf(".DOC")  > 0) { return true; }
    else if( vVal.indexOf(".JPG")  > 0) { return true; }
    else if( vVal.indexOf(".JPEG")  > 0) { return true; }
    else if( vVal.indexOf(".DOCX")  > 0) { return true; }
    else if( vVal.indexOf(".XLS")  > 0) { return true; }
    else if( vVal.indexOf(".XLSX")  > 0) { return true; }
    else if( vVal.indexOf(".PPT")  > 0) { return true; }
    else if( vVal.indexOf(".PPTX")  > 0) { return true; }
    else if( vVal.indexOf(".HWP")  > 0) { return true; }
    else if( vVal.indexOf(".TXT")  > 0) { return true; }
    else if( vVal.indexOf(".BMP")  > 0) { return true; }
    else if( vVal.indexOf(".GIF")  > 0) { return true; }
    else if( vVal.indexOf(".GUL")  > 0) { return true; }
    else if( vVal.indexOf(".JPG")  > 0) { return true; }
    else if( vVal.indexOf(".RAR")  > 0) { return true; }
    else if( vVal.indexOf(".WAV")  > 0) { return true; }
    else if( vVal.indexOf(".ZIP")  > 0) { return true; }
    else if( vVal.indexOf(".EPS")  > 0) { return true; }
    else if( vVal.indexOf(".PNG")  > 0) { return true; }
    alert("확장자가 [PDF, JPG, JPEG, DOC, DOCX, XLS, XLSX, PPT, PPTX, HWP, TXT, PNG, EPS]인 파일만 올릴 수 있습니다.");
    vObj.focus();
    return false;
	
}

function fileImageTypeCheck(vObj) {
    var vVal = vObj.value;
    
    if (trim(vVal).length < 1) return true;

     vFile = vVal.slice(vVal.lastIndexOf("\\") + 1);

 
//     if (hangulExist(vFile) )  {
//          alert("파일명에 한글이 포함되어 있습니다.\n\n한글로 된 파일명은 Upload 할 수 없습니다.");
//          return false;
//     }
 
    vVal = vVal.toUpperCase();	
    
    if( vVal.indexOf(".GIF")  > 0) { return true; }
    else if( vVal.indexOf(".JPG")  > 0) { return true; }
    else if( vVal.indexOf(".PNG")  > 0) { return true; }
    
    alert("확장자가 [JPG, GIF, PNG]인 파일만 올릴 수 있습니다.");

    return false;
	
}

function fileSwfTypeCheck(vObj) {
    var vVal = vObj.value;
    
    if (trim(vVal).length < 1) return true;

     vFile = vVal.slice(vVal.lastIndexOf("\\") + 1);

 
//     if (hangulExist(vFile) )  {
//          alert("파일명에 한글이 포함되어 있습니다.\n\n한글로 된 파일명은 Upload 할 수 없습니다.");
//          return false;
//     }
 
    vVal = vVal.toUpperCase();	
    
    if( vVal.indexOf(".SWF")  > 0) { return true; }

    alert("확장자가 [SWF]인 파일만 올릴 수 있습니다.");

    return false;
	
}

function fileExcelTypeCheck(vObj) {
    var vVal = vObj.value;
    
    if (trim(vVal).length < 1) return true;

     vFile = vVal.slice(vVal.lastIndexOf("\\") + 1);

 
//     if (hangulExist(vFile) )  {
//          alert("파일명에 한글이 포함되어 있습니다.\n\n한글로 된 파일명은 Upload 할 수 없습니다.");
//          return false;
//     }
 
    vVal = vVal.toUpperCase();	
    
    if( vVal.indexOf(".XLS")  > 0) { return true; }
    
    alert("확장자가 [xls]인 파일만 올릴 수 있습니다.");

    return false;
	
}

function isImageFile(vVal) {
    
    if (trim(vVal).length < 1) return true;

     vFile = vVal.slice(vVal.lastIndexOf("\\") + 1);
 
    vVal = vVal.toUpperCase();	
    
    if( vVal.indexOf(".GIF")  > 0) { return true; }
    else if( vVal.indexOf(".JPG")  > 0) { return true; }
    else if( vVal.indexOf(".BMP")  > 0) { return true; }

    return false;
	
}

function getImageWidthSize(vImgFile) {

    var img_obj = new Image();
    img_obj.src = vImgFile;

    return parseInt(img_obj.width);
} 

function imageWidthResize(vId, vImgFile, vSize) {

	         
    var img_obj = new Image();
    img_obj.src = vImgFile;


    if ( parseInt(img_obj.width) > parseInt(vSize) ) {
        document.all[vId].width = vSize;
    }    
}                   



//*********************************************************
// 배열형식의 박스 선택 체크
//*********************************************************
function checkArrayEmpty(formVar, text, limit) {
	var cnt = 0;
	if(typeof(limit) == "undefined") limit = 1;

	if(formVar.length) {
		for(i=0;i<formVar.length;i++) {
			if(formVar[i].checked) {
				cnt++;
			}
		}
	} else {
		if(formVar.checked) {
			cnt++;
		}
	}

	if(cnt < limit)	{
		alert("" + text + "");
		if(formVar.length) {
			formVar[0].focus(); 
		} else { 
			formVar.focus(); 
		}

		return false;
	}

	return true;
}

//*********************************************************
// 이메일 체크
//*********************************************************
function checkEmail(formVar) {
	var str = formVar.value;
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
	if (re.test(str) == true) { return true; }

	alert('잘못된 EMAIL 형식입니다.');
	formVar.focus();
	formVar.select();
	return false;
}

function checkEmail2(vEmail) {
 
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
	if (re.test(vEmail) == true) { return true; }

	alert('잘못된 EMAIL 형식입니다.');
 
	return false;
}

function writeText(id, str) {
	var strTag = str;

	if (document.all)
		document.all[id].innerHTML = strTag;
	else
		with (document[id].document) {
			open();
			write(strTag);
			close();
		}
}

function checkKeyNum(formVar) {
  strKey=formVar.value;
  if(isNaN(strKey) || strKey==" " || strKey.indexOf('0x') > 0){
	alert("숫자만 가능합니다.");
	formVar.value="";
	formVar.focus();	
  }
  if(strKey.match("-"))
	formVar.value=strKey.replace("-","");
  
  
	
}

function checkEngNum(formVar, txt) {
  var strVar = formVar.value.toLowerCase() ;
  
  for(var i = 0; i < strVar.length; i++) {
	 var chr = strVar.substr(i,1);
	 if((chr < '0' || chr > '9') && (chr < 'a' || chr > 'z') ) {
		alert(txt);
		formVar.focus();
		return false;
	 }
  }
  return true;   
}

function checkEngNum2(strVar, txt) {
  
  for(var i = 0; i < strVar.length; i++) {
	 var chr = strVar.substr(i,1);
	 if((chr < '0' || chr > '9') && (chr < 'a' || chr > 'z') ) {
		alert(txt);
		return false;
	 }
  }
  return true;   
}


/*
*기능:구분자를 이용한 배열수
*@param text:문자열
*/
function splitCharCount(vText, strDel){
 
     var strVal  = trim(vText);
   
    if(strVal == "" ) return 0;
 
    var arr = strVal.split(strDel);
     
    fcnt = 0
    for(i=0; i<arr.length; i++){
       if(arr[i].length > 0) fcnt ++;
    }
    
    return fcnt ;
}
 
/*
function checkEngKor(formVar, txt) {

  var strVar = formVar.value;
  var reg = /[^a-zㄱ-?]/i; 
  if( reg.test(strVar) ){ 
	alert(txt);
	formVar.focus();
	return false;
  }
  return true;   
}



function checkEngKorNum(strVar, txt) {

  var reg = /[^a-zㄱ-0-9]/i; 
  if( reg.test(strVar) ){ 
	alert(txt);
	return false;
  }
  return true;   
}

function checkEngKorNumField(formVar, txt) {

  var strVar = formVar.value;
  var reg = /[^a-zㄱ-0-9]/i; 
  if( reg.test(strVar) ){ 
	alert(txt);
	formVar.focus();
	return false;
  }
  return true;   
}
*/

function checkRadioEmpty(formVar, vMag) {
    bFlag = false;
 
    if (formVar.length !=undefined) {
 
       for(iLoop=0; iLoop < formVar.length; iLoop++ ) {
          if (formVar[iLoop].checked) bFlag = true;
       }
      
    } else {
        if (formVar.checked) bFlag = true;  
    }
    
    if (!bFlag) alert(vMag);
    return  bFlag;    
    
}  

function checkRadioValue(formVar) {
    retVal = "";
    
    if (formVar.length !=undefined) {
 
       for(iLoop=0; iLoop < formVar.length; iLoop++ ) {
          if (formVar[iLoop].checked) {
             if (retVal != "" ) retVal = retVal +",";
             retVal = retVal + formVar[iLoop].value; 
          }   
       }
      
    } else {
        if (formVar.checked) retVal =formVar.value; 
    }
    
    return  retVal;     
}  

function radioSetValue(formVar, vVal) {
    retVal = "";
    
    if (formVar.length !=undefined) {
 
       for(iLoop=0; iLoop < formVar.length; iLoop++ ) {
           if ( formVar[iLoop].value == vVal) 
           {
           	  formVar[iLoop].checked = true;
           } else {
              formVar[iLoop].checked = false;
           }   
       }
      
    } else {
        if (formVar.value == vVal ) 
        {
        	formVar.checked = true;
        } else {
       	  formVar.checked = false;
        }
    }
}  

function checkRadioCount(formVar) {
    nCnt = 0;
    
    if (formVar.length !=undefined) {
 
       for(iLoop=0; iLoop < formVar.length; iLoop++ ) {
          if (formVar[iLoop].checked) {
        	  nCnt++;
          }   
       }
      
    } else {
        if (formVar.checked) nCnt++; 
    }
    
    return  nCnt;     
} 

function checkRadioToggle(formVar, bFlag) {
    retVal = "";
    
    if (formVar.length !=undefined) {
 
       for(iLoop=0; iLoop < formVar.length; iLoop++ ) {
          formVar[iLoop].checked = bFlag;
       }
      
    } else {
        formVar.checked = bFlag;
    }    
}  

 
/*
*기능 : 영문자와 숫자가 조합되었는지 점검
* @param key event
* @return
*/
function checkIncEngNum(formVar, txt) {
  var strVar    = formVar.value;
  var cntNumber = 0;
  var cntChar   = 0;

  for(var i = 0; i < strVar.length; i++) {
	var chr = strVar.substr(i,1);

    if( !(chr < '0' || chr > '9') ) { cntNumber++; }
    if( !(chr < 'a' || chr > 'z') ) { cntChar++; }
    if( !(chr < 'A' || chr > 'Z') ) { cntChar++; }
  }

  if( cntNumber == 0 || cntChar == 0 || ((cntNumber + cntChar) != strVar.length) ) {
	alert(txt);
	formVar.focus();
    return false;
  }

  return true;   
}


/**
 * 쿠키값 추출
 * @param cookieName 쿠키명
 */
function getCookie( cookieName )
{
   var search = cookieName + "=";
   var cookie = document.cookie;

   // 현재 쿠키가 존재할 경우
   if( cookie.length > 0 )
   {
      // 해당 쿠키명이 존재하는지 검색한 후 존재하면 위치를 리턴.
      startIndex = cookie.indexOf( cookieName );

      // 만약 존재한다면
      if( startIndex != -1 )
      {
         // 값을 얻어내기 위해 시작 인덱스 조절
         startIndex += cookieName.length;

         // 값을 얻어내기 위해 종료 인덱스 추출
         endIndex = cookie.indexOf( ";", startIndex );

         // 만약 종료 인덱스를 못찾게 되면 쿠키 전체길이로 설정
         if( endIndex == -1) endIndex = cookie.length;

         // 쿠키값을 추출하여 리턴
         return unescape( cookie.substring( startIndex + 1, endIndex ) );
      } else {
         // 쿠키 내에 해당 쿠키가 존재하지 않을 경우
         return false;
      }
   } else {
      // 쿠키 자체가 없을 경우
      return false;
   }
}

 

/**
* 쿠키 설정
* @param cookieName 쿠키명
* @param cookieValue 쿠키값
* @param expireDay 쿠키 유효날짜
*/
function setCookie( cookieName, cookieValue, expireDate )
{
   var today = new Date();
   today.setDate( today.getDate() + parseInt( expireDate ) );
   document.cookie = cookieName + "=" + escape( cookieValue ) + "; path=/; expires=" + today.toGMTString() + ";"
}

//00:00 시 기준 쿠키 설정하기  
//expiredays 의 새벽  00:00:00 까지 쿠키 설정  
function setCookieAt00( name, value, expiredays ) {   
	var todayDate = new Date();   
	todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000);  
	if ( todayDate > new Date() )  
	{  
		expiredays = expiredays - 1;  
	}  
	todayDate.setDate( todayDate.getDate() + expiredays );   
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"   
} 

/**
* 쿠키 삭제
* @param cookieName 삭제할 쿠키명
*/
function deleteCookie( cookieName )
{
   var expireDate = new Date();
  
   //어제 날짜를 쿠키 소멸 날짜로 설정한다.
   expireDate.setDate( expireDate.getDate() - 1 );
   document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
}

function fCheckKorEngOnly(vChar, vMsg)
{
   if ( vChar == null ) return false ;
   
   for(var i=0; i < vChar.length; i++){ 

     var c = vChar.charCodeAt(i); 
 
     //( 0xAC00 <= c && c <= 0xD7A3 ) 초중종성이 모인 한글자 
     //( 0x3131 <= c && c <= 0x318E ) 자음 모음 

     if(!( ( 0xAC00 <= c && c <= 0xD7A3 ) || ( 0x3131 <= c && c <= 0x318E ) ||
           ( 0x61   <= c && c <= 0x7A   ) || ( 0x41   <= c && c <= 0x5A   ) )
       ) {
           alert(vMsg);
           return false ; 
         }
   }  
   return true ;    
    
} 
 
 
// 한글이외의 문자가 있을경우 false 
// 한자나 숫자 영문의 경우 false 

function checkKoreanOnly( koreanChar ) {
   
   if ( koreanChar == null ) return false ;
   
   for(var i=0; i < koreanChar.length; i++){ 

     var c=koreanChar.charCodeAt(i); 

     //( 0xAC00 <= c && c <= 0xD7A3 ) 초중종성이 모인 한글자 
     //( 0x3131 <= c && c <= 0x318E ) 자음 모음 

     if( !( ( 0xAC00 <= c && c <= 0xD7A3 ) || ( 0x3131 <= c && c <= 0x318E ) ) ) {      
        return false ; 
     }
   }  
   return true ;
}

// 영문 이외의 캐릭터가 있을경우 false 

function checkEnglishOnly( englishChar ) {  
    
    if ( englishChar == null ) return false ;
       
    for( var i=0; i < englishChar.length;i++){          
       var c=englishChar.charCodeAt(i);       
       if( !( (  0x61 <= c && c <= 0x7A ) || ( 0x41 <= c && c <= 0x5A ) ) ) {         
        return false ;       
       }
     }      
    return true ;
     
} 

// 숫자 이외의 캐릭터가 있을경우 false 

function checkDigitOnly( digitChar ) {  
    
    if ( digitChar == null ) return false ;
       
    for(var i=0;i<digitChar.length;i++){          
       var c=digitChar.charCodeAt(i);       
       if( !(  0x30 <= c && c <= 0x39 ) ) {         
        return false ;       
       }
     }      
    return true ;
     
}


 
/*
' ------------------------------------------------------------------
' Function    : fc_chk_byte(aro_name)
' Description : 입력한 글자수를 체크
' Argument    : Object Name(글자수를 제한할 컨트롤)
' Return      : 
' ------------------------------------------------------------------
*/
function fc_chk_byte(aro_name, ari_max, s_len) {
   var ls_str     = aro_name.value; // 이벤트가 일어난 컨트롤의 value 값
   var li_str_len = ls_str.length;  // 전체길이

   // 변수초기화
   var li_max      = ari_max; // 제한할 글자수 크기
   var i           = 0;  // for문에 사용
   var li_byte     = 0;  // 한글일경우는 2 그밗에는 1을 더함
   var li_len      = 0;  // substring하기 위해서 사용
   var ls_one_char = ""; // 한글자씩 검사한다
   var ls_str2     = ""; // 글자수를 초과하면 제한할수 글자전까지만 보여준다.

   for(i=0; i< li_str_len; i++) {
      // 한글자추출
      ls_one_char = ls_str.charAt(i);

      // 한글이면 2를 더한다.
      if (escape(ls_one_char).length > 4) {
         li_byte += 2;
      }
      // 그밗의 경우는 1을 더한다.
      else
      {
         li_byte++;
      }

      // 전체 크기가 li_max를 넘지않으면
      if(li_byte <= li_max)
      {
         li_len = i + 1;
      }
   }
   
   // 전체길이를 초과하면
   if(li_byte > li_max)  {
      alert( s_len + " 글자를 초과 입력할수 없습니다. \n 초과된 내용은 자동으로 삭제 됩니다. ");
      ls_str2 = ls_str.substr(0, li_len);
      aro_name.value = ls_str2;
      
   }
   aro_name.focus();   
}

function viewFile(txt, e) {
	var layers = document.getElementById('userMenuLayer');

	var left = (e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - 170) + 'px';
	var top  = (e.clientY + document.body.scrollTop  + document.documentElement.scrollTop  +  10) + 'px';

	layers.style.left = left;
	layers.style.top  = top;
	
	
//	layers.style.left = (e.clientX - 100 + document.body.scrollLeft) + 'px';
//	layers.style.top = (e.clientY + 10 + document.body.scrollTop) + 'px';
	
	layers.innerHTML = "<div style='border-width:1px; border-style: solid; border-color: rgb(125,125,125);padding:10px;background-color:ivory;width:100%; font-size:9pt; z-index:10;' >" + txt + "</div>";
			          
	if(layers.style.visibility == 'hidden') 
		layers.style.visibility = 'visible';
	else
		layers.style.visibility = 'hidden';
}



function fGoMenu(vCurMenuNo, vMenuNo, vUrl)
{
    if (vUrl == "#this")
        return;
    
    setCookie( "cut_menu_no", vCurMenuNo, 2 );
    setCookie( "sub_menu_no", vMenuNo, 2 );
    setCookie( "top_menu_no", '{{top_menu_no}}', 2 );
    
    window.location.href=vUrl;
}

function removeParam(strParam, strNotWord) {
    let strRetVal = "";
    
    try {
        if (strParam == null || ""==strParam)
            return "";
        if (strNotWord == null || ""==strNotWord)
            return "";

        let iStartPos = indexOfaA(strParam, strNotWord, 0);
        
        if (iStartPos < 0)
            return strParam;
        
        strRetVal = strParam;
        while (iStartPos >= 0)
        {
            let iEndPos = indexOfaA(strRetVal, "&", iStartPos);
            
            if (iEndPos <= 0)
            iEndPos = strRetVal.length - 1;
            
            strRetVal = strRetVal.substring(0, iStartPos) + strRetVal.substring(iEndPos + 1);
            
            iStartPos = indexOfaA(strRetVal, strNotWord, 0);
        }
    } catch (e) {
        console.error("CommonUtil[removeParam]=>" + e);
    }

    return strRetVal;
}

function indexOfaA(str, indexstr, fromindex) {
    let index = 0;
    indexstr = indexstr.toLowerCase();
    str = str.toLowerCase();
    index = str.indexOf(indexstr, fromindex);
    return index;
}

function getMenuUrl(strUrl, strMgrno, menu_no) {
    if ( strUrl == "#this")
        strUrl = "";
    
    if ( strMgrno != undefined && strMgrno > 0) {
        strUrl  = removeParam(strUrl, "brd_mgrno");
          strUrl += (( strUrl.indexOf("?") > 0 ) ? "&" : "?" ) + "brd_mgrno=" + strMgrno;	
      }
      
    if(strUrl.indexOf("menu_no") < 1) {
        strUrl  = removeParam(strUrl, "menu_no");
        strUrl += (( strUrl.indexOf("?") > 0 ) ? "&" : "?" ) + "menu_no=" + menu_no;
    }
    
    if (""==strUrl)
        strUrl = "#this";
    
     //return strUrl;
    window.location.href=strUrl;
 }

 
function checkMobileDevice() {
	var mobileKeyWords = new Array('Android', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson');
	for (var info in mobileKeyWords) {
		if (navigator.userAgent.match(mobileKeyWords[info]) != null) {
			return true;

		}
	}
	return false;
}

function getFileName(strFileName) {
    if (strFileName != null && "" != strFileName ) {
        return strFileName.substring(strFileName.lastIndexOf("/") + 1, strFileName.length);
    } else {
        return "";
    }
}