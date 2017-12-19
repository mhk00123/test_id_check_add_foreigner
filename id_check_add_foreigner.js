//檢查身分證號碼
function id_check() 
{ 
  document.table.Personnel_id.value = document.table.Personnel_id.value.toUpperCase();

  var id = table.Personnel_id.value;
  var LegalID = "0123456789" 
  var value = 0; 
  var sId = id;
  var i; 
  var c;
  var illegal_chars = "'\"=|`";

  //驗證是否有illegal_char
  for ( i=0; i < table.Personnel_id.value.length; i++ ){
     if ( illegal_chars.indexOf( table.Personnel_id.value.charAt(i) ) != -1 ){
        alert("身分證字號資料中不可含有特殊符號\n例如:'\" |`等");
        table.Personnel_id.select();
        table.Personnel_id.focus();
        return false;
     }
  }

  //台灣人
  //A123456789
  if(table.radiobutton[0].checked==true){

      for (i = 1; i < sId.length; i++){ //判斷第2~10位為數字
        c = sId.charAt(i); 
        if (LegalID.indexOf(c) == -1)
          {
          alert( "身分證字號不正確!!" );
          table.Personnel_id.select();
          table.Personnel_id.focus();
          return false;
          }
      }

      if(sId.charAt(1)=='2' && table.sex(0).checked == true ||
        sId.charAt(1)=="1" && table.sex(1).checked == true)
      {
        alert ( "身分證字號與性別不符!!" );
        return false;
      } 

      if(sId.length != 10){ //判斷是否是10位
        document.table.Personnel_id.select();
        document.table.Personnel_id.focus();
        alert( "身分證字號不正確！" );     
        return false;
      }

      //直接使用正則表達式判斷第1位是否英文字母
      if(!/^[A-Z]+$/.test(sId.substr(0,1))){ //若不是
        alert( "身分證字號不正確！" ) ;
        table.Personnel_id.select();
        table.Personnel_id.focus();
        return false;
      }

      //第1位可能值排序
      var idHeader = "ABCDEFGHJKLMNPQRSTUVXYWZIO"; //已排序
      //第1位英文字母模數轉換 + 第2~10位
      //A -> 10
      //B -> 11
      //...
      //EX    : A 123456789
      //結果為: xx123456789
      //共11位
      sId = (idHeader.indexOf(sId.substring(0,1))+10)+''+sId.substr(1,10);

      //依照順序乘上1987654321
      s = parseInt(sId.substr(0,1)) * 1 + 
          parseInt(sId.substr(1,1)) * 9 + 
          parseInt(sId.substr(2,1)) * 8 + 
          parseInt(sId.substr(3,1)) * 7 +      
          parseInt(sId.substr(4,1)) * 6 + 
          parseInt(sId.substr(5,1)) * 5 + 
          parseInt(sId.substr(6,1)) * 4 + 
          parseInt(sId.substr(7,1)) * 3 + 
          parseInt(sId.substr(8,1)) * 2 + 
          parseInt(sId.substr(9,1)) * 1  ;

      checkNum = parseInt(sId.substr(10,1));
      //餘數若等於第10碼的檢查碼，則驗證成功
      //若餘數為0，檢查碼就是0
      if((s % 10) == 0 || (10 - s % 10) == checkNum){
        //正確
      }
      else{
        return false;
      }

  } 


  //外國藉
  /*
  * 根據
  * https://www.immigration.gov.tw/ct_cert.asp?xItem=1106801&ctNode=32601&mp=1
  * 外來人口統一證號編碼原則
  * 本署核發之外來人口統一證號編碼，共計10碼，前2碼使用英文字母，
  * 第1碼為區域碼（同國民身分證註1）
  * 第2碼為性別碼(註 2)、3至10碼為阿拉伯數字，其中第3至9碼為流水號、第10碼為檢查號碼。
  * 臺灣地區無戶籍國民、大陸地區人民、港澳居民：男性使用A、女性使用B
  * 外國人                                    ：男性使用C、女性使用D
  */
  
  // Example:
  // AB12345678
  else if (document.table.radiobutton[1].checked==true){ //checkedbox = 其他國藉

    for (i = 2; i < sId.length; i++){ //判斷第2~10位為數字
        c = sId.charAt(i); 
        if (LegalID.indexOf(c) == -1)
          {
          alert( "身分證字號不正確!!" );
          table.Personnel_id.select();
          table.Personnel_id.focus();
          return false;
        }
     }

    if(sId.length != 10){ //判斷是否是10位
      document.table.Personnel_id.select();
      document.table.Personnel_id.focus();
      alert( "身分證字號不正確！" );     
      return false;
    }
  
    //直接使用正則表達式判斷第1位是否英文字母
    //第2位只能是A,B,C,D
    if(
      (!/^[A-Z]+$/.test(val.substr(0,1))) ||     //A~Z
      (!/^[A-D]+$/.test(val.substr(2,1)))        //A-D
      ){ 
      alert( "身分證字號不正確！" ) ;
      table.Personnel_id.select();
      table.Personnel_id.focus();
      return false;
    }

    //第1位可能值排序
    var idHeader = "ABCDEFGHJKLMNPQRSTUVXYWZIO"; //已排序
    //第1位英文字母正常轉換
    //第2位英文字母轉換後取%10
    //A -> 10
    //B -> 11
    //...
    //EX    : A B 12345678
    //結果為: 101 12345678
    //共11位
    sId = (idHeader.indexOf(sId.substring(0,1))+10) +''       //第1位正常轉換
        + ((idHeader.indexOf(sId.substr(1,1))+10) % 10) + ''  //第2位轉換後取%10
        + sId.substr(2,10);

    //依照順序乘上1987654321
    s = parseInt(sId.substr(0,1)) * 1 + 
        parseInt(sId.substr(1,1)) * 9 + 
        parseInt(sId.substr(2,1)) * 8 + 
        parseInt(sId.substr(3,1)) * 7 +      
        parseInt(sId.substr(4,1)) * 6 + 
        parseInt(sId.substr(5,1)) * 5 + 
        parseInt(sId.substr(6,1)) * 4 + 
        parseInt(sId.substr(7,1)) * 3 + 
        parseInt(sId.substr(8,1)) * 2 + 
        parseInt(sId.substr(9,1)) * 1  ;

    //檢查號碼 = 10 - 相乘後個位數相加總和之尾數。
    checkNum = parseInt(sId.substr(10,1));
    //餘數若等於第10碼的檢查碼，則驗證成功
    //若餘數為0，檢查碼就是0
    if((s % 10) == 0 || (10 - s % 10) == checkNum){
      //正確
    }
    else{
      return false;
    }
  }

}