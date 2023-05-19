import { useState } from "react";

function FeedBackForm() {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:3001/feedbackSection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feedback }),
    }).then(() => {
      alert("Thanks for your feedback!");
      setFeedback("");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={feedback}
        onChange={(event) => setFeedback(event.target.value)}
      />
      <button type="submit">Submit Feedback</button>
    </form>
  );
}

export default FeedBackForm;
