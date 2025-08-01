


let allItems = [];

function renderItems(items) {
  const lostItems = items.filter(item => item.type === 'lost');
  const foundItems = items.filter(item => item.type === 'found');

  function card(item) {
    let formattedDate = '';
    if (item.date) {
      const d = new Date(item.date);
      formattedDate = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    }
    return `
      <div style="background: #f6f8fa; border-radius: 12px; box-shadow: 0 2px 8px rgba(44,62,80,0.07); padding: 22px 18px; border: 1.5px solid #e3e6ea; display: flex; flex-direction: column; gap: 6px; min-height: 160px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${item.type==='lost' ? '#f44336':'#43cea2'};"></span>
          <h3 style="margin:0;font-size:1.2rem;color:#1976d2;">${item.title} <span style="font-size:0.95rem;color:#888;">(${item.type})</span></h3>
        </div>
        <p style="margin: 6px 0 0 0; color:#444;">${item.description}</p>
        <div style="font-size:0.98rem;color:#555;margin-top:4px;">
          <b>Location:</b> ${item.location}<br>
          <b>Date:</b> ${formattedDate}<br>
          <b>Contact:</b> <span style="color:#1976d2;">${item.contact || ''}</span>
        </div>
      </div>
    `;
  }

  document.getElementById('lostItems').innerHTML = lostItems.map(card).join('');
  document.getElementById('foundItems').innerHTML = foundItems.map(card).join('');
}

window.onload = async () => {
  const res = await fetch('http://localhost:5000/api/items', {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  });
  allItems = await res.json();
  renderItems(allItems);

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value.trim().toLowerCase();
      const filtered = allItems.filter(item =>
        (item.title && item.title.toLowerCase().includes(val)) ||
        (item.location && item.location.toLowerCase().includes(val)) ||
        (item.contact && item.contact.toLowerCase().includes(val))
      );
      renderItems(filtered);
    });
  }
};