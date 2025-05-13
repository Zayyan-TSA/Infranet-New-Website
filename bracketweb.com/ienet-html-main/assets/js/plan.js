
let allPlans = [];
const citySet = new Set();
const areaSet = new Set();

const fetchdata = async () => {
  try {
    const response = await fetch('http://103.123.45.76:9444/api/plan/getAll');
    const data = await response.json();
    const ActivePlans = data.filter((data) => data.deletedStatus === false);
    console.log(ActivePlans);
    allPlans = ActivePlans;
    populateCities(ActivePlans);
    AddDropdownData(citySet);
    SelectDropdownValue();
  } catch (error) {
    console.log("Fetch error:", error);
  }
};

function populateCities(data) {
  if (data.length !== 0) {
    data.forEach(plan => {
      if (plan.cityName) {
        citySet.add(plan.cityName);
      }
      if (plan.cityName === 'Bhiwandi' && plan.areaName) {
        areaSet.add(plan.areaName);
      }
    });
  }
}

function AddDropdownData(set) {
  const dropdown = document.getElementById('cityDropdown');
  dropdown.innerHTML = '<option value="">Select City</option>';
  Array.from(set).sort().forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    dropdown.appendChild(option);
  });
}

function populateAreas(set) {
  const areaDropdown = document.getElementById('areaDropdown');
  areaDropdown.innerHTML = '<option value="">Select Area</option>';
  Array.from(set).sort().forEach(area => {
    const option = document.createElement('option');
    option.value = area;
    option.textContent = area;
    areaDropdown.appendChild(option);
  });
  document.getElementById('areaDropdown').style.display = 'block';
  document.getElementById('areaLabel').style.display = 'block';
}

function hideAreaDropdown() {
  document.getElementById('areaDropdown').style.display = 'none';
  document.getElementById('areaLabel').style.display = 'none';
  document.getElementById('areaDropdown').value = '';
}

function SelectDropdownValue() {
  const cityDropdown = document.getElementById('cityDropdown');
  const areaDropdown = document.getElementById('areaDropdown');

  cityDropdown.addEventListener('change', function () {
    const selectedCity = this.value;

    if (selectedCity === 'Bhiwandi') {
      populateAreas(areaSet);
    } else {
      hideAreaDropdown();
      const filteredPlans = allPlans.filter(plan => plan.cityName === selectedCity);
      renderPlans(filteredPlans);
    }
  });

  areaDropdown.addEventListener('change', function () {
    const selectedArea = this.value;
    const filteredPlans = allPlans.filter(plan =>
      plan.cityName === 'Bhiwandi' && plan.areaName === selectedArea
    );
    renderPlans(filteredPlans);
  });

  cityDropdown.value = 'Bhiwandi';
  cityDropdown.dispatchEvent(new Event('change')); // Trigger change event

  // 👇 Wait a moment and then select "Nizamour"
  setTimeout(() => {
    areaDropdown.value = 'Saudagar Mohalla';
    areaDropdown.dispatchEvent(new Event('change')); // Trigger change event
  }, 100); // Delay to allow areaDropdown to populate
}

function renderPlans(plans) {
  const parent = document.getElementById('parent');
  parent.innerHTML = '';

  if (plans.length === 0) {
    parent.innerHTML = '<p>No plans available.</p>';
    return;
  }

  plans.forEach(plan => {
    let CardsContainer = document.createElement('div');
    CardsContainer.classList.add('pricing-card-container');
    parent.append(CardsContainer);

    let p = document.createElement('p');
    p.textContent = `${plan.planName} MBPS`;
    CardsContainer.append(p);
    plan.planList.forEach((plans) => {
      const card = document.createElement('p');
      card.classList.add('plan-card');
      card.textContent = plans.amount;
      CardsContainer.appendChild(card);
    });
  })
}

document.addEventListener('DOMContentLoaded', async () => {
  await fetchdata();
});