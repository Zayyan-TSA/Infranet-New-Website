console.log('welcome to the blogs page');

const FetchData = async () => {


  try {
    const data = await fetch('http://103.123.45.76:9444/api/blogManagement');
    const response = await data.json();
    console.log(response);

    const template = document.getElementById("blog-card");

    response.forEach(element => {
      const clone = template.content.cloneNode(true);

      clone.querySelector("blog-heading").textContent = element.title;

      document.getElementById('blogParent').appendChild(clone);

    });
  }

  catch (error) {
    console.log(error);
  }

}

FetchData()