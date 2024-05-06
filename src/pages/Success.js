import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <h1 style={{ fontSize: "2rem", color: "#333" }}>Congratulations!</h1>
      <p style={{ fontSize: "1.2rem", color: "#666", marginTop: "20px" }}>
        Your purchase was successful Welcome to your new home. Here's what you
        need to know:
        <ul>
          <li>Your property is now under your name.</li>
          <li>Enjoy your new space and make it your own.</li>
          <li>
            For any inquiries or assistance, please contact our support team.
          </li>
        </ul>
      </p>
      <button
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "5px",
          marginTop: "30px",
        }}
        onClick={() => navigate("/")}
      >
        Explore Uur Page
      </button>
    </div>
  );
}

export default Success;
