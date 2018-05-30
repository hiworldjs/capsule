export const normalize = str =>
    str.toString()
    .toLowerCase()
    .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
    .replace(/ì|í|ị|ỉ|ĩ/g, "i")
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
    .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
    .replace(/đ/g, "d")
    // Some system encode vietnamese combining accent as individual utf-8 characters
    .replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "") // Huyền sắc hỏi ngã nặng
    .replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư

export const isIncluded = (query, ...args) => {
    for (var string of [...args]) {
        if (normalize(string).includes(normalize(query))) {
            return true;
        }
    }
    return false;
}

export const localize = (number) => {
  if (number === null) return number;
  
  var parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export const transformFormToJSON = form => {
    var params = {};

    const formData = new FormData(form);
    formData.forEach((value, key) => {
        params[key] = value;
    });

    return params;
}

export const randomizeCode = () => {
    var min = 100000;
    var max = 999999 - min;

    return min + Math.floor(Math.random() * Math.floor(max));
}

export const randomizePrice = () => {
    var min = 1000;
    var max = 9999 - min;

    return 1000 * (min + Math.floor(Math.random() * Math.floor(max)));
}
