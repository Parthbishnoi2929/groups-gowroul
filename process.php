<?php
// Check if the form was submitted using the POST method
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // --- 1. Define Folder and File Path ---
    $folderPath = 'submissions';
    $fileName = $folderPath . '/contact_data.csv';

    // --- 2. Create the Folder if It Doesn't Exist ---
    // The @ suppresses warnings if the folder already exists
    if (!is_dir($folderPath)) {
        mkdir($folderPath, 0777, true);
    }

    // --- 3. Get and Sanitize Form Data ---
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));
    $submissionDate = date('Y-m-d H:i:s'); // Server's current time

    // --- 4. Prepare the Data for the CSV File ---
    $dataRow = [$submissionDate, $name, $email, $subject, $message];

    // --- 5. Write the Data to the File ---
    // 'a' mode means append - it adds to the end of the file
    $file = fopen($fileName, 'a');

    // If the file is empty, add the header row first
    if (filesize($fileName) == 0) {
        $headers = ['Timestamp', 'Full Name', 'Email', 'Subject', 'Message'];
        fputcsv($file, $headers);
    }

    // Write the user's data to the file
    fputcsv($file, $dataRow);

    // Close the file
    fclose($file);

    // --- 6. Redirect to a Thank You Page (or show a message) ---
    // It's best practice to redirect to a new page after submission.
    // Create a 'thank_you.html' page and uncomment the line below:
    // header('Location: thank_you.html');
    // exit();
    
    // For now, we'll just show a simple success message.
    echo "<h1>Thank You!</h1><p>Your message has been received.</p><a href='contact.html'>Back to Form</a>";

} else {
    // Handle cases where the script is accessed directly
    echo "There was a problem. Please submit the form.";
}
?>