export async function addSupply(supply) {
  console.log(supply);
  try {
    const response = await fetch("http://localhost:8080/supply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(supply),
    });

    if (!response.ok) {
      throw new Error(`Supply could not be created: ${response.statusText}`);
    }

    const data = await response.json();
    //console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getSupplies() {
  const response = await fetch("http://localhost:8080/supply");
  const data = await response.json();
  return data;
}
