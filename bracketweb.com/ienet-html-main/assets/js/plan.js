
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
  const PricingCardParent = document.getElementById('pricing-card-parent');
  const template = document.getElementById('pricing-card');

  response.forEach(element => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('#package-price').textContent = element.planName ? element.planName : 'not added yet';

    element.planList.forEach((item, index) => {
      // clone.querySelector('.amount')[index].textContent = item.amount;
      // clone.querySelector('.months')[index].textContent = item.month;
      // clone.querySelector('.saving-amount')[index].textContent = item.saving;
    });

    PricingCardParent.append(clone);

  })
}

window.addEventListener('DOMContentLoaded', fetchdata);
