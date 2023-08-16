
export function dataURLtoFile(dataURI, type) {
  if (!dataURI) {
    return ''
  }
  let binary = atob(dataURI.split(',')[1]);
  let array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: type });
}
export function fileSizeFmt(size) {
  if (!size)
    return "";

  var num = 1024.00; // byte

  if (size < num)
    return size + "B";
  if (size < Math.pow(num, 2))
    return (size / num).toFixed(2) + "K";
  if (size < Math.pow(num, 3))
    return (size / Math.pow(num, 2)).toFixed(2) + "M";
  if (size < Math.pow(num, 4))
    return (size / Math.pow(num, 3)).toFixed(2) + "G";
  return (size / Math.pow(num, 4)).toFixed(2) + "T";
};

//校验网址
export function verifyUrl(url) {
  var reg1 = /^http[s]?:\/\/.+$/;
  var reg2 = /[\r\n\s'";]/;
  return reg1.test(url) && !reg2.test(url);
};

export function getBase64WithFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve({ result: reader.result, file });
    reader.onerror = (error) => reject(error);
  });
};

// export function getBase64Image(img, width, height) {
//   debugger
//   //width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
//   let canvas = document.createElement("canvas");
//   canvas.width = width ? width : img.width;
//   canvas.height = height ? height : img.height;
//   let ctx = canvas.getContext("2d");
//   ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//   let dataURL = canvas.toDataURL();
//   return dataURL;
// }

export function getBase64Image(url) {
  var Img = new Image();
  var dataURL = '';
  Img.src = url;
  Img.setAttribute("crossOrigin", 'Anonymous') 
  Img.onload = function () { 
      var canvas = document.createElement("canvas"), 
      width = Img.width, 
      height = Img.height;
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(Img, 0, 0, width, height); 
      dataURL = canvas.toDataURL('image/jpeg'); 
      return dataURL;
      // callback ? callback(dataURL) : null; 
  };
}

export function getLowerCharacter26() {
  var str_big = ''
  for (var i = 0; i < 16; i++) {
    str_big += getCharacter('lower')
  }
  return str_big
}
export function getCharacter(flag) {
  var character = ''
  const arr = 'abcdefghijklmnopqrstuvwxyz1234567890'
  const maxPos = arr.length

  character += arr.charAt(Math.floor(Math.random() * maxPos))

  // if (flag === "lower") {  character = String.fromCharCode(Math.floor(Math.random() * 26) + "a".charCodeAt(0));  }
  // if (flag === "upper") {  character = String.fromCharCode(Math.floor(Math.random() * 26) + "A".charCodeAt(0));  }
  return character
}