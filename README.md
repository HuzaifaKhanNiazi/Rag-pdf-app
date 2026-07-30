# 📄 RAG PDF App

A Retrieval-Augmented Generation (RAG) application that allows users to upload PDF documents and ask questions about their content using Large Language Models (LLMs). The application retrieves relevant information from the uploaded PDF and generates accurate, context-aware answers.

---

## 🚀 Features

* 📂 Upload PDF documents
* ✂️ Automatic text chunking
* 🔍 Semantic search using vector embeddings
* 🤖 AI-powered question answering
* 💬 Interactive chat interface
* ⚡ FastAPI backend
* ⚛️ React + Vite frontend
* 🗂️ Chroma Vector Database
* 🔗 LangChain Retrieval Pipeline
* 🧠 Groq LLM Integration

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* FastAPI
* Python
* LangChain
* ChromaDB
* Groq API
* PyPDFLoader
* python-dotenv

---

## 📁 Project Structure

```text
Rag PDF App/
│
├── App Backend/
│   ├── App/
│   ├── Uploads/
│   ├── Chroma_db/
│   ├── requirements.txt
│   ├── .env.example
│   └── main.py
│
├── App Frontend/
│   └── Rag_pdf_app/
│       ├── src/
│       ├── public/
│       ├── package.json
│       └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Rag-PDF-App.git
cd Rag-PDF-App
```

---

## Backend Setup

Navigate to the backend directory.

```bash
cd "App Backend"
```

Create a virtual environment.

```bash
python -m venv .venv
```

Activate it.

**Windows**

```bash
.venv\Scripts\activate
```

Install dependencies.

```bash
pip install -r requirements.txt
```

Create a `.env` file.

```env
GROQ_API_KEY=your_groq_api_key
```

Run the backend.

```bash
uvicorn App.app:app --reload
```

---

## Frontend Setup

Navigate to the frontend.

```bash
cd "App Frontend/Rag_pdf_app"
```

Install dependencies.

```bash
npm install
```

Run the development server.

```bash
npm run dev
```

---

## How It Works

1. Upload a PDF document.
2. The backend extracts text from the PDF.
3. The text is split into smaller chunks.
4. Embeddings are generated for each chunk.
5. Chunks are stored in ChromaDB.
6. User questions are converted into embeddings.
7. Relevant chunks are retrieved.
8. The retrieved context is sent to the LLM.
9. The AI generates an accurate answer based on the document.

---

## Environment Variables

Create a `.env` file inside the backend directory.

```env
GROQ_API_KEY=your_api_key
```

---

## Future Improvements

* Support multiple PDF uploads
* Conversation history
* User authentication
* Streaming AI responses
* Hybrid Search (Vector + BM25)
* Document management
* Source citations
* Docker deployment
* Cloud deployment

---

## Contributing

Contributions are welcome. Feel free to fork the repository, create a feature branch, and submit a pull request.

---

## License

This project is licensed under the MIT License.

---

## Author

**Huzaifa Khan**

If you found this project helpful, consider giving it a ⭐ on GitHub.
