// function checkIE() {
//   const ua = window.navigator.userAgent;
//   const msie = ua.indexOf("MSIE ");

//   if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
//     // If Internet Explorer, return version number
//     alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
//   } else {
//     // If another browser, return 0
//     alert("otherbrowser");
//   }

//   return false;
// }

export function GetFileSize(file: File) {
  let fileSize = 0
  try {
    // for IE
    // if (checkIE()) {
    //   //we could use this $.browser.msie but since it's deprecated, we'll use this function
    //   // before making an object of ActiveXObject,
    //   // please make sure ActiveX is enabled in your IE browser
    //   const objFSO = new ActiveXObject("Scripting.FileSystemObject");
    //   const filePath = file.;
    //   const objFile = objFSO.getFile(filePath);
    //   fileSize = objFile.size; //size in B
    //   fileSize = fileSize / 1048576; //size in mb
    // }
    // // for FF, Safari, Opeara and Others
    // else {
    fileSize = file.size //size in B
    // }
  } catch (e) {
    alert('Error is :' + e)
  }
  return fileSize
}
