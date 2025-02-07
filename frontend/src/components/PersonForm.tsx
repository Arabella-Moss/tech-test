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

// TASK 1
const postPath = "";
const putPath = "";

type FormFields = z.infer<typeof personSchema>;

export default function PersonForm() {
    // Form handling
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
                // TASK 3
                const dynamicSuccessMessage = "";
                setSuccessMessage(dynamicSuccessMessage + JSON.stringify(json, null, 2));
            } else {
                setSuccessMessage("Failed to create person");
            }
        } catch (error) {
            console.log(error)
        }

    }

    // Re-used classNames
    const labelClassName = clsx("");
    const inputClassName = clsx("text-black");
    const errorClassName = clsx("text-red-400");

    return (
        <div className="min-w-96">
            <div>
                <h1>Person</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <label className={labelClassName} htmlFor="id">ID</label>
                <input className={inputClassName} type="text" id="id" {...register("id")} />
                <p className={errorClassName}>{errors.id?.message}</p>

                {/* TASK 1 Add more attribute fields here */}

                <div className="flex justify-between mt-4">
                    <button
                        type="submit"
                        onClick={() => setIsUpdating(false)}
                    >
                        Create
                    </button>
                    <button
                        type="submit"
                        onClick={() => setIsUpdating(true)}
                    >
                        Update
                    </button>
                </div>
            </form>

            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
        </div>
    );
}