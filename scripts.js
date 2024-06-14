document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("my-form");
    const button = document.getElementById("my-form-button");
    const status = document.getElementById("my-form-status");

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        button.disabled = true;
        button.textContent = "Sending...";

        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                status.textContent = "Thanks for your submission!";
                form.reset();
            } else {
                const responseData = await response.json();
                if (responseData.errors) {
                    status.textContent = responseData.errors.map(error => error.message).join(", ");
                } else {
                    status.textContent = "Oops! There was a problem submitting your form. Please try again later.";
                }
            }
        } catch (error) {
            status.textContent = "Oops! There was a problem submitting your form. Please try again later.";
        } finally {
            button.disabled = false;
            button.textContent = "Submit";
        }
    }

    form.addEventListener("submit", handleSubmit);
});