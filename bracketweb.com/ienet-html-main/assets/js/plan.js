
console.log('hello world this is infranet');

const fetchdata = async () => {
  try {
    const response = await fetch('http://103.123.45.76:9444/api/plan/getAll');
    const data = await response.json();
    console.log("API Response:", data);
    renderPlans(data);
  } catch (error) {
    console.log("Fetch error:", error);
  }
};

function renderPlans(response) {

  response.forEach(element => {
    element.planList.forEach((item, index) => {
      let p = document.createElement('p');
      p.textContent = item.amount;
      document.getElementById('plan-parent').append(p)
    });
  }
  )
}

window.addEventListener('DOMContentLoaded', fetchdata);
