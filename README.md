# INKQUILL

InkQuill is an intelligent tool designed to help students enhance their study sessions by summarizing and paraphrasing notes in images or PDF format.

---
## Features

- **PDF Extraction**: Easily upload PDF documents and extract text for further processing.
- **Summarization**: Automatically generate clear, concise summaries of lengthy notes, highlighting the most important information.
- **Paraphrasing**: Reword content to simplify difficult concepts or present the material in a unique way, maintaining the original meaning.
- **Error Handling**: Provides detailed logs for failed tasks.

---
## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: Nextjs
- **Database**: MongoDB
- **Integration**: Cohere API, OCRSpace

---
## Installation

### Prerequisites

1. Node.js and npm installed.
2. MongoDB instance running locally or in the cloud.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/daniel-idowu-01/inkquill
   cd inkquill
   ```

2. Install dependencies:
   ```bash
   cd client
   npm install
   ```
   ```bash
   cd server
   npm install
   ```

3. Set up environment variables:
  Update your `next.config.mjs` file in the client directory with the following:
   ```env
   OCR_API_KEY=
   CLOUDINARY_PRESET_KEY=
   CLOUDINARY_CLOUD_NAME=
   PARAPHRASE_API=
   SUMMARIZE_API=
   OCR_API=
   ```
   Update your `.env` file in the server directory with the following:
   ```env
   PORT=
   MONGO_DB=
   COHERE_API_KEY=
   JWT_SECRET=
   ```

4. Start the app:
   ```bash
   cd server
   npm run dev
   ```
   ```bash
   cd client
   npm run dev
   ```
---

## Roadmap

- [ ] Advanced Customization.
- [ ] Support for Multiple Languages.

---

## Contributing

We welcome contributions! Follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature-name"`.
4. Push to the branch: `git push origin feature-name`.
5. Create a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For questions or support:

- Email: danielidowu414@gmail.com
