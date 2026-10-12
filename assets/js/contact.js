/**
 * MH09RS FILMS — DIRECT WHATSAPP BOOKING ENGINE
 * WhatsApp Number: +91 95952 22860
 * Generates pre-filled, URL-encoded WhatsApp messages. Zero backend or DB required.
 */

document.addEventListener('DOMContentLoaded', () => {
  initWhatsAppBookingForm();
});

function initWhatsAppBookingForm() {
  const form = document.getElementById('whatsappBookingForm');
  if (!form) return;

  const statusFeedback = document.getElementById('formFeedback');
  const WA_PHONE_NUMBER = '919595222860'; // International format without +

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Extract form fields
    const fullName = form.querySelector('[name="name"]')?.value.trim() || '';
    const phone = form.querySelector('[name="phone"]')?.value.trim() || '';
    const email = form.querySelector('[name="email"]')?.value.trim() || 'Not specified';
    const eventDate = form.querySelector('[name="event_date"]')?.value.trim() || '';
    const eventType = form.querySelector('[name="event_type"]')?.value || '';
    const venueCity = form.querySelector('[name="venue_city"]')?.value.trim() || '';
    const budget = form.querySelector('[name="budget"]')?.value || 'Flexible';
    const message = form.querySelector('[name="message"]')?.value.trim() || 'None';

    // Gather selected services
    const checkedServices = [];
    form.querySelectorAll('input[name="services"]:checked').forEach(cb => {
      checkedServices.push(cb.value);
    });
    const servicesText = checkedServices.length > 0 ? checkedServices.join(', ') : 'Wedding Photography & Cinematic Film';

    // Basic Validation
    if (!fullName || !phone || !eventDate || !eventType || !venueCity) {
      if (statusFeedback) {
        statusFeedback.innerHTML = `
          <div style="color: #EF4444; margin-top: 1rem; font-size: 0.875rem;">
            ⚠️ Please fill in all required fields (Name, Phone, Date, Event Type, City).
          </div>
        `;
      }
      return;
    }

    // Compose formatted WhatsApp inquiry text
    const waText = 
`Hello MH09RS Films,

I'd like to enquire about your photography and cinematography services.

Name: ${fullName}
Phone: ${phone}
Email: ${email}
Event: ${eventType}
Date: ${eventDate}
Location: ${venueCity}
Services: ${servicesText}
Budget: ${budget}

My requirements:
${message}

Please let me know your availability and package details.

Thank you.`;

    const encodedText = encodeURIComponent(waText);
    const waUrl = `https://wa.me/${WA_PHONE_NUMBER}?text=${encodedText}`;

    // Display user guidance & launch WhatsApp
    if (statusFeedback) {
      statusFeedback.innerHTML = `
        <div style="background: rgba(37, 211, 102, 0.15); border: 1px solid rgba(37, 211, 102, 0.4); border-radius: 4px; padding: 1rem; margin-top: 1.25rem; font-size: 0.85rem; color: #D1FAE5;">
          <p style="margin-bottom: 0.5rem; font-weight: 600; color: #10B981;">✓ Opening WhatsApp...</p>
          <p>Your inquiry is pre-filled. If WhatsApp does not open automatically, click the button below:</p>
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm" style="margin-top: 0.75rem; display: inline-flex;">
            Open in WhatsApp Now
          </a>
        </div>
      `;
    }

    // Attempt to open WhatsApp in a new tab/window
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });
}
