import { useCreate } from "@refinedev/core";
import { useState } from "react";

export const CreateMuscle = () => {
  const { mutate, isLoading, isSuccess } = useCreate();
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate({
      resource: "muscles",
      values: { name },
    });

    setName(""); 
  };

  return (
    <div>
      <h2>Créer un nouveau muscle</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom du muscle"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Création..." : "Créer"}
        </button>
      </form>
      {isSuccess && <p>✅ Muscle créé avec succès !</p>}
    </div>
  );
};
