const request = new XMLHttpRequest();
const key = "JZHmTSzn6xR3pRx9WJEyFRMCF6XugnvO";
const container = document.querySelector(".main__container");
const search = document.querySelector("#btn");
const title = document.querySelector(".main__title");

// Display GIPHS
function loop(input) {
  for (const item of input.data) {
    container.innerHTML += `
      <div class="main__box">
        <div class="main__box__title">
          <h3>${item.title}</h3>
        </div>
        <div class="main__box__img">
          <img src="${item.images.fixed_height.url}"/>
        </div>
      </div>`;
  }
}

function initialCall() {
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      var requestData = JSON.parse(request.response);

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

// SEARCH CALL
search.addEventListener("click", function() {
  const input = document.querySelector("#search").value;
  if (input !== "") {
    container.innerHTML = "";
    title.innerHTML = `Search results for: ${input}`;
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        var requestData = JSON.parse(request.response);
        loop(requestData);
      }
    };
    request.open(
      "GET",
      `https://api.giphy.com/v1/gifs/search?q=${input}&limit=40&api_key=${key}`,
      true
    );
    request.send();
  }
});
