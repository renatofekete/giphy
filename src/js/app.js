const request = new XMLHttpRequest();
const key = "JZHmTSzn6xR3pRx9WJEyFRMCF6XugnvO";
const container = document.querySelector(".main__container");

// Display GIPHS
function loop(input) {
  for (var i = 0; i < input.data.length; i++) {
    container.innerHTML += `
      <div class="main__box">
        <div class="main__box__title">
          <h3>${input.data[i].title}</h3>
        </div>
        <div class="main__box__img">
          <img src="${input.data[i].images.fixed_height.url}"/>
        </div>
      </div>`;
  }
}

function initialCall() {
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      var requestData = JSON.parse(request.response);
      console.log(requestData);

      loop(requestData);
    }
  };
  request.open(
    "GET",
    `https://api.giphy.com/v1/gifs/trending?limit=40&api_key=${key}`,
    true
  );
  request.send();
}
initialCall();