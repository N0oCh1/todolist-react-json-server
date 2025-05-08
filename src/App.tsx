import { useState, useEffect } from "react";
import { getTasks } from "./api/api";
import { useQuery } from "@tanstack/react-query";
import InputText from "./components/inputText";

 function App() {
	const [localCode, setLocalCode] = useState<string>();
	const [localUsername, setLocalUsername] = useState<string>("");
	const [fetchTasks, setFetchTasks] = useState(false);
	
	useEffect(() => {
		setLocalCode(localStorage.getItem("code") || "");
		setLocalUsername(localStorage.getItem("username") || "");
	},[])

	const {data: tasks, refetch, isFetching} = useQuery(
		{
			queryKey: ["tasks"],
			queryFn: () => getTasks(localCode || "", localUsername),
			enabled: fetchTasks,
		}
	);
	console.log(tasks);
	function handlerSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		console.log(form.get("code"));
		localStorage.setItem("code", form.get("code") as string);
		localStorage.setItem("username", form.get("username") as string);
		setFetchTasks(true);
		refetch();
	}


	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
			<h1>todo list</h1>
			<form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handlerSubmit(e)} className="flex flex-col gap-2">
				<InputText
					label="Nombre de Usuario"
					placeholder="Juan"
					type="text"
					name="username"
				/>
				<InputText
					label="code"
					placeholder={localCode ? localCode : "Codigo"}
					type="text"
					name="code"
				/>
				<input type="submit" value={localCode ? "Cargar lista" : "Gurdar lista"} className="border-1 border-blue-500 cursor-pointer"/>
			</form>
			{isFetching && <p>Cargando tareas...</p>}
            {Array.isArray(tasks) && (
                <ul>
                    {tasks.tasks.map((task: any) => (
                        <li key={task.id}>{task.title}</li>
                    ))}
                </ul>
            )}
		</div>
	);
}

export default App
