import { useOne, useUpdate } from "@refinedev/core";
import { useState } from "react";

export const EditMuscle = () => {
  const { data, isLoading } = useOne({ resource: "muscles", id: 4 });
  const { mutate, isLoading: isUpdating } = useUpdate();

  const [newName, setNewName] = useState("");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const updateMuscle = async () => {
    await mutate({
      resource: "muscles", 
      id: 4,
      values: {
        name: newName, 
      },
    });
  };

  return (
    <div>
      <div>Nom actuel du muscle : {data?.data.name}</div>

      <input
        type="text"
        placeholder="Nouveau nom"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />

      <button onClick={updateMuscle} disabled={isUpdating}>
        {isUpdating ? "Mise à jour..." : "Mettre à jour le muscle"}
      </button>
    </div>
  );
};
