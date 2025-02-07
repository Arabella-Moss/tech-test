import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

// TASK 2 is up to you on where you put the validaton

// TASK 1, define schema to validate form inputs, must be strings with min length of 1 character
const personSchema = z.object({
    id: z.string().min(1, "Must contain one character(s)"),
    firstName: z.string().min(1, "Enter first name"),
    lastName: z.string().min(1, "Enter last name"),
    dateOfBirth: z.string().min(1, "Enter date of birth"),
    email: z.string().min(1, "Enter email");
})

// TASK 1, ensure form sends data to correct API endpoints
const postPath = "/people"; 
const putPath = "people"; 

type FormFields = z.infer<typeof personSchema>;

export default function PersonForm() {
    // Form handling for creating and updating records
    const form = useForm<FormFields>({ resolver: zodResolver(personSchema) });
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;
    const [isUpdating, setIsUpdating] = useState(false);

    // Success message handling
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    // Form submission handling
    const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
        try {
            const url = isUpdating ? `http://localhost:8080${putPath}` : `http://localhost:8080${postPath}`;
            const method = isUpdating ? "PUT" : "POST";

            const response = await fetch(url, {
                method: method,
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                const json = await response.json()

                // TASK 3, shows success message after submitting form
                const dynamicSuccessMessage = isUpdating
                ? `Successfully updated person: ${json.firstName} ${json.lastName}`
                : `Successfully created person: ${json.lastName} ${json.lastname}`

                setSuccessMessage(dynamicSuccessMessage + JSON.stringify(json, null, 2));
            } else {
                setSuccessMessage("Failed to create or update person");
            }
        } catch (error) {
            console.log(error);
            setSuccessMessage("An error occurred while processing this request");
        }

    }

    // Re-used classNames
    const labelClassName = clsx("");
    const inputClassName = clsx("text-black");
    const errorClassName = clsx("text-red-400");

   
            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
        </div>
    
}

return (
    <div className="min-w-96">
        <div>
            <h1 className="text-purple-600 text-2xl text-center font-sans font-bold">
                Personal Details
            </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col -ml-20 mt-8">
            <label className="text-purple-600 font-semibold" htmlFor="id">
                ID
            </label>
            <input
                className="border p-2 rounded"
                type="text"
                id="id"
                {...register("id", { required: "ID is required" })}
            />
            <p className="text-red-500">{errors.id?.message}</p>

            <label className="text-purple-600 font-semibold" htmlFor="firstName">
                First Name
            </label>
            <input
                className="border p-2 rounded"
                type="text"
                id="firstName"
                {...register("firstName", { required: "First name is required" })}
            />
            <p className="text-red-500">{errors.firstName?.message}</p>

            <label className="text-purple-600 font-semibold" htmlFor="lastName">
                Last Name
            </label>
            <input
                className="border p-2 rounded"
                type="text"
                id="lastName"
                {...register("lastName", { required: "Last name is required" })}
            />
            <p className="text-red-500">{errors.lastName?.message}</p>

            <label className="text-purple-600 font-semibold" htmlFor="dateOfBirth">
                Date of Birth
            </label>
            <input
                className="border p-2 rounded"
                type="date"
                id="dateOfBirth"
                {...register("dateOfBirth", { required: "Date of birth is required" })}
            />
            <p className="text-red-500">{errors.dateOfBirth?.message}</p>

            <label className="text-purple-600 font-semibold" htmlFor="email">
                Email
            </label>
            <input
                className="border p-2 rounded"
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
            />
            <p className="text-red-500">{errors.email?.message}</p>

            <div className="flex justify-between mt-4 text-purple-600 font-semibold">
                <button
                    type="submit"
                    onClick={() => setIsUpdating(false)}
                    className="bg-purple-600 text-white font-bold py-2 px-4 rounded-full hover:bg-purple-700 transition duration-200"
                >
                    Create
                </button>
                <button
                    type="submit"
                    onClick={() => setIsUpdating(true)}
                    className="bg-purple-600 text-white font-bold py-2 px-4 rounded-full hover:bg-purple-700 transition duration-200"
                >
                    Update
                </button>
            </div>
        </form>

        {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
    </div>
);

