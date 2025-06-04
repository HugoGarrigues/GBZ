import { useTable } from "@refinedev/core";

export const ListMuscle = () => {
  const {
    tableQuery: { data, isLoading },
  } = useTable({
    resource: "muscles",
    pagination: { current: 1, pageSize: 10 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1>Liste des muscles</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((muscle) => (
            <tr key={muscle.id}>
              <td>{muscle.id}</td>
              <td>{muscle.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
