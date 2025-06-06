import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:9000/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setPrice(data.price);
        });
    }
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:9000/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price }),
    });

    if (res.ok) {
      router.push("/");
    } else {
      alert("Update failed");
    }
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleUpdate}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        /><br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
