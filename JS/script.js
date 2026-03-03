const toggleButtonn = document.querySelector("#theme-toggle-button");

let isDark = false;

toggleButtonn.addEventListener("click", () => {
  isDark = !isDark;
  document.body.classList.toggle("dark", isDark);
  icon = isDark ? "fa-solid fa-moon" : "fa-solid fa-sun";
  toggleButtonn.innerHTML = `<i class="${icon}"></i>`;
});

const featuredCampaignsSection = document.getElementById("campaigns-cards");

const fetchCampaigns = async () => {
  try {
    const response = await fetch("http://localhost:5000/campaigns");
    const campaigns = await response.json();
    renderCampaigns(campaigns);
  } catch (error) {
    console.error("Error fetching campaigns:", error);
  }
};

const renderCampaigns = (campaigns) => {
  featuredCampaignsSection.innerHTML = "";
  campaigns.forEach((campaign) => {
    const cardHTML = `
      <div class="card">
        <img src="${campaign.image}" alt="" />
        <div class="card-content">
          <p class="campaign-tag">${campaign.tag}</p>
          <h3 class="campaign-title">${campaign.title}</h3>
          <p class="campaign-description">${campaign.description}</p>
          <div class="campaign-prices">
            <p class="current-amount">
              $${campaign.currentAmount} out of $${campaign.goalAmount}
            </p>
            <p class="time-remaining">Ends on ${campaign.endDate}</p>
          </div>
          <button id="view-campaign" class="btn btn-default btn-size-default">
            View Campaign
          </button>
        </div>
      </div>
    `;
    featuredCampaignsSection.innerHTML += cardHTML;
  });

  // Add click listeners to buttons
  document.querySelectorAll("#view-campaign").forEach((btn, index) => {
    btn.addEventListener("click", () => viewCampaign(campaigns[index].id));
  });
};

const viewCampaign = (id) => {
  window.location.href = `http://localhost:5000/campaigns/${id}`;
};

fetchCampaigns();
