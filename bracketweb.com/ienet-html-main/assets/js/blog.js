
const FetchData = async () => {
  try {
    const response = await fetch('http://103.123.45.76:9444/api/plan/getAll');
    const data = await response.json();
    console.log(data);
    // AddBlog(data);
  } catch (error) {
    console.log(error);
  }
}

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

function AddBlog(response) {

  const BlogCardContainer = document.getElementById('blog-parent');
  const template = document.getElementById('blog-card');

  response.forEach(blogs => {

    const clone = template.content.cloneNode(true);

    clone.querySelector('.blog-card__title a').textContent = blogs.title;
    clone.querySelector('.blog-content').textContent = truncateText(blogs.infography, 100);
    // clone.querySelector('.blog-card__image img').src = blogs.imageName

    BlogCardContainer.append(clone);
  })
}

// window.addEventListener('DOMContentLoaded', () => {
//   FetchData();
// });

FetchData()