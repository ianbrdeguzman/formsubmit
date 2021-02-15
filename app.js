const form = document.querySelector('form');
const submit = document.querySelector('button');
const status = document.querySelector('.status');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  ajax(form.method, form.action, data, success, error);
});

const ajax = (method, url, data, success, error) => {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader('Accept', 'application/json');
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

const success = () => {
  form.reset();
  submit.style = 'display: none';
  status.classList.add('success');
  status.innerHTML = 'Thanks for reaching out!';
}

const error = () => {
  status.classList.add('error');
  status.innerHTML = 'Oops! There was a problem.';
}