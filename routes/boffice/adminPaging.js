function getAdmPageNavi(link, totCnt, pageNow, param, pagePerBlock, numPerPage) 
{   
    let rtnNavi = "";
    let sDelim = "";
    let sPgDlm = "";
    let sParam = param;
    let strUrl = "";
    let iNext;
    let iPrev;

    if ( pageNow <= 0)
        pageNow = 1;
    
    sParam = removeParam(param, "page_now"); 
    
    // 총 페이지 수
    let totalPage = Math.ceil(totCnt / (numPerPage * 1));

    // 현재 페이지가 속한 블럭 번호
    let currBlock = Math.ceil(pageNow / (pagePerBlock * 1));

    // 총 블럭 갯수
    let totalBlock = Math.ceil(totalPage / (pagePerBlock * 1));

    // 현재 블록의 시작 페이지
    let startPage = (currBlock - 1) * pagePerBlock + 1;
    // 현재 블록의 마지막 페이지
    let endPage = startPage + pagePerBlock - 1;

    if (endPage > totalPage)
        endPage = totalPage;

    // 파라미터가 없으면 ? 붙임
    if (link.indexOf("?") == -1)
        sDelim = "?";
    else
        sDelim = "&";

    if (!""==sParam)
        sPgDlm = "&";
    
    strUrl =  link + sDelim + sParam + sPgDlm;
    if(strUrl.substr(strUrl.length-1) !== '&') {
        strUrl += '&';
    }
            
    if (currBlock > 1) {
        iPrev = (currBlock - 1)* pagePerBlock;
        
        rtnNavi += " <span class='page_wrap'><a class='page_wrap' href=\"" + strUrl + "page_now=1\">&lt;&lt;</a></span>\n";
        rtnNavi += " <span class='page_wrap'><a class='page_wrap'  href=\"" + strUrl + "page_now=" + iPrev +"\">&lt;</a></span> \n";    
    } else {
        rtnNavi += " <span class='page_wrap'><a class='page_wrap' href=\"" + strUrl + "page_now=1\">&lt;&lt;</a></span>\n";
        rtnNavi += " <span class='page_wrap'><a class='page_wrap'  href=\"" + strUrl + "page_now=1\">&lt;</a></span> \n";        	
    }
        
    
    //페이지 번호
    if (endPage == 0) {
        rtnNavi += "<span><a class='page_wrap' href='#this' class='on'>1</a></span>&nbsp;";
    } else {
        for (let i = startPage; i <= endPage; i++) {           	
            if (i == pageNow) {
                rtnNavi += "<span class='page_wrap'><a class='page_wrap now_page' href='" + strUrl + "page_now=" + i + "'>" + i + "</a></span>";
                if (i != endPage)
                    rtnNavi += "&nbsp;";
            } else {
                rtnNavi += "<span><a class='page_wrap' href='" + strUrl + "page_now=" + i + "'>" + i + "</a></span>";
                if (i != endPage)
                    rtnNavi += "&nbsp;";
            }
        }
    }

    if (currBlock < totalBlock) {
        iNext = (currBlock * pagePerBlock) + 1;   
        
        rtnNavi += "<span class='page_wrap'><a class='page_wrap' href=\"" + strUrl+"page_now="+iNext+"\">&gt;</a></span>\n";
        rtnNavi += "<span class='page_wrap'><a class='page_wrap' href=\"" + strUrl+"page_now="+totalPage+"\">&gt;&gt;</a></span>";             
    } else {
        rtnNavi += "<span class='page_wrap'><a class='page_wrap' href=\"" + strUrl+"page_now=1\">&gt;</a></span>\n";
        rtnNavi += "<span class='page_wrap'><a class='page_wrap' href=\"" + strUrl+"page_now="+totalPage+"\">&gt;&gt;</a></span>";        	
    }
    
    return rtnNavi;
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

module.exports = getAdmPageNavi;