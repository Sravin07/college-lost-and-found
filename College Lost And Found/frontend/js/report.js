document.getElementById('reportForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  // Simple validation
  if (!form.type.value) {
    alert('Please select Lost or Found.');
    form.type.focus();
    return;
  }
  if (!form.title.value.trim()) {
    alert('Please enter the item title.');
    form.title.focus();
    return;
  }
  if (!form.location.value.trim()) {
    alert('Please enter the location.');
    form.location.focus();
    return;
  }
  if (!form.date.value) {
    alert('Please select a date.');
    form.date.focus();
    return;
  }
  const contactVal = form.contact.value.trim();
  if (!contactVal) {
    alert('Please enter contact info.');
    form.contact.focus();
    return;
  }
  if (!/^\d{10}$/.test(contactVal)) {
    alert('Please enter a valid 10-digit phone number.');
    form.contact.focus();
    return;
  }
  const res = await fetch('http://localhost:5000/api/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({
      type: form.type.value,
      title: form.title.value,
      description: form.description.value,
      location: form.location.value,
      date: form.date.value,
      contact: form.contact.value
    })
  });
  if (res.ok) {
    alert('Item Reported');
    form.reset();
  } else {
    alert('Failed to report item. Please try again.');
  }
});
