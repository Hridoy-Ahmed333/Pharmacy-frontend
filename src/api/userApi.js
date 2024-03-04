export async function addUser(formData) {
  try {
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      body: formData, // Send FormData directly
    });

    if (!response.ok) {
      const error = await response.json();
      console.log(error.message);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

// Function to send a request to the /users route
async function fetchUsers() {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found in local storage");
    }

    const response = await fetch("http://localhost:8080/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}
