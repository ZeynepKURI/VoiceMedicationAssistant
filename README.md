# VoiceMedicationAssistant-web
This project is an AI-based application that detects medication labels from camera input and provides the user with information and usage instructions about the identified medication. The project uses a machine learning model to recognize medication images and includes a text-to-speech feature that provides voice guidance for the detected medication.

## Features

- **Camera-Based Medication Recognition**: The application detects and identifies medications from the video feed.
- **Medication Information and Usage Instructions**: Information and usage instructions about the recognized medications are displayed on the screen and read aloud.
- **Repeat Feature**: The user can press a "Repeat" button to hear the information again.
- **Responsive Design**: The video and prediction overlay are responsive and adjust to different screen sizes.

## Technologies Used

- **HTML5 and CSS3**: For the structure and design of the application.
- **JavaScript (with jQuery)**: For medication detection, model loading, and image processing functionality.
- **Roboflow**: Used for the medication detection model.
- **Web Speech API**: Utilized to read out the medication information and usage instructions.

## Installation

To clone and run this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/medication-recognition-system.git
    ```
   
2. Obtain your API key from **Roboflow** and replace the `publishable_key` variable in the JavaScript code:
    ```javascript
    var publishable_key = "your_publishable_key";
    ```

3. Open the `index.html` file in your browser to start the application.

## Usage

- When the application starts, your camera will be activated and the system will begin detecting medications.
- Information about the detected medications, including usage instructions, will be displayed on the screen and read out loud.
- Click the **Repeat** button to hear the information again.

## Screenshot

<img width="759" alt="Screenshot 2024-09-10 at 12 50 38" src="https://github.com/user-attachments/assets/09babc72-519b-41ba-9d38-71f6de1a1181">


## Contributing

Contributions are welcome! Please open an issue first to discuss what you would like to change, and then submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
