import { useOne } from "@refinedev/core";

export const ShowMuscle = () => {
    const { data, isLoading, error } = useOne({
        resource: "muscles",
        id: 4, 
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return <div>Nom du muscle : {data?.data.name}</div>;
};
