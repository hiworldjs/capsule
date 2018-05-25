export const isIncluded = (query, list) => {
    for (var string of list) {
        if (normalize(string).includes(normalize(query))) {
            return true;
        }
    }
    return false;
}

export const normalize = str => {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư

    return str;
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
