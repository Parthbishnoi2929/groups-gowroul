// --- ADD THIS INSIDE YOUR DOMContentLoaded LISTENER ---

// Form Submission to CSV Logic for Contact Page
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // 1. Get Form Data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value.replace(/"/g, '""'); // Escape double quotes for CSV

        // 2. Create CSV Content
        const headers = '"Name","Email","Message","Timestamp"';
        const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        const row = `"${name}","${email}","${message}","${timestamp}"`;
        const csvContent = headers + "\n" + row;

        // 3. Create a Blob and Download Link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        // Create a unique filename for each submission
        link.setAttribute("download", `contact_submission_${Date.now()}.csv`);
        
        // 4. Trigger Download and Cleanup
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // 5. Clear the form and notify the user
        contactForm.reset();
        alert('Thank you! Your message has been exported.');
    });
}