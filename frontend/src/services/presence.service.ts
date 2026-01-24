

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});

export const checkIn = async () => {
    const res = await fetch("http://localhost:5000/api/presence/check-in", {
        method: "POST",
        headers: authHeader()
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
}

export const checkOut = async () => {
  const res = await fetch("http://localhost:5000/api/presence/check-out", {
    method: "POST",
    headers: authHeader(),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};