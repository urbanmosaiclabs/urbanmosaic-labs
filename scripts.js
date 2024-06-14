document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('my-form');
    var status = document.getElementById('my-form-status');
    var button = document.getElementById('my-form-button');

    function success() {
        form.reset();
        button.style = 'display: none ';
        status.innerHTML = "Thanks!";
    }

    function error() {
        status.innerHTML = "Oops! There was a problem.";
    }

    form.addEventListener('submit', function(ev) {
        ev.preventDefault();
        var data = new FormData(form);
        var captchaResponse = document.querySelector('.cf-turnstile').turnstile.getResponse();
        if (!captchaResponse) {
            status.innerHTML = "Please complete the CAPTCHA.";
            return;
        }
        data.append('cf-turnstile-response', captchaResponse);
        ajax(form.method, form.action, data, success, error);
    });

    function ajax(method, url, data, success, error) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            if (xhr.status === 200) {
                success(xhr.response, xhr.responseType);
            } else {
                error(xhr.status, xhr.response, xhr.responseType);
            }
        };
        xhr.send(data);
    }
});