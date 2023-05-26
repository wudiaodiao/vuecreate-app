$.ajaxSetup({
    headers: {
        Token: window.ApiToken.get()
    },
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true
});
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
}
$.getget = function(url, data, callback) {
    $.ajax({
        headers: {
        Token: getCookie('SSO_Token')
    },
        type: "GET",
        url: url,
        cache: false,
        data: data,
        success: function (data) {
            callback(data);
        }
    });
};

$.postpost = function (url, data, callback) {
    console.log(data);
    $.ajax({
        headers: {
            Token: getCookie('SSO_Token'),
            // Token: '4f9722a7-fb51-466d-9ccc-2e3e1fe96b00',
          
        },
             contentType:'application/json',
       
        type: "POST",
        url: url,
        cache: false,
        // processData:false,
        data:JSON.stringify(data) ,
       
        success: function (data) {
            callback(data);
        }
    });
};

$.getEx = function(url, data, callback) {
    $.ajax({
        type: "GET",
        url: window.ApiBaseURL + url,
        cache: false,
        data: data,
        success: function (data) {
            callback(data);
        }
    });
};

$.postEx = function(url, data, callback) {
    $.ajax({
        type: "POST",
        url: window.ApiBaseURL + url,
        cache: false,
        data: data,
        success: function (data) {
            callback(data);
        }
    });
};