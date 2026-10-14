document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('whatsappBookingForm');
  if (!form) return;
  const feedback = document.getElementById('formFeedback');
  const date = form.elements.event_date;
  const today = new Date();
  date.min = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')].join('-');
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const value = name => String(data.get(name) || '').trim();
    const required = ['name', 'phone', 'event_date', 'event_type', 'venue_city'];
    if (required.some(name => !value(name))) {
      feedback.textContent = 'Please complete your name, phone, date, event type, and venue.';
      feedback.classList.add('error');
      return;
    }
    const digits = value('phone').replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 15) {
      feedback.textContent = 'Please enter a phone number with 10–15 digits, including the country code if needed.';
      feedback.classList.add('error');
      form.elements.phone.focus();
      return;
    }
    const services = data.getAll('services').join(', ') || 'Please help me choose';
    const message = [
      'Hello MH09RS Films,', '', 'I would like to enquire about a shoot.', '',
      'Name: ' + value('name'), 'Phone: ' + value('phone'),
      'Email: ' + (value('email') || 'Not provided'), 'Event: ' + value('event_type'),
      'Date: ' + value('event_date'), 'Location: ' + value('venue_city'),
      'Services: ' + services, 'Package preference: ' + value('budget'), '',
      'Notes: ' + (value('message') || 'None'), '',
      'Please let me know your availability and package details.'
    ].join('\n');
    const url = 'https://wa.me/919595222860?text=' + encodeURIComponent(message);
    feedback.classList.remove('error');
    feedback.replaceChildren(document.createTextNode('Your enquiry is ready. Review and send it in WhatsApp. If the new tab did not open, use this link: '));
    const fallback = document.createElement('a');
    fallback.href = url;
    fallback.target = '_blank';
    fallback.rel = 'noopener noreferrer';
    fallback.textContent = 'Open enquiry in WhatsApp ↗';
    feedback.append(fallback);
    window.open(url, '_blank', 'noopener,noreferrer');
  });
});
