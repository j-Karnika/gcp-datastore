
import React, { useState } from 'react';
import "./results.css"

const Results = ({ documents, summary }) => {
  const [selectedConversationStyle, setSelectedConversationStyle] = useState('');

  const handleConversationStyleChange = (event) => {
    setSelectedConversationStyle(event.target.value);
    console.log(selectedConversationStyle)
  };

  console.log("this is the documents", documents)

  const filteredDocuments = selectedConversationStyle ?
    documents.filter((document) => {
      const structData = document.document.structData;
      return structData && structData.conversation_style === selectedConversationStyle;
    }) :
    documents;

  if (!Array.isArray(documents) || documents.length === 0) {
    return <div>No documents to display</div>;
  }

  return (
    <div className="response-container">
      <div className="all-filters-container">
        <div className="filters">
          <label htmlFor="conversationStyle">Conversation Style:</label>
          <select
            id="conversationStyle"
            value={selectedConversationStyle}
            onChange={handleConversationStyleChange}
            className="dropdown"
          >
            <option value="" defaultValue="">All</option>
            <option value="board">Board</option>
            <option value="forum">Forum</option>
            <option value="tkb">TKB</option>
          </select>
        </div>
      </div>
      <h1>Documents:</h1>
      <div className="results">
        {filteredDocuments.map((document) => (
          <div key={document.id} className="document">
            <p>
              <strong>Document ID:</strong> {document.id}
            </p>
            <p>
              <strong>Generative response:</strong> {summary.summaryText}
            </p>
            <p className="content">
              <strong>Content:</strong> {document.document.derivedStructData.extractive_answers[0].content}
            </p>
            <p>
              <strong>Title:</strong> {document.document.derivedStructData.title}
            </p>
            <p>
              <strong>Google cloud file location:</strong>{' '}
              <span className="path">{document.document.derivedStructData.link}</span>
            </p>
            {document.document.structData && (
              <p>
                <strong>Author:</strong> {document.document.structData.author}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
