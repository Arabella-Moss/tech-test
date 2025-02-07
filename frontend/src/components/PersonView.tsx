import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react"
import { z } from "zod";


// define zod schema for form validation
const schema = z.object({
    id: z.string().min(1, "ID is required"),
});

type FormFields = z.infer<typeof schema>;

// define expected structure for a Person object
interface Person {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
}


// TASK 4, use GET endpoint to fetch and return specific person when button is pressed, display response
export default function PersonView() {
    const form = useForm<FormFields>({ resolver: zodResolver(schema) });
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;

    const [person, setPerson] = useState<any>(null);
    const [error, setError] = useState(null);

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        setError(null);
        setPerson(null);

    }

        try {
            const response = await fetch(`http://localhost:8080/person/${data.id}`);

            if (!response.ok) {
                throw new Error("Person not found");
            }

            const personData = await response.json();
            setPerson(personData);
        } catch (err) {
            setError(err.message);
        };


        return (
            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-lg font-sans">
                <label className="text-purple-600 font-semibold mt-14">ID</label>
                <input type="text" {...register("id")} className="border p-2 rounded" />
                <p className="text-red-400">{errors.id?.message}</p>
                <button type="submit" className="bg-purple-600 text-white py-2 px-4 mt-4 rounded">View</button>
              </form>
        
              {error && <p className="text-red-500 mt-4">{error}</p>}
        
              {person && (
                <div className="text-gray-800 mt-4 border border-purple-600 p-4 rounded">
                  <h2 className="font-bold text-purple-600">Details</h2>
                  <p><strong className="text-purple-600">ID:</strong> {person.id}</p>
                  <p><strong className="text-purple-600">First Name:</strong> {person.firstName}</p>
                  <p><strong className="text-purple-600">Last Name:</strong> {person.lastName}</p>
                  <p><strong className="text-purple-600">Date of Birth:</strong> {person.dateOfBirth}</p>
                  <p><strong className="text-purple-600">Email:</strong> {person.email}</p>
                </div>
              )}
            </div>
          );
     }

     